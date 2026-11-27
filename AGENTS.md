# AGENTS.md – Arbeitsstand und Regeln für KI-Assistenten

Gemeinsamer Stand für alle KI-Assistenten an diesem Repo. **Zuerst lesen, bei jeder Änderung mitpflegen.** Nur der aktuelle Stand; Geschichte in `VERLAUF.md`. Das Repo ist öffentlich – nichts Persönliches eintragen, keine echten Beträge.

**Stand:** v1 (27.11.2026)

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
- Docs: `rec` (feste Posten, `r…`: name, amount, type in|out, cat, every 1|3|6|12, start/end YYYY-MM, changes [{from, amount}], note), `tx` (Buchungen, `t…`: date, amount, type, cat, name), `loan` (`l…`: balance, rate, interest % p. a., asOf, original, first, lender, note), `settings` (eigene Kategorien `cats`). `example: true` = Beispieldaten.
- Sicherung: JSON `{ app: "finanzen", format: 1, version, exported, docs }`.
- Andere localStorage-Schlüssel: `finanzen-tab`, `finanzen-draft`, `finanzen-lastbackup`.

## Offen
- CSV-Import vom Kontoauszug, Budget pro Kategorie (angeboten, nicht beauftragt).
