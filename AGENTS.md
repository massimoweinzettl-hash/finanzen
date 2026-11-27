# AGENTS.md – Arbeitsstand und Regeln für KI-Assistenten

Gemeinsamer Stand für alle KI-Assistenten an diesem Repo. **Zuerst lesen, bei jeder Änderung mitpflegen.** Nur der aktuelle Stand; Geschichte in `VERLAUF.md`. Das Repo ist öffentlich – nichts Persönliches eintragen, keine echten Beträge.

**Stand:** v13 (27.11.2026)

## Nach jeder Änderung
- `APP_VERSION` in `index.html` +1 (die installierte App zeigt dann „Update bereit“).
- Eine Zeile in `VERLAUF.md`, diese Datei aktualisieren, `ANLEITUNG.txt` bei geänderter Bedienung.
- Jede Version einzeln committen; `main` wird über GitHub Pages veröffentlicht. Nach dem Push den Pages-Lauf prüfen.

## Arbeitsweise mit dem Besitzer
- Wie beim Trainingslog: fast nur iPhone, platzsparend, Antworten auf Deutsch und kurz.
- Aussehen und Bedienung vorher abstimmen; eindeutige Fehler direkt beheben.
- Ehrlich rechnen, Vereinfachungen offen benennen (z. B. Kredit: konstante Rate, monatliche Verzinsung).
- **Nie Daten des Besitzers verlieren:** neue Felder rückwärtskompatibel, alte Sicherungen müssen einspielbar bleiben (`cleanDoc`).

## Technik
- Alles in `index.html` (HTML, CSS, JS, kein Build, keine Bibliotheken). Schriften im Repo (`SCHRIFTEN-LIZENZ.txt`).
- `sw.js`: Offline-Cache. Neue Dateien in `FILES` (dann `CACHE` hochzählen) und in `SWC`/`SWF` in `index.html`.
- Daten nur lokal: IndexedDB „finanzen“ (Store `docs`), Journal `finanzen-journal` in localStorage, Fallback `finanzen-data`. Schreiben nur über `put(id, data)`.
- Docs: `rec` (feste Posten, `r…`: name, amount, type in|out, cat, every 1|3|6|12, start/end YYYY-MM, changes [{from, amount}], optional `over` {YYYY-MM: Betrag nur für diesen Monat}, note; einmalige Posten: start = end), `tx` (Buchungen, `t…`: date, amount, type, cat, name), `loan` (`l…`: balance, rate, interest % p. a., asOf, original, first, lender, note, optional balloon + end = Schlussrate), `budgets` (Doc-Id `budgets`: `limits` {Kategorie-Id: € pro Monat}), `settings` (eigene Kategorien `cats`; Reiter Kategorien seit v2 entfernt – Besitzer: sinnlos. Vorhandene eigene Kategorien bleiben lesbar, neue gibt es nicht). `example: true` = Beispieldaten.
- Kontoauszug: `tx` mit `src: "bank"` und `note` (Verwendungszweck). Persönliche Kontodaten nie ins Repo, auch nicht als Testdatei.
- Sicherung: JSON `{ app: "finanzen", format: 1, version, exported, docs }`.
- Andere localStorage-Schlüssel: `finanzen-tab`, `finanzen-draft`, `finanzen-lastbackup`.

## Offen
- Interne Umbuchungen evtl. aus den Summen ausklammern (gefragt, keine Antwort).

## App-Verhalten (seit v11, 1:1 wie Trainingslog, Wunsch des Besitzers)
- Oberfläche nicht markierbar, kein Kopier-Menü (`user-select`/`touch-callout`), Eingaben bleiben markierbar; kein Tipp-Blitz; kein Zoomen (Viewport `#vpm` + `gesturestart` abfangen, `touch-action`).
- Wischen zwischen den Reitern (`TABS`, `swBlocked`: nicht in Feldern, Overlays, seitlich scrollenden Bereichen); `.tabclip` schneidet seitlich ab – kein `overflow` an Vorfahren der Reiterleiste.
- Zahlenfelder (`inputmode`) markieren beim Antippen den Wert. Haptik (`haptic()`: vibrate bzw. versteckter Schalter `.hapsw` in den Reitern) bei Reiterwechsel, Speichern, Monatswahl im Saldo.
- Nur Hochformat: Hinweis `#rotnote` im Querformat.
- Neue App-Details aus dem Trainingslog immer mit übernehmen.

## Aufbau
- Reiter (seit v7, Wunsch des Besitzers): Übersicht · Budgets · Transaktionen. Übersicht = Saldo pro Monat als waagerecht wischbares Balkendiagramm (seit v8: bis 36 Monate zurück, 12 Monate geplant voraus, laufender Monat bei ca. 2/3, Plus grün nach oben, Minus rot nach unten, geplante Balken blass; Balken antippen → Blatt mit Monatsüberblick, seit v12 mit „Einnahmen anpassen“ (`incEdit`: nur dieser Monat / ab diesem Monat / einmalige Einnahme wie Weihnachtsgeld, nicht in abgeschlossenen Kontoauszug-Monaten); Kategorien im Monatsblatt klappen im selben Fenster auf (`cexp`, v13); seit v11 Wischen wählt den Monat unter der Mitte (`sbPick`, scroll-snap), Anzeige oben `sreadHtml` mit Saldo/Ein/Aus, Werte an jedem Balken) und Kategorien als Kuchendiagramm (Ausgaben/Einnahmen, €/%, Monat/Jahr; Kategorie antippen → Blatt mit allen Einträgen) und Geldfluss (Sankey: Einnahmen → Mitte → Ausgaben + Übrig bzw. Fehlbetrag links; eigene Umschalter Monat/Jahr und €/%, % = Anteil an den Einnahmen; Sparen & Anlegen, Sparquote, im Jahr Sparrate pro Monat). Kommende Monate enthalten seit v9 geschätzte Posten (`src: "est"`, `estimates()`): Schnitt der letzten 6 abgeschlossenen Monate je Art+Kategorie, nur Buchungen, die zu keinem festen Posten/keiner Kreditrate passen (Wunsch des Besitzers). Budgets = Umschalter Budgets (Monatslimits pro Kategorie) · Fix & Abos · Kredite. Transaktionen = früher Buchungen. Kategorie-Farben fest pro Kategorie (`CCOL`), nicht nach Rang. Alte gespeicherte Reiter `rec`/`loan` landen unter Budgets. Zahnrad oben links: Sicherung, Version. Beispieldaten nur über die leere Übersicht.
