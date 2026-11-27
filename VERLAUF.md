# Verlauf

Archiv der Änderungen und Entscheidungen. Neue Einträge unten anhängen.
Repo ist öffentlich: hier nur technische Entscheidungen, keine persönlichen Daten.

## 27.11.2026
- Vorstufe lief als Claude-Artifact (Daten im Konto). Auf Wunsch des Besitzers umgebaut nach Vorbild `trainingslog`: PWA auf GitHub Pages, Daten nur lokal.
- v1: `index.html` (alles in einer Datei, kein Build), `sw.js` (Offline, Seite zuerst aus dem Netz), Speicher IndexedDB „finanzen“ + Journal `finanzen-journal` in localStorage (Fallback `finanzen-data`), Sicherung als JSON (`app: "finanzen"`, `format: 1`, `docs`) über Teilen-Menü bzw. Download, Einspielen mit Prüfung (`cleanDoc`), Erinnerung nach 14 Tagen, „Update bereit“-Hinweis über `APP_VERSION`. Reiter: Übersicht, Fix & Abos (Rhythmus 1/3/6/12, `changes` = Betragsänderungen ab Monat), Buchungen, Kredite (Tilgungsplan `sched`, Sondertilgungs-Rechner), Kategorien. Formular-Entwürfe überstehen Neuladen (`finanzen-draft`).
- v2: Reiter „Kategorien“ entfernt (Wunsch des Besitzers). Standardkategorien bleiben, eigene aus Sicherungen werden weiter angezeigt. Beispieldaten nur noch über die leere Übersicht bzw. „Beispiele entfernen“ dort.
- v3: Eingabefelder am iPhone: Datum/Monat und Auswahl ohne Systemdarstellung (wie Trainingslog v-Datumsfix), feste Mindesthöhe 42 px, damit Text und graues Feld nicht überlappen.
- v4: Monats- und Datumsfelder in festem Zweierraster (`.g2`, `.g2x`), damit sie am iPhone nicht mehr verschmelzen oder überlappen; „Endet nach“ heißt „Letzte Zahlung“ mit Hinweis „leer = unbefristet“.
