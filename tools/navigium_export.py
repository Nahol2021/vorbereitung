"""Holt die Vokabeln einer Arbeit aus Navigium und schreibt arbeiten/<id>/vokabeln.js.

Aufruf:  ~/claude-projects/1_Schule/vokabel-scanner/venv/bin/python tools/navigium_export.py <arbeit-id>
Welche Lektionen dazugehören, steht in arbeiten/<id>/lektionen.json ([id, Anzeigename]; null = gehört
zur vorigen Lektion). Login und .env kommen aus dem Vokabel-Scanner, Zugangsdaten landen nie in der Datei.
"""
import json, os, sys, datetime

SCANNER = os.path.expanduser("~/claude-projects/1_Schule/vokabel-scanner")
sys.path.insert(0, SCANNER)
from dotenv import load_dotenv  # noqa: E402
load_dotenv(os.path.join(SCANNER, ".env"))
from navigium_common import BASE, SCHOOL, login  # noqa: E402

HIER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main(arbeit):
    ordner = os.path.join(HIER, "arbeiten", arbeit)
    plan = json.load(open(os.path.join(ordner, "lektionen.json"), encoding="utf-8"))
    s = login()
    gesehen, gruppen = set(), []
    for lid, name in plan["lektionen"]:
        r = s.get(f"{BASE}/schule/rest/vokabellektion/{lid}", params={"schule": SCHOOL, "user": s.navigium_user})
        if r.status_code != 200:
            print(f"Lektion {lid} nicht gefunden – übersprungen.")
            continue
        neu = []
        for v in sorted(r.json().get("vokabeln", []), key=lambda v: v.get("pos") or 0):
            if v["latein"] in gesehen:
                continue
            gesehen.add(v["latein"])
            neu.append({"fw": v["latein"], "de": v.get("bedeutungen") or [], "wa": v.get("wortart") or ""})
        if name:
            gruppen.append({"name": name, "vokabeln": neu})
        elif gruppen:
            gruppen[-1]["vokabeln"].extend(neu)
    daten = {"sprache": plan["sprache"], "quelle": "Navigium", "stand": datetime.date.today().isoformat(), "lektionen": gruppen}
    with open(os.path.join(ordner, "vokabeln.js"), "w", encoding="utf-8") as f:
        f.write("// Automatisch erzeugt von tools/navigium_export.py – nicht von Hand bearbeiten.\n")
        f.write(f"AV.vokabeln[{json.dumps(arbeit)}] = " + json.dumps(daten, ensure_ascii=False, indent=1) + ";\n")
    print(arbeit, ":", sum(len(g["vokabeln"]) for g in gruppen), "Vokabeln aus", len(gruppen), "Lektionen")


if __name__ == "__main__":
    main(sys.argv[1])
