/* Arbeitsvorbereitung – Baukasten.
   Welche Arbeiten es gibt: arbeiten.js. Inhalt einer Arbeit: arbeiten/<id>/inhalt.js, Vokabeln: arbeiten/<id>/vokabeln.js.
   Aufbau der Inhalte: README.md. */

/* ---------- Werkzeuge ---------- */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat(Infinity)) { if (c == null || c === false || c === "") continue; e.append(c.nodeType ? c : document.createTextNode(c)); }
  return e;
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fett = s => String(s ?? "").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const mischen = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => String(s).toLowerCase().replace(/[.,;:!?¡¿"„“”()]/g, " ").replace(/\s+/g, " ").trim();
const ohneAkzent = s => s.normalize("NFD").replace(/[̀-̂̄-ͯ]/g, "").normalize("NFC");
const speicher = {
  get(k, d) { try { const v = localStorage.getItem("av:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("av:" + k, JSON.stringify(v)); } catch (e) {} }
};
const heute = () => new Date().toISOString().slice(0, 10);
const SPRACHNAME = { la: "Latein", es: "Spanisch", en: "Englisch" };

/* ---------- Statistik: Serie und heutige Aufgaben ---------- */
function gezaehlt(n = 1) {
  const s = speicher.get("tage", {}); s[heute()] = (s[heute()] || 0) + n; speicher.set("tage", s);
}
function serie() {
  const s = speicher.get("tage", {}); let n = 0; const d = new Date();
  if (!s[heute()]) d.setDate(d.getDate() - 1);           // heute noch nichts: Serie bis gestern zählt noch
  while (s[d.toISOString().slice(0, 10)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const stand = k => speicher.get("stand", {})[k];
function merke(k, r, n) {
  const s = speicher.get("stand", {}); const w = n ? r / n : 0; const alt = s[k];
  s[k] = { best: Math.max(alt ? alt.best : 0, w), letzt: w }; speicher.set("stand", s);
}

/* ---------- Konfetti bei 100 % ---------- */
function konfetti(el) {
  const r = el.getBoundingClientRect();
  ["✦", "✧", "★", "✦", "✧"].forEach((z, i) => {
    const k = h("span", { class: "konfetti", style: `left:${r.left + r.width / 2 + (i - 2) * 26}px;top:${r.top + 10}px;color:var(--akzent)` }, z);
    document.body.append(k); setTimeout(() => k.remove(), 1300);
  });
}

/* ---------- Arbeiten laden ---------- */
window.AV = window.AV || { arbeiten: [], inhalte: {}, vokabeln: {} };
const geladen = {};
function ladeSkript(src) {
  return geladen[src] || (geladen[src] = new Promise((ok, nein) => {
    const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => nein(new Error(src)); document.head.append(s);
  }));
}
async function ladeArbeit(id) {
  const meta = AV.arbeiten.find(a => a.id === id);
  if (meta?.vokabeln !== false) await ladeSkript(`arbeiten/${id}/vokabeln.js`);   // Fächer ohne Navigium (z. B. Chemie): vokabeln: false
  await ladeSkript(`arbeiten/${id}/inhalt.js`);
  return { meta, inhalt: AV.inhalte[id], vok: AV.vokabeln[id] || { lektionen: [] } };
}

/* ---------- Wörterbuch einer Arbeit und Vokabellücken ---------- */
let AKTIV = null;   // { meta, inhalt, vok, lex, sprache }
function baueLexikon(a) {
  const lex = {};
  (a.vok?.lektionen || []).forEach(l => l.vokabeln.forEach(v => { lex[v.fw] = { ...v, lektion: l.name }; }));
  return lex;
}
function nachschlagen(wort) {
  const k = wort.toLowerCase();
  const fw = AKTIV.inhalt.formen?.[k];
  if (fw && AKTIV.lex[fw]) return { fw, de: AKTIV.lex[fw].de.join("; "), lektion: AKTIV.lex[fw].lektion };
  const name = AKTIV.inhalt.namen?.[k];
  if (name) return { fw: wort, de: name, name: true };
  return null;
}
const lueckenKey = sp => "luecken:" + sp;
function luecken(sp) { return speicher.get(lueckenKey(sp), {}); }
function inLuecken(sp, fw, de, herkunft) {
  const l = luecken(sp);
  if (!l[fw]) l[fw] = { de, richtig: 0, seit: heute(), herkunft };
  else l[fw].richtig = 0;
  speicher.set(lueckenKey(sp), l);
}
function ausLuecken(sp, fw) { const l = luecken(sp); delete l[fw]; speicher.set(lueckenKey(sp), l); }

/* Popup beim Antippen eines Worts */
let popEl = null;
function zeigePop(el, info) {
  schliessePop();
  const r = el.getBoundingClientRect();
  popEl = h("div", { class: "pop", role: "dialog" },
    h("b", {}, info.fw), h("div", {}, info.de),
    h("div", { class: "klein" }, info.name ? "Eigenname" : "✓ in deiner Lückenliste" + (info.lektion ? " · " + info.lektion : "")),
    info.name ? null : h("div", { class: "knoepfe", style: "margin-top:6px" },
      h("button", { class: "knopf leise", type: "button", onclick() { ausLuecken(AKTIV.sprache, info.fw); $$(".w").forEach(w => { if (w.dataset.fw === info.fw) w.classList.remove("luecke"); }); schliessePop(); } }, "doch gewusst – raus")));
  document.body.append(popEl);
  const breite = Math.min(280, innerWidth - 24);
  popEl.style.left = Math.max(12, Math.min(r.left + scrollX, scrollX + innerWidth - breite - 12)) + "px";
  // Über dem Wort öffnen, damit die nächste Zeile frei bleibt; nur wenn oben kein Platz ist, darunter.
  const hoch = popEl.offsetHeight;
  popEl.style.top = (r.top - hoch - 8 > 8 ? r.top + scrollY - hoch - 8 : r.bottom + scrollY + 6) + "px";
}
function schliessePop() { if (popEl) { popEl.remove(); popEl = null; } }
document.addEventListener("click", e => { if (popEl && !popEl.contains(e.target) && !e.target.classList.contains("w")) schliessePop(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") schliessePop(); });

/* ---------- Texte: Auszeichnung lesen ----------
   Wörter durch Leerzeichen getrennt. Markierungen hinter dem Wort: wort#p1 (PPP Nr. 1), wort#b1 (Bezugswort zu 1),
   wort#k (Konjunktiv). Stilmittel als Klammer: [Veniunt, vident, vincunt]{asyndeton} */
function zerlege(satz, satzNr) {
  const out = []; let span = null;
  for (let roh of satz.split(/\s+/).filter(Boolean)) {
    let auf = false, zu = null;
    if (roh.startsWith("[")) { auf = true; roh = roh.slice(1); }
    const m = roh.match(/\]\{([^}]+)\}(.*)$/);
    if (m) { zu = m[1]; roh = roh.slice(0, m.index) + m[2]; }
    if (auf) span = { typ: null, tokens: [] };
    const t = roh.match(/^([^\p{L}#]*)([\p{L}-]+)((?:#[a-z]+\d*)*)(.*)$/u);
    const tok = t ? { vor: t[1], w: t[2], tags: t[3] ? t[3].slice(1).split("#") : [], nach: t[4], satz: satzNr }
                  : { vor: roh, w: "", tags: [], nach: "", satz: satzNr };
    if (span) { tok.span = span; span.tokens.push(tok); }
    if (zu && span) { span.typ = zu; span = null; }
    out.push(tok);
  }
  return out;
}
function textTokens(textId) {
  const t = AKTIV.inhalt.texte[textId];
  return t.saetze.map((s, i) => zerlege(s.la, i));
}
/* Ein Satz als HTML mit antippbaren Wörtern. modus: "lesen" (nachschlagen) oder eine Funktion (eigener Klick). */
function satzEl(tokens, modus) {
  const el = h("span", { class: "satz" });
  tokens.forEach(tok => {
    if (tok.vor) el.append(tok.vor);
    if (tok.w) {
      const info = nachschlagen(tok.w);
      const w = h("span", { class: "w", tabindex: "0", "data-fw": info?.fw || "" }, tok.w);
      tok.el = w;
      if (modus === "lesen") {
        if (info && !info.name && luecken(AKTIV.sprache)[info.fw]) w.classList.add("luecke");
        const auf = e => { e.stopPropagation(); if (!info) return; if (!info.name) { inLuecken(AKTIV.sprache, info.fw, info.de, AKTIV.meta.titel); $$(".w").forEach(x => { if (x.dataset.fw === info.fw) x.classList.add("luecke"); }); } zeigePop(w, info); };
        w.addEventListener("click", auf); w.addEventListener("keydown", e => { if (e.key === "Enter") auf(e); });
      } else if (typeof modus === "function") w.addEventListener("click", e => { e.stopPropagation(); modus(tok, w); });
      el.append(w);
    }
    if (tok.nach) el.append(tok.nach);
    el.append(" ");
  });
  return el;
}

/* ---------- Übungskarte ---------- */
function karte(id, titel, auftrag, koerper, opts = {}) {
  const k = AKTIV.meta.id + "/" + id;
  const marke = h("span", { class: "marke-klein" });
  const setze = () => { const s = stand(k); marke.textContent = s ? "Bestwert " + Math.round(s.best * 100) + " %" : opts.ohneWertung ? "" : "noch offen"; marke.className = "marke-klein" + (s && s.best >= .8 ? " gut" : ""); };
  setze();
  const el = h("section", { class: "karte" }, h("div", { class: "kartenkopf" }, h("h3", {}, titel), marke), auftrag ? h("p", { class: "auftrag", html: fett(auftrag) }) : null, koerper);
  el.fertig = (r, n) => { merke(k, r, n); setze(); gezaehlt(n); if (n && r === n) konfetti(marke); };
  return el;
}

/* ---------- Übungsarten ---------- */
const UEBUNG = {};

// Auswahl: sofortige Rückmeldung, Tasten 1–4 am PC
UEBUNG.auswahl = (u, wenn) => {
  const box = h("div"), erg = h("p", { class: "ergebnis" });
  let karteEl;
  const neu = () => {
    box.innerHTML = ""; erg.textContent = "";
    const items = u.mischen === false ? u.items : mischen(u.items);
    let b = 0, r = 0;
    const ol = h("ol", { class: "aufgaben" });
    items.forEach(it => {
      const opts = it.o || u.kategorien; const reihe = (u.kategorien || it.fest) ? opts.map((_, i) => i) : mischen(opts.map((_, i) => i));
      const richtig = Array.isArray(it.a) ? it.a : [it.a];
      const rueck = h("div", { class: "rueck", hidden: true }); let fertig = false; const kn = {};
      reihe.forEach((i, pos) => { kn[i] = h("button", { class: "option", type: "button", onclick() {
        if (fertig) return; fertig = true; li.dataset.erledigt = "1";
        for (const j in kn) { const n = +j; kn[j].disabled = true; if (richtig.includes(n)) kn[j].classList.add("ok"); else if (n === i) kn[j].classList.add("nein"); }
        const ok = richtig.includes(i); b++; if (ok) r++;
        rueck.hidden = false; rueck.className = "rueck " + (ok ? "ok" : "nein");
        rueck.innerHTML = (ok ? "✓ " : "✗ Richtig: <b>" + esc(opts[richtig[0]]) + "</b>" + (it.why ? " – " : "")) + (it.why ? fett(it.why) : ok ? "Richtig." : "");
        if (!ok && wenn?.falsch) wenn.falsch(it);
        if (b === items.length) { karteEl.fertig(r, items.length); erg.textContent = r + " von " + items.length + " richtig" + (r === items.length ? " – sitzt!" : "."); }
      } }, h("kbd", {}, String(pos + 1)), opts[i]); });
      const li = h("li", { class: "aufgabe" }, h("div", { class: "frage", html: fett(it.q) }), h("div", { class: "optionen" }, reihe.map(i => kn[i])), rueck);
      ol.append(li);
    });
    box.append(ol);
  };
  neu();
  karteEl = karte(u.id, u.titel, u.auftrag, [box, erg, h("div", { class: "knoepfe" }, h("button", { class: "knopf leise", type: "button", onclick: neu }, "Neu mischen"))]);
  return karteEl;
};

// Lücken: {{lösung|variante::hinweis}}
UEBUNG.luecke = u => {
  const box = h("div"), erg = h("p", { class: "ergebnis" });
  let felder = [], karteEl;
  const neu = () => {
    box.innerHTML = ""; erg.textContent = ""; felder = [];
    const ol = h("ol", { class: "aufgaben" });
    (u.mischen === false ? u.items : mischen(u.items)).forEach(it => {
      const fr = h("div", { class: "frage" }); let rest = it.s, m;
      while ((m = rest.match(/\{\{(.+?)\}\}/))) {
        fr.append(document.createTextNode(rest.slice(0, m.index)));
        const [a, hinweis] = m[1].split("::"); const ans = a.split("|");
        const inp = h("input", { class: "feld", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: hinweis || "", style: `width:${Math.max(...ans.map(x => x.length), (hinweis || "").length, 5) + 3}ch` });
        felder.push({ inp, ans, why: it.why }); fr.append(inp); rest = rest.slice(m.index + m[0].length);
      }
      fr.append(document.createTextNode(rest));
      ol.append(h("li", { class: "aufgabe" }, fr));
    });
    box.append(ol);
  };
  const pruefen = () => {
    let r = 0;
    felder.forEach(f => {
      const v = norm(f.inp.value); const ok = f.ans.some(a => norm(a) === v);
      const fast = !ok && f.ans.some(a => ohneAkzent(norm(a)) === ohneAkzent(v));
      f.inp.classList.toggle("ok", ok); f.inp.classList.toggle("nein", !ok); f.inp.classList.remove("gezeigt");
      f.inp.title = ok ? "" : (fast ? "Akzent! " : "") + "Richtig: " + f.ans[0];
      if (ok) r++;
    });
    karteEl.fertig(r, felder.length); erg.textContent = r + " von " + felder.length + " richtig" + (r === felder.length ? " – sitzt!" : " – falsche Felder zeigen die Lösung beim Drüberfahren oder über „Lösungen zeigen“.");
  };
  box.addEventListener("keydown", e => { if (e.key !== "Enter" || !e.target.matches("input")) return; e.preventDefault(); const i = felder.findIndex(f => f.inp === e.target); if (i < felder.length - 1) felder[i + 1].inp.focus(); else pruefen(); });
  neu();
  karteEl = karte(u.id, u.titel, u.auftrag, [box, erg, h("div", { class: "knoepfe" },
    h("button", { class: "knopf haupt", type: "button", onclick: pruefen }, "Prüfen"),
    h("button", { class: "knopf", type: "button", onclick() { felder.forEach(f => { if (!f.inp.classList.contains("ok")) { f.inp.value = f.ans[0]; f.inp.classList.remove("nein"); f.inp.classList.add("gezeigt"); } }); } }, "Lösungen zeigen"),
    h("button", { class: "knopf leise", type: "button", onclick: neu }, "Leeren"))]);
  return karteEl;
};

// Tabelle ausfüllen: zeilen = [[Beschriftung, "lösung|variante", "=vorgegeben", …]]
UEBUNG.tabelle = u => {
  const felder = []; const erg = h("p", { class: "ergebnis" }); let karteEl;
  const tab = h("div", { class: "tab" }, h("table", {}, h("tr", {}, u.kopf.map(k => h("th", {}, k))),
    u.zeilen.map(z => h("tr", {}, h("th", {}, z[0]), z.slice(1).map(c => {
      if (c.startsWith("=")) return h("td", { html: "<b>" + esc(c.slice(1)) + "</b>" });
      const inp = h("input", { class: "feld", type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
      const loes = h("span", { class: "loesung", hidden: true }); felder.push({ inp, ans: c.split("|"), loes });
      return h("td", {}, inp, loes);
    })))));
  tab.addEventListener("keydown", e => { if (e.key !== "Enter") return; e.preventDefault(); const i = felder.findIndex(f => f.inp === e.target); if (i > -1 && i < felder.length - 1) felder[i + 1].inp.focus(); });
  const pruefen = () => {
    let r = 0;
    felder.forEach(f => { const ok = f.ans.some(a => norm(a) === norm(f.inp.value)); f.inp.classList.toggle("ok", ok); f.inp.classList.toggle("nein", !ok); f.loes.hidden = ok; f.loes.textContent = f.ans[0]; if (ok) r++; });
    karteEl.fertig(r, felder.length); erg.textContent = r + " von " + felder.length + " Feldern richtig.";
  };
  karteEl = karte(u.id, u.titel, u.auftrag, [tab, erg, h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick: pruefen }, "Prüfen"),
    h("button", { class: "knopf leise", type: "button", onclick() { felder.forEach(f => { f.inp.value = ""; f.inp.classList.remove("ok", "nein"); f.loes.hidden = true; }); erg.textContent = ""; } }, "Leeren"))]);
  return karteEl;
};

// Im Text markieren: ziel = Tag ("p", "k") oder Stilmittel ("s:asyndeton")
UEBUNG.markieren = u => {
  const saetze = textTokens(u.text); const alle = saetze.flat().filter(t => t.w);
  const istZiel = t => u.ziel.startsWith("s:") ? t.span?.typ === u.ziel.slice(2) : t.tags.some(g => g.replace(/\d+$/, "") === u.ziel);
  const erg = h("p", { class: "ergebnis" }); let gepr = false, karteEl;
  const text = h("div", { class: "text" }, saetze.map((s, i) => [h("span", { class: "nr-satz" }, String(i + 1)), satzEl(s, (tok, el) => { if (gepr) return; el.classList.toggle("gewaehlt"); })]));
  const pruefen = () => {
    gepr = true; let treffer = 0, falsch = 0; const ziele = alle.filter(istZiel);
    alle.forEach(t => { const g = t.el.classList.contains("gewaehlt"), z = istZiel(t); t.el.classList.remove("gewaehlt");
      if (g && z) { t.el.classList.add("ok"); treffer++; } else if (g) { t.el.classList.add("nein"); falsch++; } else if (z) t.el.classList.add("fehlt"); });
    const punkte = Math.max(0, treffer - falsch);
    karteEl.fertig(punkte, ziele.length);
    erg.innerHTML = `${treffer} von ${ziele.length} gefunden` + (falsch ? `, ${falsch} zu viel markiert` : "") + (treffer === ziele.length && !falsch ? " – perfekt!" : ". Gestrichelt = übersehen.") + (u.erklaerung ? "<br><span class='leise'>" + fett(u.erklaerung) + "</span>" : "");
  };
  karteEl = karte(u.id, u.titel, u.auftrag, [text, erg, h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick: pruefen }, "Prüfen"),
    h("button", { class: "knopf leise", type: "button", onclick() { gepr = false; alle.forEach(t => t.el.classList.remove("ok", "nein", "fehlt", "gewaehlt")); erg.innerHTML = ""; } }, "Neu"))]);
  return karteEl;
};

// Bezugswort finden: PPP (Tag pN) ist hervorgehoben, Klick aufs Bezugswort (Tag bN)
UEBUNG.bezug = u => {
  const saetze = textTokens(u.text); const aufgaben = [];
  saetze.forEach(s => s.forEach(t => t.tags.filter(g => /^p\d+$/.test(g)).forEach(g => aufgaben.push({ satz: s, ppp: t, nr: g.slice(1) }))));
  const erg = h("p", { class: "ergebnis" }); let b = 0, r = 0, karteEl;
  const ol = h("ol", { class: "aufgaben" });
  aufgaben.forEach(a => {
    const rueck = h("div", { class: "rueck", hidden: true }); let fertig = false;
    const el = satzEl(a.satz.map(t => ({ ...t })), (tok, w) => {
      if (fertig || tok.w === a.ppp.w && tok.tags.includes("p" + a.nr)) return; fertig = true;
      const ok = tok.tags.includes("b" + a.nr); b++; if (ok) r++;
      w.classList.add(ok ? "ok" : "nein");
      if (!ok) $$(".w", el).forEach(x => { if (x.textContent === bezugsWort(a)) x.classList.add("fehlt"); });
      rueck.hidden = false; rueck.className = "rueck " + (ok ? "ok" : "nein");
      rueck.innerHTML = ok ? "✓ Richtig – gleicher Kasus, Numerus und Genus." : "✗ Bezugswort ist <b>" + esc(bezugsWort(a)) + "</b>. Achte auf gleichen Kasus, Numerus, Genus (KNG).";
      if (b === aufgaben.length) { karteEl.fertig(r, aufgaben.length); erg.textContent = r + " von " + aufgaben.length + " Bezugswörtern richtig."; }
    });
    $$(".w", el).forEach(x => { if (x.textContent === a.ppp.w) x.classList.add("ziel"); });
    ol.append(h("li", { class: "aufgabe" }, h("div", { class: "frage text", style: "line-height:2.1" }, el), rueck));
  });
  function bezugsWort(a) { return a.satz.find(t => t.tags.includes("b" + a.nr))?.w || "?"; }
  karteEl = karte(u.id, u.titel, u.auftrag, [ol, erg]);
  return karteEl;
};

// Übersetzen Satz für Satz, Wörter antippen = nachschlagen + Lückenliste
UEBUNG.uebersetzen = u => {
  const t = AKTIV.inhalt.texte[u.text]; const saetze = textTokens(u.text);
  const wert = {}; const erg = h("p", { class: "ergebnis" }); let karteEl;
  const bereich = u.saetze || [0, t.saetze.length];
  const liste = h("div");
  for (let i = bereich[0]; i < bereich[1]; i++) {
    const s = t.saetze[i]; const key = `uebers:${AKTIV.meta.id}/${u.text}/${i}`;
    const feld = h("textarea", { class: "feld", placeholder: "Deine Übersetzung …", "aria-label": "Übersetzung Satz " + (i + 1) }); feld.value = speicher.get(key, "");
    feld.addEventListener("input", () => speicher.set(key, feld.value));
    const muster = h("div", { class: "muster", hidden: true, html: fett(esc(s.de)) + (s.hinw ? `<div class="hinw">${fett(s.hinw)}</div>` : "") });
    const selbst = h("div", { class: "selbst", hidden: true }, h("span", { class: "leise" }, "Wie gut war deine?"),
      [["richtig", 1], ["fast", .5], ["daneben", 0]].map(([l, w]) => h("button", { class: "knopf", type: "button", "aria-pressed": "false", onclick() {
        $$("button", selbst).forEach(x => x.setAttribute("aria-pressed", "false")); this.setAttribute("aria-pressed", "true"); wert[i] = w;
        const n = bereich[1] - bereich[0]; const fertig = Object.keys(wert).length;
        const summe = Object.values(wert).reduce((a, b) => a + b, 0);
        erg.textContent = `${fertig} von ${n} Sätzen bewertet · ${summe.toString().replace(".", ",")} Punkte`;
        if (fertig === n) karteEl.fertig(summe, n);
      } }, l)));
    liste.append(h("div", { class: "uebersatz" }, h("div", { class: "la" }, h("span", { class: "nr-satz" }, String(i + 1)), satzEl(saetze[i], "lesen")), feld,
      h("div", { class: "knoepfe", style: "margin-top:6px" }, h("button", { class: "knopf", type: "button", onclick() { muster.hidden = false; selbst.hidden = false; this.disabled = true; } }, "Lösung zeigen")), muster, selbst));
  }
  karteEl = karte(u.id, u.titel || "Übersetzen: " + t.titel, u.auftrag || "Übersetze Satz für Satz. **Wort vergessen? Antippen** – dann siehst du die Bedeutung, und es kommt in deine Lückenliste.", [liste, erg]);
  return karteEl;
};

// Lesen: Text mit antippbaren Wörtern
UEBUNG.lesen = u => {
  const t = AKTIV.inhalt.texte[u.text];
  return karte(u.id, u.titel || t.titel, u.auftrag || "Lies den Text. Unbekannte Wörter antippen.", h("div", { class: "text" }, textTokens(u.text).map((s, i) => [h("span", { class: "nr-satz" }, String(i + 1)), satzEl(s, "lesen")])), { ohneWertung: true });
};

// Freie Antwort mit Musterlösung und Selbsteinschätzung
UEBUNG.frei = u => {
  const wert = {}; const erg = h("p", { class: "ergebnis" }); let karteEl;
  const ol = h("ol", { class: "aufgaben" });
  u.items.forEach((it, i) => {
    const key = `frei:${AKTIV.meta.id}/${u.id}/${i}`; const feld = h("textarea", { class: "feld", placeholder: "Deine Antwort …" }); feld.value = speicher.get(key, "");
    feld.addEventListener("input", () => speicher.set(key, feld.value));
    const muster = h("div", { class: "muster", hidden: true, html: "<b>Muster:</b> " + fett(it.m) });
    const selbst = h("div", { class: "selbst", hidden: true }, h("span", { class: "leise" }, "Hattest du das?"),
      [["ja", 1], ["teilweise", .5], ["nein", 0]].map(([l, w]) => h("button", { class: "knopf", type: "button", "aria-pressed": "false", onclick() {
        $$("button", selbst).forEach(x => x.setAttribute("aria-pressed", "false")); this.setAttribute("aria-pressed", "true"); wert[i] = w;
        if (Object.keys(wert).length === u.items.length) { const s = Object.values(wert).reduce((a, b) => a + b, 0); karteEl.fertig(s, u.items.length); erg.textContent = "Selbst bewertet: " + String(s).replace(".", ",") + " von " + u.items.length; }
      } }, l)));
    ol.append(h("li", { class: "aufgabe" }, h("div", { class: "frage", html: fett(it.q) }), feld, h("div", { class: "knoepfe", style: "margin-top:6px" }, h("button", { class: "knopf", type: "button", onclick() { muster.hidden = false; selbst.hidden = false; this.disabled = true; } }, "Muster zeigen")), muster, selbst));
  });
  karteEl = karte(u.id, u.titel, u.auftrag, [ol, erg]);
  return karteEl;
};

/* ---------- Vokabeln einer Arbeit ---------- */
function vokPool() {
  const w = speicher.get("vokfilter:" + AKTIV.meta.id, "alle");
  return AKTIV.vok.lektionen.flatMap(l => (w === "alle" || w === l.name) ? l.vokabeln.map(v => ({ ...v, lektion: l.name })) : []);
}
const kurz = v => v.de.slice(0, 2).join("; ");
function vokFilter() {
  const w = speicher.get("vokfilter:" + AKTIV.meta.id, "alle");
  return h("div", { class: "chips" }, [["alle", "Alle"], ...AKTIV.vok.lektionen.map(l => [l.name, l.name])].map(([k, l]) =>
    h("button", { class: "chip", type: "button", "aria-pressed": String(k === w), onclick() { speicher.set("vokfilter:" + AKTIV.meta.id, k); route(); } },
      l + " (" + (k === "alle" ? AKTIV.vok.lektionen.reduce((a, x) => a + x.vokabeln.length, 0) : AKTIV.vok.lektionen.find(x => x.name === k).vokabeln.length) + ")")));
}
function vokBedeutung() {
  const pool = vokPool(); const alle = Object.values(AKTIV.lex);
  const items = mischen(pool).slice(0, 10).map(v => {
    const andere = mischen(alle.filter(x => x.fw !== v.fw && kurz(x) !== kurz(v))).slice(0, 3);
    return { q: `<span style="font-family:Georgia,serif;font-size:1.1rem">${esc(v.fw)}</span>`, o: [kurz(v), ...andere.map(kurz)], a: 0, v };
  });
  return UEBUNG.auswahl({ id: "vok-bedeutung", titel: "Bedeutung wählen", auftrag: "Zehn Wörter pro Runde. Tasten **1–4** gehen auch. Falsch beantwortete Wörter kommen in deine Lückenliste.", items },
    { falsch: it => inLuecken(AKTIV.sprache, it.v.fw, it.v.de.join("; "), AKTIV.meta.titel) });
}
function vokKarten() {
  let stapel = mischen(vokPool()), offen = false; const n0 = stapel.length; const box = h("div");
  const zeichne = () => {
    box.innerHTML = "";
    if (!stapel.length) { box.append(h("div", { class: "rueck ok" }, "✓ Alle " + n0 + " Karten durch."), h("div", { class: "knoepfe" }, h("button", { class: "knopf", type: "button", onclick() { stapel = mischen(vokPool()); zeichne(); } }, "Nochmal"))); return; }
    const v = stapel[0];
    box.append(h("button", { class: "kkarte", type: "button", onclick() { offen = !offen; zeichne(); } }, offen ? [h("div", { class: "gross" }, v.fw), h("div", {}, v.de.join("; "))] : [h("div", { class: "gross" }, v.fw), h("div", { class: "klein" }, "antippen für die Bedeutung")]),
      h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick() { stapel.shift(); offen = false; gezaehlt(); zeichne(); } }, "Kann ich"),
        h("button", { class: "knopf", type: "button", onclick() { inLuecken(AKTIV.sprache, v.fw, v.de.join("; "), AKTIV.meta.titel); stapel.push(stapel.shift()); offen = false; zeichne(); } }, "Nicht gewusst → Lücke"),
        h("span", { class: "leise" }, "noch " + stapel.length)));
  };
  zeichne();
  return karte("vok-karten", "Karteikarten", "Lateinisch → Deutsch. „Nicht gewusst“ legt das Wort in die Lückenliste.", box, { ohneWertung: true });
}
function vokSchreiben() {
  const items = mischen(vokPool().filter(v => !/\.\.\.|…|\(/.test(v.fw))).slice(0, 10).map(v => {
    const varianten = new Set([v.fw, v.fw.split(",")[0].trim()]);
    if (/^(SUBST|ADJ|PRON)/.test(v.wa) && / /.test(v.fw)) varianten.add(v.fw.split(" ")[0]);
    return { s: kurz(v) + " → {{" + [...varianten].join("|") + "}}" };
  });
  return UEBUNG.luecke({ id: "vok-schreiben", titel: "Schreiben", auftrag: "Schreib das lateinische Wort. Bei Verben reicht der Infinitiv, bei Nomen die Grundform. **Enter** springt weiter.", items });
}

/* ---------- Seiten ---------- */
const main = () => $("#main");
function kopf(zurueck) {
  $("#kopf").innerHTML = "";
  // append() schreibt null als Text „null“ – darum nur echte Elemente anhängen.
  $("#kopf").append(...[h("a", { class: "marke", href: "#" }, "Arbeitsvorbereitung"), zurueck ? h("div", {}, h("a", { class: "zurueck", href: zurueck[0] }, "← " + zurueck[1])) : null].filter(Boolean));
}
function tageBis(datum) { return Math.ceil((new Date(datum + "T08:00:00") - new Date()) / 864e5); }
function countdownText(d) { const t = tageBis(d); return t > 1 ? `noch ${t} Tage` : t === 1 ? "morgen!" : t === 0 ? "heute!" : "vorbei"; }

function startseite() {
  document.body.removeAttribute("data-sprache"); kopf(); const m = main(); m.innerHTML = "";
  const tage = speicher.get("tage", {});
  const lueckenGesamt = ["la", "es", "en"].reduce((a, sp) => a + Object.keys(luecken(sp)).length, 0);
  m.append(h("p", { class: "unter" }, "Alles für die nächsten Arbeiten an einem Ort."),
    h("div", { class: "zahlen" }, h("div", { class: "zahl" }, h("b", {}, String(serie())), h("span", {}, "Tage am Stück")),
      h("div", { class: "zahl" }, h("b", {}, String(tage[heute()] || 0)), h("span", {}, "Aufgaben heute")),
      h("div", { class: "zahl" }, h("b", {}, String(lueckenGesamt)), h("span", {}, "Vokabellücken"))));
  const kommend = AV.arbeiten.filter(a => tageBis(a.datum) >= 0).sort((a, b) => a.datum.localeCompare(b.datum));
  const vorbei = AV.arbeiten.filter(a => tageBis(a.datum) < 0).sort((a, b) => b.datum.localeCompare(a.datum));
  m.append(h("h2", {}, "Anstehende Arbeiten"));
  if (!kommend.length) m.append(h("p", { class: "leise" }, "Gerade keine. Neue kommen mit dem Befehl klassenarbeit dazu."));
  kommend.forEach(a => m.append(arbeitKarte(a)));
  const sprachen = [...new Set(AV.arbeiten.map(a => a.sprache).filter(s => SPRACHNAME[s]))];
  if (sprachen.length) {
    m.append(h("h2", {}, "Vokabellücken"));
    const box = h("div", { class: "menue" });
    sprachen.forEach(sp => { const n = Object.keys(luecken(sp)).length; box.append(h("a", { href: "#luecken/" + sp, "data-sprache": sp }, h("span", { class: "nr" }, sp.toUpperCase()), h("span", { class: "t" }, SPRACHNAME[sp], h("span", { class: "k" }, n ? "Wörter, die du in Texten angetippt oder falsch hattest" : "noch leer – tipp in Texten Wörter an")), h("span", { class: "p" }, n + " offen"))); });
    m.append(box);
  }
  if (vorbei.length) { m.append(h("h2", {}, "Vorbei")); vorbei.forEach(a => m.append(arbeitKarte(a))); }
}
function arbeitKarte(a) {
  const p = speicher.get("fortschritt:" + a.id, 0);
  return h("a", { class: "karte arbeit-karte", href: "#a/" + a.id, "data-sprache": a.sprache },
    h("div", { class: "titel" }, a.fach + " · " + a.titel),
    h("div", { class: "zeile" }, h("span", {}, new Date(a.datum + "T12:00").toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" })), h("span", { class: "countdown" }, countdownText(a.datum))),
    h("div", { class: "balken" }, h("i", { style: `width:${p}%` })));
}

function abschnittProzent(ab) {
  const ids = ab.bloecke.filter(b => b.typ === "uebung").map(b => AKTIV.meta.id + "/" + b.id);
  if (!ids.length) return null;
  return Math.round(100 * ids.reduce((a, k) => a + (stand(k)?.best || 0), 0) / ids.length);
}
function arbeitSeite() {
  const { meta, inhalt } = AKTIV; document.body.setAttribute("data-sprache", meta.sprache); kopf(["#", "alle Arbeiten"]);
  const m = main(); m.innerHTML = "";
  const proz = inhalt.abschnitte.map(abschnittProzent).filter(x => x != null);
  const gesamt = proz.length ? Math.round(proz.reduce((a, b) => a + b, 0) / proz.length) : 0;
  speicher.set("fortschritt:" + meta.id, gesamt);
  m.append(h("h1", {}, meta.fach + " · " + meta.titel),
    h("p", { class: "unter", html: new Date(meta.datum + "T12:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" }) + ` · <span class="countdown">${countdownText(meta.datum)}</span> · ${gesamt} % geübt` }));
  if (inhalt.tipp) m.append(h("div", { class: "tipp", html: fett(inhalt.tipp) }));
  const menue = h("div", { class: "menue" });
  inhalt.abschnitte.forEach((ab, i) => { const p = abschnittProzent(ab); menue.append(h("a", { href: `#a/${meta.id}/${ab.id}` }, h("span", { class: "nr" }, ab.symbol || String(i + 1)), h("span", { class: "t" }, ab.titel, h("span", { class: "k" }, ab.kurz)), h("span", { class: "p" }, p == null ? "" : p + " %"))); });
  if (SPRACHNAME[meta.sprache]) menue.append(h("a", { href: "#luecken/" + meta.sprache }, h("span", { class: "nr" }, "?"), h("span", { class: "t" }, "Vokabellücken", h("span", { class: "k" }, "deine angetippten und falschen Wörter")), h("span", { class: "p" }, Object.keys(luecken(meta.sprache)).length + " offen")));
  m.append(menue);
  if (inhalt.lernplan) {
    const plan = speicher.get("plan:" + meta.id, {});
    m.append(h("h2", {}, "Was drankommt"), h("div", { class: "karte haken" }, inhalt.lernplan.map((p, i) => { const cb = h("input", { type: "checkbox", id: "plan" + i }); cb.checked = !!plan[i];
      cb.addEventListener("change", () => { const s = speicher.get("plan:" + meta.id, {}); s[i] = cb.checked; speicher.set("plan:" + meta.id, s); }); return h("label", { for: "plan" + i }, cb, h("span", { html: fett(p) })); })));
  }
}
const BLOCK = {
  text: b => h("p", { html: fett(b.html) }),
  tipp: b => h("div", { class: "tipp", html: fett(b.html) }),
  regel: b => h("section", { class: "karte" }, b.titel ? h("h3", { style: "margin-bottom:6px" }, b.titel) : null, h("div", { html: fett(b.html) })),
  tafel: b => h("section", { class: "karte" }, b.titel ? h("h3", { style: "margin-bottom:8px" }, b.titel) : null, h("div", { class: "tab" }, h("table", {}, h("tr", {}, b.kopf.map(k => h("th", {}, k))), b.zeilen.map(z => h("tr", {}, z.map((c, j) => h(j ? "td" : "th", { html: fett(c) }))))))),
  bild: b => h("section", { class: "karte" }, b.titel ? h("h3", { style: "margin-bottom:6px" }, b.titel) : null, h("div", { html: b.html }), b.unter ? h("p", { class: "leise", html: fett(b.unter) }) : null),
  uebung: b => UEBUNG[b.art](b),
  vokFilter: () => vokFilter(), vokBedeutung: () => vokBedeutung(), vokKarten: () => vokKarten(), vokSchreiben: () => vokSchreiben()
};
function abschnittSeite(ab) {
  document.body.setAttribute("data-sprache", AKTIV.meta.sprache); kopf(["#a/" + AKTIV.meta.id, AKTIV.meta.fach + " · " + AKTIV.meta.titel]);
  const m = main(); m.innerHTML = "";
  m.append(h("h1", {}, ab.titel), h("p", { class: "unter" }, ab.kurz));
  const stapel = h("div", { class: "stapel" });
  ab.bloecke.forEach(b => { if (b.ueberschrift) stapel.append(h("h2", { style: "margin:14px 0 0" }, b.ueberschrift)); stapel.append(BLOCK[b.typ](b)); });
  if (ab.probe) {
    const start = Date.now(); const uhr = h("span", { class: "countdown" });
    const t = setInterval(() => { if (!document.body.contains(uhr)) return clearInterval(t); const s = (Date.now() - start) / 1000 | 0; uhr.textContent = String(s / 60 | 0).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }, 1000);
    m.insertBefore(h("p", { class: "unter" }, "Zeit: ", uhr), m.children[2] || null);
    stapel.append(h("section", { class: "karte ergebnisbox" }, h("h3", {}, "Auswertung"), h("p", { class: "leise" }, "Bearbeite oben alles (Übersetzung selbst bewerten), dann hier auswerten."),
      h("div", { class: "knoepfe", style: "justify-content:center" }, h("button", { class: "knopf haupt", type: "button", onclick() {
        const ids = ab.bloecke.filter(b => b.typ === "uebung").map(b => AKTIV.meta.id + "/" + b.id);
        const werte = ids.map(k => stand(k)?.letzt); const offen = werte.filter(w => w == null).length;
        const p = werte.reduce((a, w) => a + (w || 0), 0) / ids.length;
        const note = p >= .92 ? "1" : p >= .81 ? "2" : p >= .67 ? "3" : p >= .5 ? "4" : p >= .3 ? "5" : "6";
        const rekordK = "rekord:" + AKTIV.meta.id; const alt = speicher.get(rekordK, 0); if (!offen && p > alt) speicher.set(rekordK, p);
        this.parentElement.after(h("div", {}, h("div", { class: "gross" }, Math.round(p * 100) + " %"), h("p", {}, "grob Note " + note + (offen ? ` · ${offen} Teil(e) noch offen` : "") + " · Zeit " + uhr.textContent), h("p", { class: "leise" }, "Dein Rekord: " + Math.round(Math.max(alt, offen ? 0 : p) * 100) + " %")));
        this.disabled = true; if (p >= .92) konfetti(this);
      } }, "Auswerten"))));
  }
  m.append(stapel);
}

/* ---------- Lücken-Modus ---------- */
async function lueckenSeite(sp) {
  document.body.setAttribute("data-sprache", sp); kopf(["#", "alle Arbeiten"]);
  // Wörterbuch aller Arbeiten dieser Sprache laden (für die Ablenker)
  const ids = AV.arbeiten.filter(a => a.sprache === sp && a.vokabeln !== false).map(a => a.id);
  await Promise.all(ids.map(id => ladeSkript(`arbeiten/${id}/vokabeln.js`).catch(() => null)));
  const lex = ids.flatMap(id => (AV.vokabeln[id]?.lektionen || []).flatMap(l => l.vokabeln));
  const m = main(); m.innerHTML = "";
  const L = luecken(sp); const woerter = Object.entries(L);
  m.append(h("h1", {}, "Vokabellücken · " + SPRACHNAME[sp]), h("p", { class: "unter" }, woerter.length + " offen · ein Wort ist raus, wenn du es 3× hintereinander richtig hast"));
  if (!woerter.length) { m.append(h("section", { class: "karte" }, h("p", {}, "Noch leer. Tipp beim Übersetzen und Lesen Wörter an, die du nicht mehr weißt – oder antworte bei den Vokabeln falsch 😉. Sie landen hier."))); return; }
  // Runde: Bedeutung wählen, die schwächsten zuerst
  const runde = mischen(woerter).sort((a, b) => a[1].richtig - b[1].richtig).slice(0, 10);
  const box = h("section", { class: "karte" });
  const ol = h("ol", { class: "aufgaben" }); let b = 0, r = 0; const erg = h("p", { class: "ergebnis" });
  runde.forEach(([fw, info]) => {
    const andere = mischen(lex.filter(v => v.fw !== fw)).slice(0, 3).map(v => v.de.slice(0, 2).join("; "));
    while (andere.length < 3) andere.push(["—", "–", "?"][andere.length]);
    const opts = mischen([info.de.split("; ").slice(0, 2).join("; "), ...andere]); const richtigText = info.de.split("; ").slice(0, 2).join("; ");
    const rueck = h("div", { class: "rueck", hidden: true }); let fertig = false;
    const kn = opts.map((o, i) => h("button", { class: "option", type: "button", onclick() {
      if (fertig) return; fertig = true; b++; const ok = o === richtigText; if (ok) r++;
      kn.forEach(k => { k.disabled = true; if (k.textContent.slice(1) === richtigText) k.classList.add("ok"); }); if (!ok) this.classList.add("nein");
      const l = luecken(sp); if (l[fw]) { l[fw].richtig = ok ? l[fw].richtig + 1 : 0; if (l[fw].richtig >= 3) { delete l[fw]; rueck.textContent = "✓ 3× richtig – raus aus der Liste! 🎉"; } else rueck.textContent = ok ? `✓ ${l[fw].richtig}/3` : "✗ zurück auf 0/3"; speicher.set(lueckenKey(sp), l); }
      rueck.hidden = false; rueck.className = "rueck " + (ok ? "ok" : "nein"); gezaehlt();
      if (b === runde.length) erg.textContent = r + " von " + runde.length + " richtig.";
    } }, h("kbd", {}, String(i + 1)), o));
    ol.append(h("li", { class: "aufgabe" }, h("div", { class: "frage" }, h("b", { style: "font-family:Georgia,serif;font-size:1.1rem" }, fw), " ", h("span", { class: "leise" }, "(" + info.richtig + "/3)")), h("div", { class: "optionen" }, kn), rueck));
  });
  box.append(h("div", { class: "kartenkopf" }, h("h3", {}, "Lücken schließen"), h("span", { class: "marke-klein" }, runde.length + " Wörter")), ol, erg,
    h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick: () => lueckenSeite(sp) }, "Nächste Runde")));
  m.append(box);
  const liste = h("section", { class: "karte" }, h("h3", { style: "margin-bottom:8px" }, "Alle Lücken"),
    h("div", { class: "tab" }, h("table", {}, h("tr", {}, h("th", {}, SPRACHNAME[sp]), h("th", {}, "Deutsch"), h("th", {}, "")),
      woerter.sort((a, b) => a[0].localeCompare(b[0])).map(([fw, i]) => h("tr", {}, h("td", { style: "font-family:Georgia,serif" }, fw), h("td", {}, i.de), h("td", { class: "leise" }, "●".repeat(i.richtig) + "○".repeat(3 - i.richtig)))))));
  m.append(liste);
}

/* Tasten 1–4 für die erste offene Auswahlaufgabe */
document.addEventListener("keydown", e => {
  if (!/^[1-4]$/.test(e.key) || e.target.matches("input, textarea")) return;
  const li = $$("li.aufgabe").find(x => x.querySelector(".option:not(:disabled)"));
  const k = li && $$(".option", li)[+e.key - 1]; if (k && !k.disabled) { k.click(); e.preventDefault(); }
});

/* ---------- Router ---------- */
async function route() {
  schliessePop();
  const teile = decodeURIComponent(location.hash.slice(1)).split("/");
  try {
    if (teile[0] === "a" && teile[1]) {
      const a = await ladeArbeit(teile[1]); AKTIV = { ...a, lex: baueLexikon(a), sprache: a.meta.sprache };
      const ab = a.inhalt.abschnitte.find(x => x.id === teile[2]);
      ab ? abschnittSeite(ab) : arbeitSeite();
    } else if (teile[0] === "luecken" && teile[1]) await lueckenSeite(teile[1]);
    else startseite();
  } catch (err) { main().innerHTML = ""; main().append(h("section", { class: "karte" }, h("p", {}, "Konnte nicht laden: " + err.message))); console.error(err); }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
