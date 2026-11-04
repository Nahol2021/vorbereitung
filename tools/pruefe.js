/* Prüft eine Arbeit: Jede Wortform in den Texten muss in `formen` (→ Navigium-Eintrag aus vokabeln.js) oder in `namen` stehen.
   Außerdem: jedes PPP (#pN) hat ein Bezugswort (#bN). Aufruf: node tools/pruefe.js <arbeit-id> */
const id = process.argv[2]; global.AV = { inhalte: {}, vokabeln: {} };
require(`../arbeiten/${id}/vokabeln.js`); require(`../arbeiten/${id}/inhalt.js`);
const inh = AV.inhalte[id], vok = AV.vokabeln[id];
const erlaubt = new Set(vok.lektionen.flatMap(l => l.vokabeln.map(v => v.fw)));
let fehler = 0;
for (const [f, fw] of Object.entries(inh.formen)) if (!erlaubt.has(fw)) { console.log("✗ Form", f, "→", fw, "ist kein Navigium-Eintrag"); fehler++; }
for (const [tid, t] of Object.entries(inh.texte)) t.saetze.forEach((s, i) => {
  const woerter = s.la.replace(/\[|\]\{[^}]*\}/g, "").split(/\s+/).map(w => w.match(/[\p{L}-]+/u)?.[0]).filter(Boolean);
  woerter.forEach(w => { const k = w.toLowerCase(); if (!inh.formen[k] && !inh.namen[k]) { console.log(`✗ Text ${tid}, Satz ${i + 1}: „${w}“ fehlt in formen/namen`); fehler++; } });
  const p = [...s.la.matchAll(/#p(\d+)/g)].map(m => m[1]), b = [...s.la.matchAll(/#b(\d+)/g)].map(m => m[1]);
  p.forEach(n => { if (!b.includes(n)) { console.log(`✗ Text ${tid}, Satz ${i + 1}: PPP ${n} ohne Bezugswort`); fehler++; } });
});
const n = Object.values(inh.texte).reduce((a, t) => a + t.saetze.length, 0);
console.log(fehler ? `${fehler} Fehler` : `✓ ${id}: alle Wörter in ${n} Sätzen stammen aus ${vok.lektionen.map(l => l.name).join(", ")} (oder sind Eigennamen).`);
process.exit(fehler ? 1 : 0);
