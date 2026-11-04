/* Latein 9 · Klassenarbeit Lektion 20 (Do., 5.11.2026).
   Vokabeln AUSSCHLIESSLICH aus Navigium L1, L8, L11, L20 (vokabeln.js). Jede Wortform in den Texten steht in `formen`
   und zeigt auf einen Navigium-Eintrag – geprüft mit tools/pruefe.js. Eigennamen stehen in `namen`.
   Markierungen in Texten: wort#p1 = PPP Nr. 1, wort#b1 = sein Bezugswort, wort#k = Konjunktiv,
   Stilmittel: #al Alliteration, #as Asyndeton, #an Antithese, #kl Klimax, #he Hendiadyoin, #hy Hyperbel. */
AV.inhalte["latein9-l20"] = {
  tipp: "Über 80 % des Arbeitstextes stammen aus dem **Lektionstext 20** – übe ihn zusätzlich mit dem Textlexikon 20 in Navigium. Hier übst du alles drumherum an eigenen Texten, die **nur Wörter aus L1, L8, L11 und L20** benutzen.",
  lernplan: [
    "**Texte übersetzen** – Satz für Satz, unbekannte Wörter antippen",
    "**PC mit PPP**: PPP bilden, Bezugswort finden (KNG), richtig übersetzen",
    "**Deklination**: a-, o-, 3. Deklination und das PPP wie captus, -a, -um",
    "**Konjunktiv** Präsens und Perfekt erkennen und bilden",
    "**Nebensätze**: ut, nē, cum, indirekte Fragen – deutsch mit Indikativ",
    "**Stilmittel**: Alliteration, Hendiadyoin, Antithese, Klimax, Asyndeton, Hyperbel – und ihre Wirkung",
    "**Vokabeln** L1, L8, L11, L20 – Lücken schließen",
    "**Probearbeit** unter Zeit, danach Vokabellücken leer machen"
  ],
  namen: {
    calgacus: "Calgacus (Anführer der Kaledonier in Britannien)", calgaci: "des Calgacus",
    romani: "die Römer", romanorum: "der Römer", romana: "römisch", britannorum: "der Britannier"
  },
  formen: {
    dux: "dux ducis", egregius: "egregius a um", cunctos: "cuncti ae a", cunctas: "cuncti ae a",
    milites: "miles militis", ad: "ad", castra: "castra -orum", vocat: "vocare,voco,vocavi", vocati: "vocare,voco,vocavi",
    ubi: "ubi", venerunt: "venire", veniunt: "venire", venit: "venire", orationem: "oratio orationis",
    habet: "habere,habeo,habui", habeant: "habere,habeo,habui", non: "non", solum: "solum",
    terras: "terra terrae", terram: "terra terrae", sed: "sed", etiam: "etiam", libertatem: "libertas libertatis",
    nostram: "noster nostra nostrum", rapere: "rapere,rapio,rapui,raptum", rapiunt: "rapere,rapio,rapui,raptum", raptos: "rapere,rapio,rapui,raptum",
    volunt: "velle,volo,volui", velitis: "velle,volo,volui", principes: "princeps principis", plebem: "plebs plebis", plebs: "plebs plebis",
    captam: "capere,capio,cepi", capta: "capere,capio,cepi", captum: "capere,capio,cepi", premunt: "premere,premo,pressi",
    oppida: "oppidum -i", tenent: "tenere,teneo,tenui", vicos: "vicus -i", vicum: "vicus -i",
    desertos: "deserere,desero,deserui,desertum", desertus: "deserere,desero,deserui,desertum", desertum: "deserere,desero,deserui,desertum",
    relinquunt: "relinquere,relinquo,reliqui", relinquere: "relinquere,relinquo,reliqui", vident: "videre", vincunt: "vincere,vinco,vici",
    amicitiam: "amicitia -ae", dicunt: "dicere,dico,dixi", servitutem: "servitus servitutis", faciunt: "facere,facio,feci,",
    undique: "undique", cum: "cum", nihil: "nihil nisi", nisi: "nihil nisi", dent: "dare,do,dedi", dant: "dare,do,dedi",
    bellum: "bellum -i", gerere: "gerere,gero,gessi,gestum", debemus: "debere", labore: "labor laboris", et: "et",
    periculo: "periculum, periculi", defendimus: "defendere,defendo,defendi", defendere: "defendere,defendo,defendi", defendunt: "defendere,defendo,defendi",
    nunc: "nunc", rogo: "rogare", rogat: "rogare", utrum: "utrum ... an", an: "utrum ... an",
    clamant: "clamare", clamat: "clamare", contendunt: "contendere,contendo,contendi", contendit: "contendere,contendo,contendi",
    ne: "ne", amittant: "amittere,amitto,amisi",
    legio: "legio legionis", frequentem: "frequens frequentis", accedit: "accedere,accedo,accessi", muniunt: "munire,munio,munivi",
    flet: "flere,fleo,flevi", rident: "ridere", consul: "consul consulis", obsides: "obses obsidis",
    adductos: "adducere,adduco,adduxi,adductum", urbem: "urbs urbis", mittit: "mittere,mitto,misi", auxilia: "auxilia -orum",
    iuncta: "iungere,iungo,iunxi,iunctum", tacet: "tacere", equos: "equus", ducunt: "ducere,duco,duxi", duxerunt: "ducere,duco,duxi",
    currunt: "currere,curro,cucurri",
    comes: "comes comitis", hodie: "hodie", domum: "domum", aspicit: "aspicere,aspicio,aspexi", fratrem: "frater fratris", frater: "frater fratris",
    suum: "suus a um", enim: "enim", quantam: "quantus a um", cupiditatem: "cupiditas cupiditatis", ut: "ut", auxilium: "auxilium -i",
    petat: "petere,peto,petivi", ibi: "ibi"
  },
  texte: {
    A: { titel: "Die Rede des Calgacus", saetze: [
      { la: "Calgacus, dux egregius, cunctos milites ad castra vocat.", de: "Calgacus, ein hervorragender Anführer, ruft alle Soldaten ins Lager." },
      { la: "Ubi milites venerunt, orationem habet:", de: "Sobald die Soldaten gekommen sind, hält er eine Rede:", hinw: "ubi + Perfekt = **sobald**. orationem habere = eine Rede halten." },
      { la: "„Romani non solum terras, sed etiam libertatem nostram rapere volunt.", de: "„Die Römer wollen nicht nur die Länder, sondern auch unsere Freiheit rauben.", hinw: "non solum …, sed etiam = nicht nur …, sondern auch." },
      { la: "Principes#al Romanorum plebem#b1#al captam#p1 premunt#al.", de: "Die führenden Männer der Römer unterdrücken das gefangene Volk (das Volk, das gefangen genommen worden ist).", hinw: "captam gehört zu plebem (Akk. Sg. f.) – PPP: vorzeitig und passiv." },
      { la: "Oppida#b2 capta#p2 tenent, vicos#b3 desertos#p3 relinquunt.", de: "Die eroberten Städte halten sie fest, die verlassenen Dörfer lassen sie zurück.", hinw: "capta → oppida (Akk. Pl. n.), desertos → vicos (Akk. Pl. m.)." },
      { la: "Veniunt#as#kl, vident#as#kl, vincunt#as#kl, rapiunt#as#kl.", de: "Sie kommen, sehen, siegen, rauben.", hinw: "Kein „und“ (Asyndeton) – und es steigert sich bis zum Rauben (Klimax)." },
      { la: "Amicitiam#an dicunt, servitutem#an faciunt.", de: "Sie reden von Freundschaft, (aber) sie schaffen Sklaverei.", hinw: "Freundschaft ↔ Sklaverei: Antithese." },
      { la: "Undique veniunt, cunctas#hy terras#hy rapiunt.", de: "Von überallher kommen sie, alle Länder rauben sie.", hinw: "„alle Länder“ ist übertrieben: Hyperbel." },
      { la: "Cum Romani nihil nisi servitutem dent#k, bellum gerere debemus.", de: "Weil die Römer nichts als Sklaverei geben, müssen wir Krieg führen.", hinw: "cum + Konjunktiv, hier kausal: **weil**. Deutsch im Indikativ (geben)." },
      { la: "Labore#he et periculo#he libertatem defendimus.", de: "Unter gefahrvoller Mühe verteidigen wir die Freiheit.", hinw: "labore et periculo = Hendiadyoin (zwei Wörter, ein Gedanke). „Mit Mühe und Gefahr“ ist auch richtig." },
      { la: "Nunc rogo, utrum terram nostram defendere an relinquere velitis#k.", de: "Jetzt frage ich, ob ihr unser Land verteidigen oder verlassen wollt.", hinw: "Indirekte Frage mit utrum … an = ob … oder → Konjunktiv, deutsch Indikativ." },
      { la: "Milites clamant et contendunt, ne libertatem amittant#k.", de: "Die Soldaten schreien und strengen sich an, damit sie die Freiheit nicht verlieren.", hinw: "nē + Konjunktiv = damit nicht." }
    ] },
    B: { titel: "Die Römer im Dorf", saetze: [
      { la: "Legio Romana ad vicum frequentem accedit.", de: "Eine römische Legion nähert sich dem belebten (volkreichen) Dorf." },
      { la: "Milites vicum#b1 captum#p1 undique muniunt.", de: "Die Soldaten befestigen das eroberte Dorf von allen Seiten.", hinw: "captum → vicum (Akk. Sg. m.): das Dorf, das erobert worden ist." },
      { la: "Plebs#b2 capta#p2 flet, sed milites rident.", de: "Das gefangene Volk weint, aber die Soldaten lachen.", hinw: "capta → plebs (Nom. Sg. f.)." },
      { la: "Consul obsides#b3 adductos#p3 ad urbem mittit.", de: "Der Konsul schickt die herangeführten Geiseln in die Stadt.", hinw: "Auch: … die Geiseln, nachdem sie herangeführt worden sind, …" },
      { la: "Auxilia#b4 iuncta#p4 castra defendunt.", de: "Nachdem die Hilfstruppen vereinigt worden sind, verteidigen sie das Lager.", hinw: "iuncta → auxilia (Nom. Pl. n.), nicht castra – die Hilfstruppen verteidigen." },
      { la: "Dux#b5 Britannorum desertus#p5 non tacet, sed clamat.", de: "Obwohl der Anführer der Britannier im Stich gelassen worden ist, schweigt er nicht, sondern schreit.", hinw: "Wörtlich auch gut: Der im Stich gelassene Anführer …" },
      { la: "Romani equos#b6 raptos#p6 ad castra ducunt.", de: "Die Römer führen die geraubten Pferde ins Lager." },
      { la: "Milites#b7 vocati#p7 currunt.", de: "Nachdem die Soldaten gerufen worden sind, laufen sie herbei.", hinw: "Auch: Die gerufenen Soldaten laufen herbei." }
    ] },
    C: { titel: "Der Gefährte des Calgacus", saetze: [
      { la: "Comes Calgaci hodie domum venit.", de: "Ein Gefährte des Calgacus kommt heute nach Hause." },
      { la: "Vicum#b1 desertum#p1 aspicit et flet.", de: "Er erblickt das verlassene Dorf und weint." },
      { la: "Fratrem suum vocat, sed frater non venit.", de: "Er ruft seinen Bruder, aber der Bruder kommt nicht." },
      { la: "Romani enim fratrem#b2 captum#p2 ad urbem duxerunt.", de: "Die Römer haben den gefangenen Bruder nämlich in die Stadt geführt." },
      { la: "Nunc comes rogat, quantam cupiditatem Romani habeant#k.", de: "Jetzt fragt der Gefährte, wie groß die Gier der Römer ist.", hinw: "Indirekte Frage → Konjunktiv, deutsch Indikativ." },
      { la: "Ad castra Calgaci contendit, ut auxilium petat#k.", de: "Er eilt zum Lager des Calgacus, um Hilfe zu erbitten (damit er Hilfe erbittet)." },
      { la: "Ibi Calgacus clamat: „Romani amicitiam#an dicunt, servitutem#an dant.", de: "Dort ruft Calgacus: „Die Römer reden von Freundschaft, (aber) sie geben Sklaverei." },
      { la: "Veniunt#as, rapiunt#as, premunt#as!“", de: "Sie kommen, sie rauben, sie unterdrücken!“" }
    ] }
  },

  abschnitte: [
  {
    id: "texte", titel: "Texte übersetzen", kurz: "Satz für Satz, mit Musterlösung", symbol: "Ü",
    bloecke: [
      { typ: "tipp", html: "**So geht's:** Tipp ein Wort an, das du nicht mehr weißt – du siehst die Bedeutung, und es landet in deiner **Lückenliste**. Schreib deine Übersetzung, dann „Lösung zeigen“ und ehrlich bewerten." },
      { typ: "uebung", art: "uebersetzen", id: "ue-a", text: "A" },
      { typ: "uebung", art: "uebersetzen", id: "ue-b", text: "B" }
    ]
  },
  {
    id: "pc", titel: "PC mit PPP", kurz: "bilden, Bezugswort finden, übersetzen", symbol: "PC",
    bloecke: [
      { typ: "regel", titel: "Das Partizip Perfekt Passiv (PPP)", html: "**Bildung:** vierte Stammform → <i>captum</i> → <i>captus, capta, captum</i> (dekliniert wie <i>bonus, -a, -um</i>).<br>**Zeitverhältnis:** vorzeitig und **passiv** – es ist schon passiert und mit dem Bezugswort ist etwas gemacht worden.<br>**Bezugswort:** gleicher **K**asus, **N**umerus, **G**enus (KNG)." },
      { typ: "tafel", titel: "So kannst du übersetzen", kopf: ["Art", "Beispiel: Romani oppida capta tenent."], zeilen: [
        ["wörtlich", "Die Römer halten die **eroberten** Städte."],
        ["Relativsatz", "Die Römer halten die Städte, **die erobert worden sind**."],
        ["nachdem (temporal)", "Die Römer halten die Städte, **nachdem sie erobert worden sind**."],
        ["weil (kausal)", "z. B. <i>Plebs capta flet.</i> – **Weil** das Volk gefangen genommen worden ist, weint es."],
        ["obwohl (konzessiv)", "z. B. <i>Dux desertus non tacet.</i> – **Obwohl** der Anführer im Stich gelassen worden ist, schweigt er nicht."] ] },
      { typ: "uebung", art: "luecke", id: "pc-bilden", titel: "PPP bilden", auftrag: "Schreib das PPP im Nominativ Singular maskulin. **Enter** springt weiter.", items: [
        { s: "vocare → {{vocatus}}" }, { s: "capere → {{captus}}" }, { s: "rapere → {{raptus}}" }, { s: "deserere → {{desertus}}" }, { s: "adducere → {{adductus}}" },
        { s: "iungere → {{iunctus}}" }, { s: "mittere → {{missus}}" }, { s: "ducere → {{ductus}}" }, { s: "relinquere → {{relictus}}" }, { s: "videre → {{visus}}" },
        { s: "audire → {{auditus}}" }, { s: "dicere → {{dictus}}" }, { s: "facere → {{factus}}" }, { s: "defendere → {{defensus}}" }, { s: "vincere → {{victus}}" }, { s: "dare → {{datus}}" } ] },
      { typ: "uebung", art: "markieren", id: "pc-mark", text: "B", ziel: "p", titel: "Markiere alle PPP", auftrag: "Klick alle PPP im Text an, dann „Prüfen“." },
      { typ: "uebung", art: "bezug", id: "pc-bezug", text: "B", titel: "Bezugswort finden", auftrag: "Das PPP ist hervorgehoben. **Klick sein Bezugswort** an (gleicher Kasus, Numerus, Genus)." },
      { typ: "uebung", art: "bezug", id: "pc-bezug-a", text: "A", titel: "Bezugswort finden (Text A)", auftrag: "Wie oben, diesmal in der Calgacus-Rede." },
      { typ: "uebung", art: "auswahl", id: "pc-uebers", titel: "Welche Übersetzung passt am besten?", items: [
        { q: "<i>Plebs capta flet.</i>", o: ["Weil das Volk gefangen genommen worden ist, weint es.", "Das Volk, das gefangen nimmt, weint.", "Während das Volk gefangen nimmt, weint es."], a: 0, why: "PPP = passiv und vorzeitig." },
        { q: "<i>Dux desertus non tacet, sed clamat.</i>", o: ["Obwohl der Anführer im Stich gelassen worden ist, schweigt er nicht, sondern schreit.", "Der Anführer, der im Stich lässt, schweigt nicht.", "Weil der Anführer im Stich lässt, schreit er."], a: 0, why: "„schweigt nicht“ ist unerwartet → obwohl passt am besten." },
        { q: "<i>Milites vicum captum muniunt.</i>", o: ["Die Soldaten befestigen das eroberte Dorf.", "Die eroberten Soldaten befestigen das Dorf.", "Die Soldaten erobern das befestigte Dorf."], a: 0, why: "captum gehört zu vicum (Akk. Sg. m.), nicht zu milites." },
        { q: "<i>Auxilia iuncta castra defendunt.</i>", o: ["Nachdem die Hilfstruppen vereinigt worden sind, verteidigen sie das Lager.", "Die Hilfstruppen verteidigen das vereinigte Lager.", "Die Hilfstruppen vereinigen das Lager."], a: 0, why: "iuncta ist Nom. Pl. n. wie auxilia – castra ist hier Akkusativ." },
        { q: "<i>Romani equos raptos ad castra ducunt.</i>", o: ["Die Römer führen die geraubten Pferde ins Lager.", "Die geraubten Römer führen die Pferde ins Lager.", "Die Römer rauben die Pferde und führen das Lager."], a: 0 } ] },
      { typ: "uebung", art: "frei", id: "pc-frei", titel: "PC als Nebensatz übersetzen", auftrag: "Übersetze und mach aus dem PPP einen Nebensatz (nachdem / weil / obwohl).", items: [
        { q: "<i>Milites vocati currunt.</i>", m: "**Nachdem** die Soldaten gerufen worden sind, laufen sie herbei." },
        { q: "<i>Consul obsides adductos ad urbem mittit.</i>", m: "Der Konsul schickt die Geiseln, **nachdem sie herangeführt worden sind**, in die Stadt." },
        { q: "<i>Comes vicum desertum aspicit et flet.</i>", m: "Der Gefährte erblickt das Dorf, **das verlassen worden ist**, und weint. (Relativsatz passt hier am besten.)" } ] }
    ]
  },
  {
    id: "deklination", titel: "Deklination", kurz: "a-, o-, 3. Deklination und das PPP", symbol: "D",
    bloecke: [
      { typ: "tafel", titel: "Endungen auf einen Blick", kopf: ["", "a-Dekl. (terra)", "o-Dekl. m (dominus)", "o-Dekl. n (bellum)", "3. Dekl. (consul)"], zeilen: [
        ["Nom. Sg.", "-a", "-us", "-um", "–"], ["Gen. Sg.", "-ae", "-ī", "-ī", "-is"], ["Dat. Sg.", "-ae", "-ō", "-ō", "-ī"], ["Akk. Sg.", "-am", "-um", "-um", "-em"], ["Abl. Sg.", "-ā", "-ō", "-ō", "-e"],
        ["Nom. Pl.", "-ae", "-ī", "-a", "-ēs"], ["Gen. Pl.", "-ārum", "-ōrum", "-ōrum", "-um"], ["Dat. Pl.", "-īs", "-īs", "-īs", "-ibus"], ["Akk. Pl.", "-ās", "-ōs", "-a", "-ēs"], ["Abl. Pl.", "-īs", "-īs", "-īs", "-ibus"] ] },
      { typ: "uebung", art: "tabelle", id: "d-terra-dominus", titel: "terra und dominus deklinieren", auftrag: "Füll die Tabelle aus (ohne Längenstriche). **Enter** springt weiter.", kopf: ["", "terra Sg.", "terra Pl.", "dominus Sg.", "dominus Pl."], zeilen: [
        ["Nom.", "=terra", "terrae", "=dominus", "domini"], ["Gen.", "terrae", "terrarum", "domini", "dominorum"], ["Dat.", "terrae", "terris", "domino", "dominis"],
        ["Akk.", "terram", "terras", "dominum", "dominos"], ["Abl.", "terra", "terris", "domino", "dominis"] ] },
      { typ: "uebung", art: "tabelle", id: "d-periculum-consul", titel: "periculum und consul deklinieren", kopf: ["", "periculum Sg.", "periculum Pl.", "consul Sg.", "consul Pl."], zeilen: [
        ["Nom.", "=periculum", "pericula", "=consul", "consules"], ["Gen.", "periculi", "periculorum", "consulis", "consulum"], ["Dat.", "periculo", "periculis", "consuli", "consulibus"],
        ["Akk.", "periculum", "pericula", "consulem", "consules"], ["Abl.", "periculo", "periculis", "consule", "consulibus"] ] },
      { typ: "uebung", art: "tabelle", id: "d-caput-libertas", titel: "caput (neutrum!) und libertas", auftrag: "Bei Neutra sind Nominativ und Akkusativ immer gleich, im Plural auf **-a**.", kopf: ["", "caput Sg.", "caput Pl.", "libertas Sg.", "libertas Pl."], zeilen: [
        ["Nom.", "=caput", "capita", "=libertas", "libertates"], ["Gen.", "capitis", "capitum", "libertatis", "libertatum"], ["Dat.", "capiti", "capitibus", "libertati", "libertatibus"],
        ["Akk.", "caput", "capita", "libertatem", "libertates"], ["Abl.", "capite", "capitibus", "libertate", "libertatibus"] ] },
      { typ: "uebung", art: "tabelle", id: "d-ppp", titel: "Das PPP deklinieren: captus, capta, captum", auftrag: "Das PPP geht wie ein Adjektiv der a-/o-Deklination – wichtig, damit du das Bezugswort findest.", kopf: ["", "maskulin", "feminin", "neutrum"], zeilen: [
        ["Nom. Sg.", "=captus", "capta", "captum"], ["Gen. Sg.", "capti", "captae", "capti"], ["Akk. Sg.", "captum", "captam", "captum"], ["Abl. Sg.", "capto", "capta", "capto"],
        ["Nom. Pl.", "capti", "captae", "capta"], ["Akk. Pl.", "captos", "captas", "capta"] ] },
      { typ: "uebung", art: "auswahl", id: "d-bestimmen", titel: "Form bestimmen", auftrag: "Welche Form ist es? (Bei mehreren Möglichkeiten: die, die im Satz gemeint ist.)", items: [
        { q: "<i>plebem</i> (Principes plebem premunt.)", o: ["Akk. Sg.", "Nom. Sg.", "Abl. Sg."], a: 0 },
        { q: "<i>captam</i>", o: ["Akk. Sg. f.", "Nom. Sg. f.", "Akk. Pl. m."], a: 0 },
        { q: "<i>oppida</i> (Oppida capta tenent.)", o: ["Akk. Pl. n.", "Nom. Sg. f.", "Abl. Sg. f."], a: 0, why: "Neutrum Plural auf -a – hier Objekt zu tenent." },
        { q: "<i>militibus</i>", o: ["Dat./Abl. Pl.", "Gen. Pl.", "Akk. Pl."], a: 0 },
        { q: "<i>consulis</i>", o: ["Gen. Sg.", "Akk. Pl.", "Nom. Sg."], a: 0 },
        { q: "<i>labore</i> (Labore et periculo …)", o: ["Abl. Sg.", "Akk. Sg.", "Dat. Sg."], a: 0 },
        { q: "<i>desertos</i>", o: ["Akk. Pl. m.", "Nom. Pl. m.", "Gen. Pl. m."], a: 0 },
        { q: "<i>auxilia</i> (Auxilia iuncta castra defendunt.)", o: ["Nom. Pl. n.", "Akk. Pl. n.", "Nom. Sg. f."], a: 0, why: "Die Hilfstruppen sind das Subjekt – also Nominativ." },
        { q: "<i>fratrem</i>", o: ["Akk. Sg.", "Gen. Pl.", "Abl. Sg."], a: 0 },
        { q: "<i>libertatem</i>", o: ["Akk. Sg.", "Nom. Pl.", "Gen. Sg."], a: 0 } ] }
    ]
  },
  {
    id: "konjunktiv", titel: "Konjunktiv", kurz: "Präsens und Perfekt erkennen und bilden", symbol: "K",
    bloecke: [
      { typ: "tafel", titel: "Kennzeichen", kopf: ["", "Bildung", "Beispiel"], zeilen: [
        ["Präsens, a-Konj.", "Stamm + **-e-** + Endung", "voc**e**t, voc**e**nt"], ["Präsens, andere", "Stamm + **-a-** + Endung", "habe**a**nt, mitt**a**t, pet**a**t"],
        ["esse, posse, velle", "unregelmäßig", "**sit**, **possit**, **velit**is"], ["Perfekt Aktiv", "Perfektstamm + **-eri-** + Endung", "vocav**eri**m, mis**eri**nt"],
        ["Perfekt Passiv", "PPP + **sim, sis, sit …**", "captus **sit**"] ] },
      { typ: "regel", html: "**Falle:** <i>mittet, habebit, petet</i> sind **Futur I** (Indikativ), nicht Konjunktiv. Und im Nebensatz übersetzt du den Konjunktiv fast immer mit dem **Indikativ**: <i>ne amittant</i> → damit sie nicht **verlieren**." },
      { typ: "uebung", art: "tabelle", id: "k-tabelle", titel: "Konjunktiv Präsens bilden", auftrag: "Füll die Tabelle. **Enter** springt weiter.", kopf: ["", "vocare", "habere", "mittere", "esse"], zeilen: [
        ["1. Sg.", "vocem", "habeam", "mittam", "sim"], ["2. Sg.", "voces", "habeas", "mittas", "sis"], ["3. Sg.", "vocet", "habeat", "mittat", "sit"],
        ["1. Pl.", "vocemus", "habeamus", "mittamus", "simus"], ["2. Pl.", "vocetis", "habeatis", "mittatis", "sitis"], ["3. Pl.", "vocent", "habeant", "mittant", "sint"] ] },
      { typ: "uebung", art: "tabelle", id: "k-perfekt", titel: "Konjunktiv Perfekt bilden", kopf: ["", "vocare Aktiv", "capere Passiv (m)"], zeilen: [
        ["1. Sg.", "vocaverim", "captus sim"], ["2. Sg.", "vocaveris", "captus sis"], ["3. Sg.", "vocaverit", "captus sit"],
        ["1. Pl.", "vocaverimus", "capti simus"], ["2. Pl.", "vocaveritis", "capti sitis"], ["3. Pl.", "vocaverint", "capti sint"] ] },
      { typ: "uebung", art: "auswahl", id: "k-bestimmen", titel: "Indikativ oder Konjunktiv?", kategorien: ["Indikativ", "Konjunktiv Präsens", "Konjunktiv Perfekt"], items: [
        { q: "vocet", a: 1 }, { q: "vocat", a: 0 }, { q: "mittat", a: 1 }, { q: "mittit", a: 0 },
        { q: "mittet", a: 0, why: "**Falle:** Futur I (er wird schicken) – Indikativ." }, { q: "habeant", a: 1 }, { q: "habent", a: 0 },
        { q: "petat", a: 1 }, { q: "petet", a: 0, why: "Futur I – Indikativ." }, { q: "dent", a: 1 }, { q: "dant", a: 0 },
        { q: "velitis", a: 1 }, { q: "vultis", a: 0 }, { q: "amittant", a: 1 }, { q: "amittent", a: 0, why: "Futur I – Indikativ." },
        { q: "sit", a: 1 }, { q: "est", a: 0 }, { q: "vocaverim", a: 2 }, { q: "rapuerim", a: 2 },
        { q: "captus sit", a: 2, why: "PPP + sit = Konjunktiv Perfekt Passiv." }, { q: "captus est", a: 0 } ] },
      { typ: "uebung", art: "markieren", id: "k-mark-a", text: "A", ziel: "k", titel: "Markiere alle Konjunktive", auftrag: "In der Calgacus-Rede stecken Konjunktive. Klick sie an, dann „Prüfen“." }
    ]
  },
  {
    id: "nebensaetze", titel: "Nebensätze", kurz: "ut, nē, cum, indirekte Fragen", symbol: "N",
    bloecke: [
      { typ: "tafel", kopf: ["Einleiter", "mit Konjunktiv", "mit Indikativ"], zeilen: [
        ["**ut**", "dass · damit · sodass", "wie · sobald"], ["**nē**", "dass nicht · damit nicht", "–"], ["**cum**", "als/nachdem · weil · obwohl", "(immer) wenn · als"],
        ["**cur, quis, quantus, -ne, utrum … an**", "indirekte Frage: warum, wer, wie groß, ob, ob … oder", "–"], ["**ubi, postquam**", "–", "sobald, nachdem"] ] },
      { typ: "uebung", art: "auswahl", id: "n-einleiter", titel: "Wie übersetzt du den Einleiter?", items: [
        { q: "Milites contendunt, **ut** castra muniant.", o: ["damit", "wie", "sobald"], a: 0, why: "Absicht → damit." },
        { q: "Consul rogat, **ut** milites veniant.", o: ["dass", "damit", "wie"], a: 0, why: "Nach „bitten“ → dass." },
        { q: "Milites clamant, **ne** hostes vicum capiant.", o: ["damit nicht", "dass", "ob"], a: 0 },
        { q: "**Cum** hostes undique veniant, milites castra defendunt.", o: ["weil", "sobald", "wie"], a: 0, why: "cum + Konjunktiv, Grund → weil." },
        { q: "**Ubi** Calgacus clamat, milites veniunt.", o: ["sobald", "wo?", "damit"], a: 0, why: "ubi mit Indikativ = sobald (ubi? mit Fragezeichen = wo?)." },
        { q: "**Postquam** milites venerunt, dux orationem habet.", o: ["nachdem", "weil", "obwohl"], a: 0 },
        { q: "Comes rogat, **cur** frater non veniat.", o: ["warum", "wo", "damit"], a: 0 },
        { q: "Rogo, **quantum** periculum sit.", o: ["wie groß", "warum", "ob"], a: 0 },
        { q: "Dux rogat, **utrum** milites maneant **an** currant.", o: ["ob … oder", "sowohl … als auch", "nicht nur … sondern auch"], a: 0 },
        { q: "Consul rogat, venerit**ne** legio.", o: ["ob", "dass nicht", "damit"], a: 0, why: "-ne im indirekten Fragesatz = ob." } ] },
      { typ: "uebung", art: "auswahl", id: "n-uebers", titel: "Richtig übersetzt?", auftrag: "Achte auf den Indikativ im Deutschen.", items: [
        { q: "Milites contendunt, ne libertatem amittant.", o: ["Die Soldaten strengen sich an, damit sie die Freiheit nicht verlieren.", "Die Soldaten strengen sich an, damit sie die Freiheit nicht verlieren mögen.", "Die Soldaten strengen sich an, dass sie die Freiheit verlieren."], a: 0 },
        { q: "Comes rogat, cur frater non veniat.", o: ["Der Gefährte fragt, warum der Bruder nicht kommt.", "Der Gefährte fragt: Warum kommt der Bruder nicht?", "Der Gefährte fragt, warum der Bruder nicht komme möge."], a: 0, why: "Indirekte Frage: Fragewort + Indikativ, Verb am Ende." },
        { q: "Cum Romani servitutem dent, Britanni bellum gerunt.", o: ["Weil die Römer Sklaverei geben, führen die Britannier Krieg.", "Wenn die Römer Sklaverei geben würden, führten die Britannier Krieg.", "Mit den Römern geben die Britannier Sklaverei."], a: 0, why: "cum ist hier keine Präposition, sondern Subjunktion (+ Konjunktiv)." } ] },
      { typ: "uebung", art: "frei", id: "n-frei", titel: "Übersetze", items: [
        { q: "Dux rogat, utrum milites terram defendere an relinquere velint.", m: "Der Anführer fragt, ob die Soldaten das Land verteidigen oder verlassen wollen." },
        { q: "Consul milites conscribit, ut castra defendant.", m: "Der Konsul wirbt Soldaten an, damit sie das Lager verteidigen." } ] }
    ]
  },
  {
    id: "stilmittel", titel: "Stilmittel", kurz: "eure 6 – im Text finden, Wirkung erklären", symbol: "S",
    bloecke: [
      { typ: "tafel", kopf: ["Stilmittel", "Erkennen", "Beispiel (Text A)", "Typische Wirkung"], zeilen: [
        ["**Alliteration**", "gleicher Anfangsbuchstabe", "<i>Principes … plebem … premunt</i>", "klingt einprägsam, verbindet"],
        ["**Hendiadyoin**", "zwei Wörter mit „und“, ein Begriff", "<i>labore et periculo</i>", "verstärkt, wirkt nachdrücklich"],
        ["**Antithese**", "Gegensatz", "<i>Amicitiam dicunt, servitutem faciunt</i>", "spitzt zu, entlarvt"],
        ["**Klimax**", "Steigerung", "<i>veniunt, vident, vincunt, rapiunt</i>", "Empörung steigt bis zum Höhepunkt"],
        ["**Asyndeton**", "Aufzählung ohne „und“", "<i>veniunt, vident, vincunt, rapiunt</i>", "Tempo, Wucht, wirkt endlos"],
        ["**Hyperbel**", "Übertreibung", "<i>cunctas terras rapiunt</i>", "dramatisiert, macht die Gefahr riesig"] ] },
      { typ: "uebung", art: "markieren", id: "s-allit", text: "A", ziel: "al", titel: "Markiere die Alliteration", auftrag: "Klick die Wörter an, die die Alliteration bilden." },
      { typ: "uebung", art: "markieren", id: "s-anti", text: "A", ziel: "an", titel: "Markiere die Antithese", auftrag: "Klick die beiden Wörter an, die den Gegensatz bilden." },
      { typ: "uebung", art: "markieren", id: "s-hendi", text: "A", ziel: "he", titel: "Markiere das Hendiadyoin" },
      { typ: "uebung", art: "markieren", id: "s-hyper", text: "A", ziel: "hy", titel: "Markiere die Hyperbel", auftrag: "Welche zwei Wörter übertreiben?" },
      { typ: "uebung", art: "auswahl", id: "s-name", titel: "Welches Stilmittel?", kategorien: ["Alliteration", "Hendiadyoin", "Antithese", "Klimax", "Asyndeton", "Hyperbel"], items: [
        { q: "<i>Amicitiam dicunt, servitutem faciunt.</i>", a: 2 },
        { q: "<i>Principes Romanorum plebem premunt.</i>", a: 0 },
        { q: "<i>labore et periculo</i>", a: 1, why: "Zwei Wörter, ein Gedanke: unter gefahrvoller Mühe." },
        { q: "<i>Veniunt, rapiunt, premunt!</i>", a: [4, 3], why: "Ohne „und“ = Asyndeton; es steigert sich = Klimax. Beides richtig." },
        { q: "<i>cunctas terras rapiunt</i>", a: 5 },
        { q: "<i>Plebs capta flet, sed milites rident.</i>", a: 2, why: "weinen ↔ lachen." } ] },
      { typ: "uebung", art: "frei", id: "s-wirkung", titel: "Wirkung erklären", auftrag: "So fragt die Arbeit: Benenne und erkläre die Wirkung in einem Satz.", items: [
        { q: "Calgacus sagt: <i>Amicitiam dicunt, servitutem faciunt.</i> Welche Wirkung hat das?", m: "Antithese: Die schönen Worte der Römer (Freundschaft) werden ihren Taten (Sklaverei) gegenübergestellt – die Römer werden als Lügner entlarvt, die Zuhörer werden empört." },
        { q: "<i>Veniunt, vident, vincunt, rapiunt.</i>", m: "Asyndeton und Klimax: Die schnelle Aufzählung ohne „und“ wirkt atemlos und wuchtig, die Steigerung bis zu „rauben“ macht die Römer immer bedrohlicher und steigert die Empörung." },
        { q: "<i>Undique veniunt, cunctas terras rapiunt.</i>", m: "Hyperbel: „alle Länder“ übertreibt – die Gefahr durch die Römer wirkt riesig, die Zuhörer sollen erschrecken und kämpfen wollen." } ] }
    ]
  },
  {
    id: "vokabeln", titel: "Vokabeln", kurz: "nur L1, L8, L11, L20 aus Navigium", symbol: "V",
    bloecke: [{ typ: "vokFilter" }, { typ: "vokBedeutung" }, { typ: "vokKarten" }, { typ: "vokSchreiben" }]
  },
  {
    id: "probe", titel: "Probearbeit", kurz: "unbekannter Text + Aufgaben, mit Zeit", symbol: "P", probe: true,
    bloecke: [
      { typ: "tipp", html: "Wie in der Arbeit: erst übersetzen, dann die Aufgaben. Wörter antippen geht – in der echten Arbeit nicht 😉 (sie landen aber in deiner Lückenliste)." },
      { typ: "uebung", art: "uebersetzen", id: "p-uebers", text: "C", titel: "Teil 1: Übersetzung" },
      { typ: "uebung", art: "markieren", id: "p-ppp", text: "C", ziel: "p", titel: "Teil 2a: Markiere die PPP" },
      { typ: "uebung", art: "bezug", id: "p-bezug", text: "C", titel: "Teil 2b: Bezugswörter" },
      { typ: "uebung", art: "markieren", id: "p-konj", text: "C", ziel: "k", titel: "Teil 2c: Markiere die Konjunktive" },
      { typ: "uebung", art: "auswahl", id: "p-gramm", titel: "Teil 2d: Grammatik", mischen: false, items: [
        { q: "<i>petat</i> ist …", o: ["3. Sg. Konj. Präsens", "3. Sg. Futur I", "3. Sg. Indikativ Präsens"], a: 0 },
        { q: "Warum steht <i>habeant</i> im Konjunktiv?", o: ["indirekte Frage (quantam …)", "Absicht (ut)", "Wunsch"], a: 0 },
        { q: "<i>ut auxilium petat</i> – Sinnrichtung?", o: ["Absicht: damit/um zu", "Folge: sodass", "Vergleich: wie"], a: 0 },
        { q: "<i>captum</i> (Satz 4) – Kasus, Numerus, Genus?", o: ["Akk. Sg. m.", "Nom. Sg. n.", "Akk. Sg. n."], a: 0, why: "wie fratrem: Akk. Sg. m." } ] },
      { typ: "uebung", art: "auswahl", id: "p-stil", titel: "Teil 3a: Stilmittel benennen", kategorien: ["Alliteration", "Hendiadyoin", "Antithese", "Klimax", "Asyndeton", "Hyperbel"], items: [
        { q: "Satz 7: <i>amicitiam dicunt, servitutem dant</i>", a: 2 }, { q: "Satz 8: <i>Veniunt, rapiunt, premunt!</i>", a: [4, 3] } ] },
      { typ: "uebung", art: "frei", id: "p-wirkung", titel: "Teil 3b: Wirkung", items: [
        { q: "Erkläre die Wirkung der Antithese in Satz 7.", m: "Die Römer versprechen Freundschaft, bringen aber Sklaverei – der Gegensatz entlarvt sie als Lügner und soll die Zuhörer empören." },
        { q: "Erkläre die Wirkung von Satz 8.", m: "Asyndeton/Klimax: Die Aufzählung ohne „und“ wirkt schnell und wuchtig, die Taten steigern sich – die Römer wirken unaufhaltsam und brutal, die Zuhörer sollen zum Kampf bereit sein." } ] }
    ]
  }
  ]
};
