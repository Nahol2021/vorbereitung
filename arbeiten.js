/* Alle Arbeiten. Neue Arbeit: Ordner arbeiten/<id>/ mit inhalt.js, vokabeln.js, lektionen.json – und hier eine Zeile.
   Fächer ohne Navigium (Chemie …): nur inhalt.js und vokabeln: false. */
window.AV = window.AV || { arbeiten: [], inhalte: {}, vokabeln: {} };
AV.arbeiten = [
  { id: "latein9-l20", fach: "Latein", sprache: "la", titel: "Lektion 20 · Calgacus", datum: "2026-11-05" },
  { id: "chemie9-bindungen", fach: "Chemie", sprache: "ch", titel: "Test · Elektronenpaarbindung & Molekülbau", datum: "2026-11-10", vokabeln: false }
];
