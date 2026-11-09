/* Chemie 9 · Test Elektronenpaarbindung & Molekülbau (Di., 10.11.2026).
   Themen laut Tafelbild: 1.1 Elektronenschreibweise, 1.2 Strukturformeln, 1.3 EPA-Modell, 1.4 Polare Bindungen,
   2.1 Keil-Strich-Formeln, 2.1 Dipole. Molekülformeln müssen NICHT auswendig gekonnt werden → jede Aufgabe nennt sie.
   Zeichnungen: M({a: Atome [x,y,"O"], b: Bindungen [i,j,typ], p: Paare/Punkte [i,winkel,"."?], d: δ-Beschriftungen}). */
(() => {
  const RAD = l => l.length > 1 ? 15 : 11;
  function M(s, label) {
    const w = s.w || 150, hh = s.h || 110, out = [];
    (s.b || []).forEach(([i, j, t]) => {
      const [x1, y1, A] = s.a[i], [x2, y2, B] = s.a[j];
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy, py = ux;
      const sx = x1 + ux * RAD(A), sy = y1 + uy * RAD(A), ex = x2 - ux * RAD(B), ey = y2 - uy * RAD(B);
      const line = (o, cls = "l") => out.push(`<line class="${cls}" x1="${(sx + px * o).toFixed(1)}" y1="${(sy + py * o).toFixed(1)}" x2="${(ex + px * o).toFixed(1)}" y2="${(ey + py * o).toFixed(1)}"/>`);
      if (t === "k") out.push(`<polygon class="keil" points="${sx},${sy} ${(ex + px * 5).toFixed(1)},${(ey + py * 5).toFixed(1)} ${(ex - px * 5).toFixed(1)},${(ey - py * 5).toFixed(1)}"/>`);
      else if (t === "s") line(0, "strich");
      else if (t === 2) { line(3.5); line(-3.5); }
      else if (t === 3) { line(0); line(5); line(-5); }
      else line(0);
    });
    (s.p || []).forEach(([i, g, art]) => {
      const [x, y, A] = s.a[i], r = RAD(A) + 4.5, a = g * Math.PI / 180, cx = x + Math.cos(a) * r, cy = y + Math.sin(a) * r;
      if (art === ".") out.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2.6" class="keil"/>`);
      else { const qx = -Math.sin(a) * 7.5, qy = Math.cos(a) * 7.5; out.push(`<line class="l" x1="${(cx + qx).toFixed(1)}" y1="${(cy + qy).toFixed(1)}" x2="${(cx - qx).toFixed(1)}" y2="${(cy - qy).toFixed(1)}"/>`); }
    });
    s.a.forEach(([x, y, A]) => out.push(`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="18">${A}</text>`));
    (s.d || []).forEach(([x, y, t]) => out.push(`<text class="delta" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">${t}</text>`));
    return `<svg viewBox="0 0 ${w} ${hh}" role="img" aria-label="${label || ""}">${out.join("")}</svg>`;
  }
  const F = (svg, cap) => `<figure class="formel">${svg}<figcaption>${cap}</figcaption></figure>`;
  const G = (...f) => `<div class="formeln">${f.join("")}</div>`;

  /* ---------- Atome in Elektronenschreibweise ---------- */
  const atom = (sym, pts) => M({ w: 70, h: 70, a: [[35, 35, sym]], p: pts }, sym);
  const AT = {
    H: atom("H", [[0, 0, "."]]),
    C: atom("C", [[0, -90, "."], [0, 0, "."], [0, 90, "."], [0, 180, "."]]),
    N: atom("N", [[0, -90], [0, 0, "."], [0, 90, "."], [0, 180, "."]]),
    O: atom("O", [[0, -90], [0, 180], [0, 0, "."], [0, 90, "."]]),
    Cl: atom("Cl", [[0, -90], [0, 180], [0, 90], [0, 0, "."]]),
    Ne: atom("Ne", [[0, -90], [0, 180], [0, 90], [0, 0]])
  };

  /* ---------- Moleküle (Strukturformeln) ---------- */
  const MOL = {
    H2O: M({ a: [[75, 42, "O"], [38, 82, "H"], [112, 82, "H"]], b: [[0, 1], [0, 2]], p: [[0, -125], [0, -55]] }, "Wasser"),
    NH3: M({ a: [[75, 40, "N"], [32, 64, "H"], [118, 64, "H"], [75, 92, "H"]], b: [[0, 1], [0, 2], [0, 3]], p: [[0, -90]] }, "Ammoniak"),
    CH4: M({ a: [[75, 55, "C"], [75, 14, "H"], [75, 96, "H"], [30, 55, "H"], [120, 55, "H"]], b: [[0, 1], [0, 2], [0, 3], [0, 4]] }, "Methan"),
    CO2: M({ w: 170, a: [[28, 55, "O"], [85, 55, "C"], [142, 55, "O"]], b: [[0, 1, 2], [1, 2, 2]], p: [[0, 130], [0, 230], [2, -50], [2, 50]] }, "Kohlenstoffdioxid"),
    HCl: M({ a: [[45, 55, "H"], [102, 55, "Cl"]], b: [[0, 1]], p: [[1, -90], [1, 0], [1, 90]] }, "Chlorwasserstoff"),
    Cl2: M({ a: [[45, 55, "Cl"], [105, 55, "Cl"]], b: [[0, 1]], p: [[0, -90], [0, 180], [0, 90], [1, -90], [1, 0], [1, 90]] }, "Chlor"),
    O2: M({ a: [[48, 55, "O"], [102, 55, "O"]], b: [[0, 1, 2]], p: [[0, 130], [0, 230], [1, -50], [1, 50]] }, "Sauerstoff"),
    N2: M({ a: [[48, 55, "N"], [102, 55, "N"]], b: [[0, 1, 3]], p: [[0, 180], [1, 0]] }, "Stickstoff")
  };
  /* falsche Formeln für Auswahl-Aufgaben */
  const FALSCH = {
    H2O_einPaar: M({ a: [[75, 42, "O"], [38, 82, "H"], [112, 82, "H"]], b: [[0, 1], [0, 2]], p: [[0, -90]] }),
    H2O_kette: M({ w: 170, a: [[28, 55, "H"], [85, 55, "H"], [142, 55, "O"]], b: [[0, 1], [1, 2]], p: [[2, -90], [2, 0], [2, 90]] }),
    NH3_ohne: M({ a: [[75, 40, "N"], [32, 64, "H"], [118, 64, "H"], [75, 92, "H"]], b: [[0, 1], [0, 2], [0, 3]] }),
    NH3_zwei: M({ a: [[75, 40, "N"], [32, 64, "H"], [118, 64, "H"], [75, 92, "H"]], b: [[0, 1], [0, 2], [0, 3]], p: [[0, -125], [0, -55]] }),
    CO2_einfach: M({ w: 170, a: [[28, 55, "O"], [85, 55, "C"], [142, 55, "O"]], b: [[0, 1], [1, 2]], p: [[0, -90], [0, 180], [0, 90], [2, -90], [2, 0], [2, 90]] }),
    CO2_cpaar: M({ w: 170, a: [[28, 55, "O"], [85, 55, "C"], [142, 55, "O"]], b: [[0, 1, 2], [1, 2, 2]], p: [[0, 130], [0, 230], [2, -50], [2, 50], [1, -90]] }),
    Cl2_zwei: M({ a: [[45, 55, "Cl"], [105, 55, "Cl"]], b: [[0, 1]], p: [[0, -90], [0, 90], [1, -90], [1, 90]] })
  };

  /* ---------- Keil-Strich-Formeln ---------- */
  const KS = {
    CH4: M({ a: [[72, 52, "C"], [72, 12, "H"], [30, 76, "H"], [120, 72, "H"], [96, 98, "H"]], b: [[0, 1], [0, 2], [0, 3, "s"], [0, 4, "k"]] }, "Methan räumlich"),
    NH3: M({ a: [[72, 46, "N"], [30, 76, "H"], [120, 70, "H"], [92, 98, "H"]], b: [[0, 1], [0, 2, "s"], [0, 3, "k"]], p: [[0, -90]] }, "Ammoniak räumlich"),
    H2O: M({ a: [[75, 46, "O"], [38, 84, "H"], [112, 84, "H"]], b: [[0, 1], [0, 2]], p: [[0, -125, ], [0, -55]] }, "Wasser"),
    CCl4: M({ w: 170, h: 130, a: [[82, 60, "C"], [82, 16, "Cl"], [32, 88, "Cl"], [136, 82, "Cl"], [108, 114, "Cl"]], b: [[0, 1], [0, 2], [0, 3, "s"], [0, 4, "k"]] }, "Tetrachlormethan räumlich"),
    CH3Cl: M({ a: [[72, 52, "C"], [72, 12, "Cl"], [30, 76, "H"], [120, 72, "H"], [96, 98, "H"]], b: [[0, 1], [0, 2], [0, 3, "s"], [0, 4, "k"]] }, "Chlormethan räumlich")
  };

  /* ---------- Teilladungen ---------- */
  const DP = {
    HCl: M({ a: [[45, 60, "H"], [102, 60, "Cl"]], b: [[0, 1]], p: [[1, -90], [1, 0], [1, 90]], d: [[45, 36, "δ+"], [132, 36, "δ−"]] }, "HCl mit Teilladungen"),
    H2O: M({ h: 120, a: [[75, 48, "O"], [38, 88, "H"], [112, 88, "H"]], b: [[0, 1], [0, 2]], p: [[0, -125], [0, -55]], d: [[75, 14, "δ−"], [22, 106, "δ+"], [128, 106, "δ+"]] }, "Wasser mit Teilladungen"),
    CO2: M({ w: 170, a: [[28, 62, "O"], [85, 62, "C"], [142, 62, "O"]], b: [[0, 1, 2], [1, 2, 2]], p: [[0, 130], [0, 230], [2, -50], [2, 50]], d: [[28, 26, "δ−"], [85, 34, "δ+"], [142, 26, "δ−"]] }, "CO2 mit Teilladungen")
  };

  const EN = "<b>EN-Werte:</b> H 2,2 · C 2,5 · N 3,0 · O 3,5 · Cl 3,0 · F 4,0 · Na 0,9 · Mg 1,2";

  AV.inhalte["chemie9-bindungen"] = {
    tipp: "Formeln musst du **nicht auswendig** können – jede Aufgabe nennt sie. Du übst das **Verfahren**: Elektronen zählen → Strukturformel → räumlicher Bau → polar? → Dipol? EN-Werte stehen immer dabei (eure Tabelle kann um 0,1 abweichen).",
    lernplan: [
      "**Elektronenschreibweise**: Valenzelektronen aus der Hauptgruppe, Punkte und Striche",
      "**Strukturformeln**: bindende und freie Elektronenpaare, Edelgasregel (Oktett)",
      "**EPA-Modell**: Elektronenpaare stoßen sich ab → Tetraeder, pyramidal, gewinkelt, linear",
      "**Polare Bindungen**: ΔEN ausrechnen, δ+ und δ− richtig setzen",
      "**Keil-Strich-Formeln**: Keil = nach vorn, gestrichelt = nach hinten",
      "**Dipole**: polare Bindungen + unsymmetrischer Bau",
      "**Fachbegriffe** sicher erklären",
      "**Probetest** unter Zeit"
    ],
    abschnitte: [
      /* ============ 1.1 ============ */
      {
        id: "elektronen", titel: "Elektronenschreibweise", kurz: "Valenzelektronen, Punkte und Striche", symbol: "1.1",
        bloecke: [
          { typ: "regel", titel: "So geht's", html: "Die **Valenzelektronen** sind die Elektronen auf der äußersten Schale. Ihre Zahl = **Nummer der Hauptgruppe** (H: 1, C: 4, N: 5, O: 6, Cl: 7).<br>In der Elektronenschreibweise stehen sie rund um das Elementsymbol: ein **Punkt** = einzelnes Elektron, ein **Strich** = Elektronenpaar. Erst alle vier Seiten mit einem Punkt besetzen, ab dem 5. Elektron Paare bilden.<br>**Einzelne Elektronen** (Punkte) können eine Bindung eingehen → ihre Zahl ist die **Bindigkeit**." },
          { typ: "bild", titel: "Beispiele", html: G(F(AT.H, "H · I. HG"), F(AT.C, "C · IV. HG"), F(AT.N, "N · V. HG"), F(AT.O, "O · VI. HG"), F(AT.Cl, "Cl · VII. HG"), F(AT.Ne, "Ne · VIII. HG")) },
          { typ: "uebung", art: "tabelle", id: "e-tab", titel: "Atome auswerten", auftrag: "Die Hauptgruppe ist vorgegeben. Trag ein: Valenzelektronen, Punkte (einzelne Elektronen) und Striche (Paare). **Enter** springt weiter.",
            kopf: ["Atom", "Hauptgruppe", "Valenz-e⁻", "Punkte", "Striche"], zeilen: [
              ["H", "=I", "1", "1", "0"],
              ["C", "=IV", "4", "4", "0"],
              ["N", "=V", "5", "3", "1"],
              ["O", "=VI", "6", "2", "2"],
              ["F", "=VII", "7", "1", "3"],
              ["S", "=VI", "6", "2", "2"],
              ["P", "=V", "5", "3", "1"],
              ["Ne", "=VIII", "8", "0", "4"]
            ] },
          { typ: "uebung", art: "auswahl", id: "e-welches", titel: "Welches Atom ist das?", auftrag: "Zähl Punkte (1 Elektron) und Striche (2 Elektronen).", items: [
            { q: "Welches Atom ist das?" + G(F(AT.O, "?")), o: ["Sauerstoff (VI. HG)", "Stickstoff (V. HG)", "Kohlenstoff (IV. HG)", "Chlor (VII. HG)"], a: 0, why: "2 Striche (4 e⁻) + 2 Punkte = **6 Valenzelektronen** → VI. Hauptgruppe." },
            { q: "Welches Atom ist das?" + G(F(AT.N, "?")), o: ["Stickstoff (V. HG)", "Sauerstoff (VI. HG)", "Kohlenstoff (IV. HG)", "Wasserstoff (I. HG)"], a: 0, why: "1 Strich + 3 Punkte = **5** → V. Hauptgruppe." },
            { q: "Welches Atom ist das?" + G(F(AT.Cl, "?")), o: ["Chlor (VII. HG)", "Sauerstoff (VI. HG)", "Neon (VIII. HG)", "Stickstoff (V. HG)"], a: 0, why: "3 Striche + 1 Punkt = **7** → VII. Hauptgruppe." },
            { q: "Ein Atom hat **4 Valenzelektronen**. Wie wird es gezeichnet?", o: ["4 Punkte, kein Strich", "2 Striche", "1 Strich und 2 Punkte", "4 Striche"], a: 0, why: "Erst alle vier Seiten mit je einem Punkt besetzen – Paare erst ab dem 5. Elektron." },
            { q: "Wie viele **Bindungen** kann ein Sauerstoff-Atom eingehen?", o: ["2", "6", "1", "4"], a: 0, why: "O hat **2 einzelne Elektronen** (Punkte) → zweibindig. Rechnung: 8 − 6 = 2." },
            { q: "Wie viele Bindungen kann ein Stickstoff-Atom eingehen?", o: ["3", "5", "1", "2"], a: 0, why: "3 einzelne Elektronen → dreibindig (8 − 5 = 3)." },
            { q: "Warum geht ein **Neon**-Atom keine Bindung ein?", o: ["Es hat schon 8 Valenzelektronen (Edelgaskonfiguration)", "Es hat gar keine Valenzelektronen", "Es ist zu schwer", "Es hat nur einzelne Elektronen"], a: 0, why: "4 Paare = 8 Elektronen = **Oktett**, keine einzelnen Elektronen frei." }
          ] }
        ]
      },
      /* ============ 1.2 ============ */
      {
        id: "struktur", titel: "Strukturformeln", kurz: "bindende und freie Elektronenpaare, Oktett", symbol: "1.2",
        bloecke: [
          { typ: "regel", titel: "Edelgasregel (Oktettregel)", html: "Atome teilen sich Elektronen, bis **jedes Atom 8 Elektronen** um sich hat (Wasserstoff: **2**). Ein gemeinsames Paar = **bindendes Elektronenpaar** (Strich zwischen den Atomen). Paare, die nur zu einem Atom gehören = **freie (nichtbindende) Elektronenpaare**.<br><b>Prüfen:</b> Alle Valenzelektronen zusammenzählen → geteilt durch 2 = Zahl aller Striche in der Formel. Dann bei jedem Atom zählen: Bindungsstriche + freie Paare = 4 Striche (beim H: 1)." },
          { typ: "bild", titel: "Strukturformeln", html: G(F(MOL.H2O, "Wasser H₂O"), F(MOL.NH3, "Ammoniak NH₃"), F(MOL.CH4, "Methan CH₄"), F(MOL.HCl, "Chlorwasserstoff HCl"), F(MOL.CO2, "Kohlenstoffdioxid CO₂"), F(MOL.O2, "Sauerstoff O₂"), F(MOL.N2, "Stickstoff N₂"), F(MOL.Cl2, "Chlor Cl₂")), unter: "Bei O₂ teilen die Atome **2 Paare** (Doppelbindung), bei N₂ **3 Paare** (Dreifachbindung)." },
          { typ: "tafel", titel: "Wie viele Bindungen? (Bindigkeit)", kopf: ["Atom", "Valenz-e⁻", "Bindungen", "freie Paare"], zeilen: [["H", "1", "1", "0"], ["C", "4", "4", "0"], ["N", "5", "3", "1"], ["O", "6", "2", "2"], ["Cl", "7", "1", "3"]] },
          { typ: "uebung", art: "tabelle", id: "s-zaehlen", titel: "Elektronen zählen", auftrag: "Schau dir die Strukturformeln oben an. Trag ein: Valenzelektronen **aller** Atome zusammen, bindende Paare, freie Paare.",
            kopf: ["Molekül", "Valenz-e⁻ gesamt", "bindende Paare", "freie Paare"], zeilen: [
              ["H₂O", "8", "2", "2"],
              ["NH₃", "8", "3", "1"],
              ["CH₄", "8", "4", "0"],
              ["HCl", "8", "1", "3"],
              ["Cl₂", "14", "1", "6"],
              ["O₂", "12", "2", "4"],
              ["N₂", "10", "3", "2"],
              ["CO₂", "16", "4", "4"]
            ] },
          { typ: "uebung", art: "auswahl", id: "s-richtig", titel: "Welche Strukturformel stimmt?", auftrag: "Prüf bei jedem Atom: Hat es 8 Elektronen (H: 2)? Stimmt die Gesamtzahl?", items: [
            { q: "Wasser, **H₂O**:" + G(F(FALSCH.H2O_einPaar, "A"), F(MOL.H2O, "B"), F(FALSCH.H2O_kette, "C")), o: ["A", "B", "C"], fest: true, a: 1, why: "In A hat O nur 6 Elektronen (2 Bindungen + 1 Paar). In C hat das mittlere H **zwei** Bindungen – H darf nur eine." },
            { q: "Ammoniak, **NH₃**:" + G(F(FALSCH.NH3_zwei, "A"), F(FALSCH.NH3_ohne, "B"), F(MOL.NH3, "C")), o: ["A", "B", "C"], fest: true, a: 2, why: "N: 3 Bindungen + **1** freies Paar = 8. A hätte 10 Elektronen, B nur 6." },
            { q: "Kohlenstoffdioxid, **CO₂** (16 Valenzelektronen):" + G(F(MOL.CO2, "A"), F(FALSCH.CO2_einfach, "B"), F(FALSCH.CO2_cpaar, "C")), o: ["A", "B", "C"], fest: true, a: 0, why: "Bei B hat C nur 4 Elektronen um sich. Bei C hat das C-Atom 10 Elektronen und es sind 18 statt 16. Richtig: **zwei Doppelbindungen** O=C=O." },
            { q: "Chlor, **Cl₂**:" + G(F(FALSCH.Cl2_zwei, "A"), F(MOL.Cl2, "B")), o: ["A", "B"], fest: true, a: 1, why: "Jedes Cl hat 7 Valenzelektronen: 1 Bindung + **3** freie Paare = 8." }
          ] },
          { typ: "uebung", art: "luecke", id: "s-luecke", titel: "Lückentext", auftrag: "Ein Wort oder eine Zahl pro Lücke. **Enter** springt weiter.", items: [
            { s: "Ein gemeinsames Elektronenpaar zwischen zwei Atomen heißt {{bindendes|bindendes elektronenpaar::Adjektiv}} Elektronenpaar." },
            { s: "Nach der Edelgasregel hat jedes Atom {{8|acht}} Elektronen um sich, Wasserstoff nur {{2|zwei}}." },
            { s: "Im Wassermolekül hat das O-Atom {{2|zwei}} freie Elektronenpaare." },
            { s: "Teilen zwei Atome zwei Elektronenpaare, nennt man das eine {{Doppelbindung}}." },
            { s: "Kohlenstoff ist {{vierbindig|4-bindig|4}}, Stickstoff {{dreibindig|3-bindig|3}}." }
          ] },
          { typ: "uebung", art: "frei", id: "s-frei", titel: "Selbst zeichnen", auftrag: "Zeichne auf Papier, dann vergleiche. Schreib hier kurz, was du gezeichnet hast.", items: [
            { q: "Zeichne die Strukturformel von **Fluorwasserstoff HF** (F: VII. Hauptgruppe).", m: "H–F, am F **3 freie Elektronenpaare**. F hat 1 Bindung + 3 Paare = 8, H hat 2. Gesamt 1 + 7 = 8 Elektronen = 4 Striche." },
            { q: "Zeichne die Strukturformel von **Schwefelwasserstoff H₂S** (S: VI. Hauptgruppe).", m: "Wie Wasser: H–S–H, am S **2 freie Paare**. Gesamt 2 + 6 = 8 Elektronen = 4 Striche." },
            { q: "Zeichne **Tetrachlormethan CCl₄** (C in der Mitte).", m: "C in der Mitte mit 4 Einfachbindungen zu 4 Cl; jedes Cl hat **3 freie Paare**. C hat 0 freie Paare. Gesamt 4 + 4·7 = 32 Elektronen = 16 Striche." }
          ] }
        ]
      },
      /* ============ 1.3 ============ */
      {
        id: "epa", titel: "EPA-Modell", kurz: "räumlicher Bau und Bindungswinkel", symbol: "1.3",
        bloecke: [
          { typ: "regel", titel: "Elektronenpaarabstoßungsmodell (EPA)", html: "Elektronenpaare sind negativ geladen und **stoßen sich ab**. Darum ordnen sie sich um das Zentralatom **so weit wie möglich voneinander entfernt** an.<br>1. Zentralatom suchen. 2. Elektronenpaare um das Zentralatom zählen (bindende + freie; eine **Doppelbindung zählt wie ein Paar**). 3. Form ablesen.<br><b>Freie Elektronenpaare brauchen mehr Platz</b> → sie drücken die Bindungen etwas zusammen, der Winkel wird kleiner als 109,5°." },
          { typ: "tafel", titel: "Die Formen", kopf: ["Beispiel", "Paare am Zentralatom", "davon frei", "Form", "Winkel"], zeilen: [
            ["CH₄", "4", "0", "**tetraedrisch**", "109,5°"],
            ["NH₃", "4", "1", "**trigonal-pyramidal**", "ca. 107°"],
            ["H₂O", "4", "2", "**gewinkelt**", "ca. 104,5°"],
            ["CO₂", "2 (Doppelbindungen)", "0", "**linear**", "180°"],
            ["CH₂O (H₂C=O)", "3 (eine Doppelbindung)", "0", "**trigonal-planar**", "120°"]
          ] },
          { typ: "uebung", art: "tabelle", id: "epa-tab", titel: "Form bestimmen", auftrag: "Strukturformeln aus 1.2 helfen. Formen: tetraedrisch, trigonal-pyramidal, gewinkelt, linear.",
            kopf: ["Molekül", "Paare am Zentralatom", "davon frei", "Form", "Winkel in °"], zeilen: [
              ["CH₄", "4", "0", "tetraedrisch", "109,5"],
              ["NH₃", "4", "1", "trigonal-pyramidal|pyramidal|trigonal pyramidal", "107"],
              ["H₂O", "4", "2", "gewinkelt", "104,5"],
              ["CO₂", "2", "0", "linear", "180"],
              ["H₂S", "4", "2", "gewinkelt", "=ca. 92 (muss man nicht wissen)"],
              ["CCl₄", "4", "0", "tetraedrisch", "109,5"]
            ] },
          { typ: "uebung", art: "auswahl", id: "epa-auswahl", titel: "Verstanden?", items: [
            { q: "Warum ist das Wassermolekül **gewinkelt** und nicht linear (H–O–H gerade)?", o: ["Die 4 Elektronenpaare am O stoßen sich ab und zeigen in die Ecken eines Tetraeders – 2 davon sind frei", "Die H-Atome ziehen sich gegenseitig an", "Weil O eine Doppelbindung hat", "Weil Wasser flüssig ist"], a: 0, why: "Um O sitzen **4 Paare** (2 bindend, 2 frei) → Tetraeder-Anordnung; man sieht nur die Atome → gewinkelt." },
            { q: "Warum ist der Winkel in NH₃ (107°) kleiner als in CH₄ (109,5°)?", o: ["Das freie Elektronenpaar braucht mehr Platz und drückt die Bindungen zusammen", "N ist kleiner als C", "NH₃ hat weniger Elektronen", "Die H-Atome sind schwerer"], a: 0, why: "**Freie Paare stoßen stärker ab** als bindende." },
            { q: "Warum ist CO₂ **linear**?", o: ["Am C gibt es nur 2 Elektronenpaar-Bereiche (zwei Doppelbindungen), die maximal weit weg = 180° liegen", "C hat 2 freie Paare", "O-Atome stoßen sich nicht ab", "Weil es ein Gas ist"], a: 0, why: "Jede Doppelbindung zählt wie **ein** Bereich → 2 Bereiche → 180°." },
            { q: "Ein Zentralatom hat **3 bindende und 1 freies** Elektronenpaar. Welche Form?", o: ["trigonal-pyramidal", "tetraedrisch", "gewinkelt", "linear"], a: 0, why: "Wie NH₃." },
            { q: "Ein Zentralatom hat **2 bindende und 2 freie** Paare. Welche Form?", o: ["gewinkelt", "linear", "trigonal-pyramidal", "tetraedrisch"], a: 0, why: "Wie H₂O." },
            { q: "Was besagt das EPA-Modell im Kern?", o: ["Elektronenpaare stoßen sich ab und ordnen sich mit größtmöglichem Abstand an", "Elektronen ziehen sich gegenseitig an", "Atome haben immer 8 Bindungen", "Moleküle sind immer flach"], a: 0 }
          ] },
          { typ: "uebung", art: "frei", id: "epa-frei", titel: "Erklären wie im Test", items: [
            { q: "Erkläre mit dem EPA-Modell den räumlichen Bau des **Methan**-Moleküls (CH₄).", m: "Das C-Atom hat **4 bindende Elektronenpaare** und kein freies. Die Paare **stoßen sich ab** und ordnen sich so weit wie möglich voneinander entfernt an → in die Ecken eines **Tetraeders**, Bindungswinkel **109,5°**." },
            { q: "Erkläre den Bau des **Ammoniak**-Moleküls (NH₃).", m: "Am N: **3 bindende + 1 freies** Paar = 4 Paare → tetraedrische Anordnung. Das freie Paar braucht mehr Platz → Winkel ca. **107°**. Man sieht nur die Atome → **trigonal-pyramidal** (Pyramide mit N an der Spitze)." }
          ] }
        ]
      },
      /* ============ 1.4 ============ */
      {
        id: "polar", titel: "Polare Bindungen", kurz: "ΔEN rechnen, δ+ und δ− setzen", symbol: "1.4",
        bloecke: [
          { typ: "regel", titel: "Elektronegativität (EN)", html: "Die **Elektronegativität** gibt an, wie stark ein Atom die Elektronen einer Bindung **zu sich zieht**. Je größer die EN-Differenz (**ΔEN** = größere EN − kleinere EN), desto ungleicher sind die Elektronen verteilt.<br>Das Atom mit der **größeren EN** bekommt eine negative Teilladung **δ−**, das andere **δ+** (δ = „delta“, ein bisschen).<br>" + EN },
          { typ: "tafel", titel: "Faustregel (so steht es in vielen Büchern – prüf eure Grenzen im Heft)", kopf: ["ΔEN", "Bindungsart", "Beispiel"], zeilen: [
            ["unter 0,4", "**unpolare** Elektronenpaarbindung", "Cl–Cl (0), C–H (0,3)"],
            ["0,4 bis 1,7", "**polare** Elektronenpaarbindung", "O–H (1,3), H–Cl (0,8)"],
            ["über 1,7", "**Ionenbindung**", "Na–Cl (2,1)"]
          ] },
          { typ: "bild", titel: "Beispiel: H–Cl", html: G(F(DP.HCl, "ΔEN = 3,0 − 2,2 = 0,8 → polar")), unter: "Cl hat die größere EN → zieht das bindende Paar zu sich → **δ−** am Cl, **δ+** am H." },
          { typ: "uebung", art: "tabelle", id: "p-rechnen", titel: "ΔEN rechnen und einordnen", auftrag: "EN-Werte stehen da. Bindungsart: **unpolar**, **polar** oder **ionisch**.",
            kopf: ["Bindung", "EN-Werte", "ΔEN", "Bindungsart", "δ− sitzt am"], zeilen: [
              ["O–H", "=3,5 / 2,2", "1,3", "polar", "O"],
              ["N–H", "=3,0 / 2,2", "0,8", "polar", "N"],
              ["C–H", "=2,5 / 2,2", "0,3", "unpolar", "=–"],
              ["C=O", "=2,5 / 3,5", "1,0", "polar", "O"],
              ["C–Cl", "=2,5 / 3,0", "0,5", "polar", "Cl"],
              ["Cl–Cl", "=3,0 / 3,0", "0", "unpolar", "=–"],
              ["Na–Cl", "=0,9 / 3,0", "2,1", "ionisch|ionenbindung", "Cl"],
              ["Mg–O", "=1,2 / 3,5", "2,3", "ionisch|ionenbindung", "O"]
            ] },
          { typ: "uebung", art: "auswahl", id: "p-auswahl", titel: "Teilladungen", auftrag: EN, items: [
            { q: "In der **O–H**-Bindung: wo sitzt δ−?", o: ["am O", "am H", "nirgends, die Bindung ist unpolar"], a: 0, why: "O hat die größere EN (3,5 > 2,2)." },
            { q: "In der **N–H**-Bindung: wo sitzt δ+?", o: ["am H", "am N", "nirgends"], a: 0, why: "N zieht stärker (3,0) → δ− am N, **δ+ am H**." },
            { q: "Welche Bindung ist am **stärksten polar**?", o: ["O–H (ΔEN 1,3)", "N–H (ΔEN 0,8)", "C–H (ΔEN 0,3)", "Cl–Cl (ΔEN 0)"], a: 0, why: "Größte ΔEN = größte Polarität." },
            { q: "Warum ist die Bindung im **Cl₂**-Molekül unpolar?", o: ["Beide Atome haben dieselbe EN, ΔEN = 0", "Cl hat keine Elektronen", "Weil es ein Gas ist", "Weil Cl sehr groß ist"], a: 0, why: "Gleiche Atome ziehen gleich stark → Elektronen in der Mitte." },
            { q: "Was bedeutet **δ−**?", o: ["eine negative Teilladung (die Elektronen sind etwas näher an diesem Atom)", "eine volle negative Ladung wie bei einem Ion", "ein freies Elektronenpaar", "eine Doppelbindung"], a: 0 }
          ] }
        ]
      },
      /* ============ 2.1 Keil-Strich ============ */
      {
        id: "keil", titel: "Keil-Strich-Formeln", kurz: "räumlich zeichnen und lesen", symbol: "2.1",
        bloecke: [
          { typ: "regel", titel: "Drei Arten von Strichen", html: "Moleküle sind **räumlich**, Papier ist flach. Darum: <br>• **normaler Strich** = Bindung liegt **in der Papierebene**<br>• **ausgefüllter Keil** = Bindung zeigt **nach vorn** (zum Betrachter)<br>• **gestrichelte Linie** (oder gestrichelter Keil) = Bindung zeigt **nach hinten** (hinter das Papier)<br>Beim Tetraeder: 2 Bindungen in der Ebene, 1 Keil, 1 gestrichelt." },
          { typ: "bild", titel: "Beispiele", html: G(F(KS.CH4, "Methan · tetraedrisch"), F(KS.NH3, "Ammoniak · trigonal-pyramidal"), F(KS.H2O, "Wasser · gewinkelt")) },
          { typ: "uebung", art: "auswahl", id: "k-lesen", titel: "Keil-Strich lesen", items: [
            { q: "Was bedeutet der **ausgefüllte Keil**?" + G(F(KS.CH4, "Methan")), o: ["Die Bindung zeigt nach vorn, aus dem Papier heraus", "Die Bindung zeigt nach hinten", "Es ist eine Doppelbindung", "Die Bindung ist polar"], a: 0 },
            { q: "Was bedeutet die **gestrichelte** Linie?", o: ["Die Bindung zeigt nach hinten, hinter das Papier", "Die Bindung zeigt nach vorn", "Ein freies Elektronenpaar", "Eine schwache Bindung"], a: 0 },
            { q: "Wie viele Bindungen liegen bei Methan in der Keil-Strich-Formel **in der Papierebene**?", o: ["2", "4", "3", "1"], a: 0, why: "2 normale Striche, 1 Keil, 1 gestrichelt." },
            { q: "Welcher Bau ist hier gezeichnet?" + G(F(KS.NH3, "?")), o: ["trigonal-pyramidal", "tetraedrisch", "gewinkelt", "linear"], a: 0, why: "3 Bindungen + 1 freies Paar am Zentralatom." },
            { q: "Welcher Bau ist hier gezeichnet?" + G(F(KS.CCl4, "?")), o: ["tetraedrisch", "trigonal-pyramidal", "linear", "gewinkelt"], a: 0, why: "4 Bindungen, kein freies Paar am C." },
            { q: "Warum braucht man für **CO₂** keine Keile?", o: ["Es ist linear – alle Atome liegen auf einer Linie, also in der Ebene", "CO₂ hat keine Bindungen", "Keile gibt es nur bei Wasserstoff", "Weil C keine freien Paare hat"], a: 0 }
          ] },
          { typ: "uebung", art: "frei", id: "k-frei", titel: "Selbst zeichnen", auftrag: "Auf Papier zeichnen, dann vergleichen.", items: [
            { q: "Zeichne die Keil-Strich-Formel von **Chlormethan CH₃Cl** (C in der Mitte, tetraedrisch).", m: "C in der Mitte; 2 Bindungen als normale Striche (z. B. zu Cl nach oben und zu einem H links), 1 Bindung als **Keil**, 1 **gestrichelt** zu den anderen H. Am Cl 3 freie Paare." + G(F(KS.CH3Cl, "Chlormethan")) }
          ] }
        ]
      },
      /* ============ 2.1 Dipole ============ */
      {
        id: "dipol", titel: "Dipole", kurz: "polare Bindungen + unsymmetrischer Bau", symbol: "D",
        bloecke: [
          { typ: "regel", titel: "Wann ist ein Molekül ein Dipol?", html: "Ein **Dipol** hat eine positive und eine negative Seite. Dafür braucht es **beides**:<br>1. **polare Bindungen** (ΔEN ≥ 0,4) <b>und</b><br>2. einen **unsymmetrischen Bau**, sodass der Schwerpunkt der δ+ und der δ− Ladungen **nicht zusammenfällt**.<br>Bei symmetrischem Bau (linear wie CO₂, tetraedrisch mit 4 gleichen Atomen wie CCl₄) heben sich die Teilladungen auf → **kein Dipol**, obwohl die Bindungen polar sind." },
          { typ: "bild", titel: "Vergleich", html: G(F(DP.H2O, "H₂O · gewinkelt → Dipol"), F(DP.CO2, "CO₂ · linear → kein Dipol"), F(DP.HCl, "HCl → Dipol")), unter: "Bei Wasser liegt δ− oben (O), δ+ unten (H) → zwei Seiten. Bei CO₂ ziehen beide O gleich stark in entgegengesetzte Richtungen → hebt sich auf." },
          { typ: "uebung", art: "tabelle", id: "d-tab", titel: "Dipol oder nicht?", auftrag: "Polare Bindungen? (ja/nein) · symmetrisch? (ja/nein) · Dipol? (ja/nein). Form ist vorgegeben. " + EN,
            kopf: ["Molekül", "Form", "polare Bindungen?", "symmetrisch?", "Dipol?"], zeilen: [
              ["H₂O", "=gewinkelt", "ja", "nein", "ja"],
              ["CO₂", "=linear", "ja", "ja", "nein"],
              ["NH₃", "=trigonal-pyramidal", "ja", "nein", "ja"],
              ["CH₄", "=tetraedrisch", "nein", "ja", "nein"],
              ["HCl", "=linear (2 Atome)", "ja", "nein", "ja"],
              ["CCl₄", "=tetraedrisch", "ja", "ja", "nein"],
              ["CH₃Cl", "=tetraedrisch", "ja", "nein", "ja"],
              ["Cl₂", "=linear (2 Atome)", "nein", "ja", "nein"]
            ] },
          { typ: "uebung", art: "auswahl", id: "d-auswahl", titel: "Begründen", items: [
            { q: "CO₂ hat polare C=O-Bindungen. Warum ist es trotzdem **kein Dipol**?", o: ["Das Molekül ist linear und symmetrisch – die Teilladungen heben sich auf", "C=O ist doch unpolar", "CO₂ hat keine freien Elektronenpaare", "Weil Kohlenstoff δ− trägt"], a: 0 },
            { q: "Warum ist **Wasser** ein Dipol?", o: ["Polare O–H-Bindungen und gewinkelter Bau: δ− am O auf der einen, δ+ an den H auf der anderen Seite", "Weil O zwei freie Paare hat", "Weil Wasser flüssig ist", "Weil H die größere EN hat"], a: 0 },
            { q: "Warum ist **Methan (CH₄)** kein Dipol?", o: ["C–H ist praktisch unpolar (ΔEN 0,3), außerdem ist der Bau symmetrisch", "Weil C vier Bindungen hat", "Weil Methan brennbar ist", "Weil H δ− trägt"], a: 0 },
            { q: "**Tetrachlormethan CCl₄** hat polare C–Cl-Bindungen. Dipol?", o: ["nein – tetraedrisch mit 4 gleichen Atomen, symmetrisch", "ja – polare Bindungen reichen", "ja – weil Cl freie Paare hat", "nein – C–Cl ist unpolar"], a: 0, why: "Polare Bindungen allein reichen nicht – der **Bau** entscheidet mit." },
            { q: "**Chlormethan CH₃Cl**: Dipol?", o: ["ja – drei H und ein Cl, nicht symmetrisch; Cl zieht auf einer Seite", "nein – tetraedrisch heißt immer symmetrisch", "nein – nur C–H-Bindungen", "ja – weil es 5 Atome hat"], a: 0, why: "Tetraeder ist nur symmetrisch, wenn **alle vier** Partner gleich sind." }
          ] },
          { typ: "uebung", art: "frei", id: "d-frei", titel: "Erklären wie im Test", items: [
            { q: "Begründe, ob **Ammoniak (NH₃)** ein Dipol ist. EN: N 3,0, H 2,2.", m: "ΔEN = 0,8 → **polare** N–H-Bindungen, δ− am N, δ+ an den H. NH₃ ist **trigonal-pyramidal** (freies Paar am N) → **unsymmetrisch**: δ− oben am N, δ+ unten bei den H → Ladungsschwerpunkte fallen nicht zusammen → **Dipol**." },
            { q: "Vergleiche **H₂O** und **CO₂**: Beide haben polare Bindungen. Erkläre, warum nur eines ein Dipol ist.", m: "H₂O ist (wegen 2 freier Paare am O) **gewinkelt** → δ− und δ+ auf verschiedenen Seiten → **Dipol**. CO₂ ist **linear** und symmetrisch → die beiden polaren Bindungen zeigen genau entgegengesetzt und **heben sich auf** → kein Dipol." }
          ] }
        ]
      },
      /* ============ Fachbegriffe ============ */
      {
        id: "begriffe", titel: "Fachbegriffe", kurz: "sicher erklären können", symbol: "F",
        bloecke: [
          { typ: "uebung", art: "auswahl", id: "f-def", titel: "Was ist gemeint?", auftrag: "Tasten **1–4** gehen auch.", items: [
            { q: "**Valenzelektronen**", o: ["Elektronen auf der äußersten Schale", "alle Elektronen eines Atoms", "Elektronen im Kern", "geteilte Elektronen"], a: 0 },
            { q: "**Elektronenpaarbindung** (Atombindung)", o: ["Zwei Atome teilen sich ein oder mehrere Elektronenpaare", "Ein Atom gibt Elektronen ab, das andere nimmt sie auf", "Metallatome geben Elektronen in ein Elektronengas", "Moleküle ziehen sich an"], a: 0 },
            { q: "**freies Elektronenpaar**", o: ["Ein Elektronenpaar, das nur zu einem Atom gehört und nicht bindet", "Ein Elektronenpaar zwischen zwei Atomen", "Ein einzelnes Elektron", "Ein Elektronenpaar, das das Molekül verlassen hat"], a: 0 },
            { q: "**Edelgasregel / Oktettregel**", o: ["Atome streben 8 Außenelektronen an (H: 2)", "Atome haben immer 8 Bindungen", "Edelgase gehen 8 Bindungen ein", "Jedes Molekül hat 8 Atome"], a: 0 },
            { q: "**Elektronegativität**", o: ["Maß dafür, wie stark ein Atom bindende Elektronen anzieht", "Zahl der Elektronen eines Atoms", "negative Ladung eines Ions", "Abstoßung zwischen Elektronenpaaren"], a: 0 },
            { q: "**polare Elektronenpaarbindung**", o: ["Die bindenden Elektronen sind zum Atom mit höherer EN verschoben", "Die Elektronen sind genau in der Mitte", "Die Elektronen wurden ganz abgegeben", "Bindung zwischen zwei Metallen"], a: 0 },
            { q: "**Teilladung (δ+/δ−)**", o: ["kleine, nicht volle Ladung durch ungleich verteilte Bindungselektronen", "Ladung eines Ions", "Ladung eines Protons", "halbes Elektron"], a: 0 },
            { q: "**Dipol(-molekül)**", o: ["Molekül mit einem positiven und einem negativen Ende", "Molekül aus zwei Atomen", "Molekül mit Doppelbindung", "Molekül ohne freie Paare"], a: 0 },
            { q: "**EPA-Modell**", o: ["Elektronenpaare stoßen sich ab und ordnen sich mit größtem Abstand an", "Elektronen bewegen sich auf Bahnen um den Kern", "Atome teilen Elektronen", "Moleküle sind flach"], a: 0 },
            { q: "**Bindungswinkel**", o: ["Winkel zwischen zwei Bindungen am Zentralatom", "Winkel, in dem ein Molekül fliegt", "Neigung der Papierebene", "Zahl der Bindungen"], a: 0 },
            { q: "**Tetraeder**", o: ["Körper aus 4 gleichseitigen Dreiecken – Atome sitzen in den 4 Ecken", "flaches Viereck", "Pyramide mit quadratischer Grundfläche", "Würfel"], a: 0 },
            { q: "**Ionenbindung**", o: ["Elektronen werden ganz übertragen, Ionen ziehen sich an (ΔEN > 1,7)", "Elektronen werden geteilt", "Bindung zwischen gleichen Atomen", "Bindung mit freiem Paar"], a: 0 }
          ] },
          { typ: "uebung", art: "luecke", id: "f-luecke", titel: "Begriff einsetzen", auftrag: "Ein Fachbegriff pro Lücke.", items: [
            { s: "Die Elektronen der äußersten Schale heißen {{Valenzelektronen|Außenelektronen}}." },
            { s: "Wie stark ein Atom Bindungselektronen anzieht, beschreibt die {{Elektronegativität|EN}}." },
            { s: "Ein Molekül mit einem positiven und einem negativen Ende ist ein {{Dipol|Dipolmolekül}}." },
            { s: "Methan ist {{tetraedrisch}} gebaut, Wasser {{gewinkelt}}." },
            { s: "In der Keil-Strich-Formel zeigt der Keil nach {{vorn|vorne}}, die gestrichelte Linie nach {{hinten}}." }
          ] }
        ]
      },
      /* ============ Probe ============ */
      {
        id: "probe", titel: "Probetest", kurz: "gemischt, mit Zeit – wie morgen", symbol: "P", probe: true,
        bloecke: [
          { typ: "tipp", html: "Nimm dir **20 Minuten**. Erst alles machen, dann auswerten. " + EN },
          { typ: "uebung", art: "tabelle", id: "pr-atome", titel: "1 · Elektronenschreibweise", auftrag: "Trag Valenzelektronen und Bindigkeit (Zahl der Bindungen) ein.",
            kopf: ["Atom", "Hauptgruppe", "Valenz-e⁻", "Bindungen"], zeilen: [["Br", "=VII", "7", "1"], ["Si", "=IV", "4", "4"], ["Se", "=VI", "6", "2"], ["As", "=V", "5", "3"]] },
          { typ: "uebung", art: "tabelle", id: "pr-mol", titel: "2 · Molekül untersuchen: Phosphan PH₃", auftrag: "P steht in der V. Hauptgruppe, EN(P) = 2,2, EN(H) = 2,2.",
            kopf: ["Frage", "Antwort"], zeilen: [
              ["Valenzelektronen gesamt", "8"],
              ["freie Paare am P", "1"],
              ["Form", "trigonal-pyramidal|pyramidal|trigonal pyramidal"],
              ["ΔEN der P–H-Bindung", "0"],
              ["Bindung polar? (ja/nein)", "nein"]
            ] },
          { typ: "uebung", art: "auswahl", id: "pr-auswahl", titel: "3 · Ankreuzen", items: [
            { q: "**Fluormethan CH₃F** (EN: C 2,5, H 2,2, F 4,0) ist …", o: ["ein Dipol – polare C–F-Bindung, unsymmetrisch", "kein Dipol – tetraedrisch", "kein Dipol – C–F unpolar", "ionisch"], a: 0 },
            { q: "**Schwefelwasserstoff H₂S** ist gewinkelt. Welche Begründung für den Bau stimmt?", o: ["Am S sitzen 2 bindende und 2 freie Paare, die sich abstoßen", "S hat eine Doppelbindung", "Die H-Atome stoßen sich nicht ab", "S hat 4 Bindungen"], a: 0 },
            { q: "**Ethin C₂H₂** hat die Strukturformel H–C≡C–H. Wie viele bindende Elektronenpaare hat das Molekül?", o: ["5", "3", "4", "2"], a: 0, why: "2 C–H + **3** in der Dreifachbindung = 5." },
            { q: "In der Keil-Strich-Formel ist eine Bindung gestrichelt. Das heißt …", o: ["sie zeigt nach hinten", "sie zeigt nach vorn", "sie ist polar", "sie ist schwach"], a: 0 },
            { q: "Welche Bindung ist **ionisch**? (EN: K 0,8, Br 2,8, C 2,5, O 3,5, H 2,2)", o: ["K–Br (ΔEN 2,0)", "C=O (ΔEN 1,0)", "O–H (ΔEN 1,3)", "C–H (ΔEN 0,3)"], a: 0 }
          ] },
          { typ: "uebung", art: "frei", id: "pr-frei", titel: "4 · Erklären", items: [
            { q: "Zeichne die Strukturformel von **Methanal CH₂O** (C in der Mitte, Doppelbindung zum O) und bestimme mit dem EPA-Modell die Form.", m: "H₂C=O: C hat 2 Bindungen zu H und eine **Doppelbindung** zu O, am O **2 freie Paare**. Am C: 3 Elektronenpaar-Bereiche (Doppelbindung zählt einfach), kein freies Paar → **trigonal-planar**, Winkel ca. **120°** (flach, Dreieck)." },
            { q: "Erkläre, warum **Kohlenstoffdioxid** kein Dipol ist, obwohl die C=O-Bindungen polar sind (ΔEN 1,0).", m: "δ− an beiden O, δ+ am C. CO₂ ist **linear** (2 Bereiche am C → 180°) → die Teilladungen liegen **symmetrisch**, ihre Schwerpunkte fallen in der Mitte (am C) zusammen → **kein Dipol**." }
          ] }
        ]
      }
    ]
  };
})();
