# Arbeitsvorbereitung

Eine Seite für alle Klassenarbeiten. Reines HTML/JS, kein Build-Schritt. Lokal öffnen: `index.html`.

- `arbeiten.js` – Liste aller Arbeiten (id, Fach, Sprache, Titel, Datum)
- `arbeiten/<id>/lektionen.json` – welche Navigium-Lektionen dazugehören
- `arbeiten/<id>/vokabeln.js` – **erzeugt** von `tools/navigium_export.py <id>`, nie von Hand ändern
- `arbeiten/<id>/inhalt.js` – Texte, Lernplan, Abschnitte mit Übungen
- `tools/pruefe.js <id>` – prüft: jedes Wort der Texte steht in `formen` → Navigium-Eintrag (oder in `namen`), jedes PPP hat ein Bezugswort
- `app.js` Baukasten, `style.css` Gestaltung

## Texte
Wörter durch Leerzeichen getrennt, Markierungen direkt am Wort:
`wort#p1` PPP Nr. 1 · `wort#b1` sein Bezugswort · `wort#k` Konjunktiv ·
Stilmittel `#al` Alliteration, `#as` Asyndeton, `#an` Antithese, `#kl` Klimax, `#he` Hendiadyoin, `#hy` Hyperbel.
Jeder Satz: `{ la, de, hinw }` (Original, Musterübersetzung, Hinweis).

## Übungsarten (`{ typ: "uebung", art: … }`)
`uebersetzen` (text) · `lesen` (text) · `markieren` (text, ziel: "p" | "k" | "al" …) · `bezug` (text) ·
`tabelle` (kopf, zeilen; "=x" vorgegeben, "a|b" Varianten) · `luecke` ({{lösung|variante::hinweis}}) ·
`auswahl` (items mit q, o, a, why; oder kategorien) · `frei` (q, m = Muster).
Weitere Bausteine: `regel`, `tafel`, `tipp`, `text`, `vokFilter`, `vokBedeutung`, `vokKarten`, `vokSchreiben`.
Abschnitt mit `probe: true` = Probearbeit mit Zeit und Auswertung.

## Vokabellücken
Angetippte Wörter und falsch beantwortete Vokabeln landen pro Sprache in einer Lückenliste (im Browser gespeichert).
Ein Wort verlässt die Liste nach 3× richtig hintereinander.
