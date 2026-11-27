# Verlauf

Archiv der Änderungen und Entscheidungen. Neue Einträge unten anhängen.
Repo ist öffentlich: hier nur technische Entscheidungen, keine persönlichen Daten.

## 27.11.2026
- Vorstufe lief als Claude-Artifact (Daten im Konto). Auf Wunsch des Besitzers umgebaut nach Vorbild `trainingslog`: PWA auf GitHub Pages, Daten nur lokal.
- v1: `index.html` (alles in einer Datei, kein Build), `sw.js` (Offline, Seite zuerst aus dem Netz), Speicher IndexedDB „finanzen“ + Journal `finanzen-journal` in localStorage (Fallback `finanzen-data`), Sicherung als JSON (`app: "finanzen"`, `format: 1`, `docs`) über Teilen-Menü bzw. Download, Einspielen mit Prüfung (`cleanDoc`), Erinnerung nach 14 Tagen, „Update bereit“-Hinweis über `APP_VERSION`. Reiter: Übersicht, Fix & Abos (Rhythmus 1/3/6/12, `changes` = Betragsänderungen ab Monat), Buchungen, Kredite (Tilgungsplan `sched`, Sondertilgungs-Rechner), Kategorien. Formular-Entwürfe überstehen Neuladen (`finanzen-draft`).
- v2: Reiter „Kategorien“ entfernt (Wunsch des Besitzers). Standardkategorien bleiben, eigene aus Sicherungen werden weiter angezeigt. Beispieldaten nur noch über die leere Übersicht bzw. „Beispiele entfernen“ dort.
- v3: Eingabefelder am iPhone: Datum/Monat und Auswahl ohne Systemdarstellung (wie Trainingslog v-Datumsfix), feste Mindesthöhe 42 px, damit Text und graues Feld nicht überlappen.
- v4: Monats- und Datumsfelder in festem Zweierraster (`.g2`, `.g2x`), damit sie am iPhone nicht mehr verschmelzen oder überlappen; „Endet nach“ heißt „Letzte Zahlung“ mit Hinweis „leer = unbefristet“.
- v5: Kontoauszug einspielen (Reiter Buchungen, `parseBank`): CSV mit Spalten Buchungsdatum/Betrag (DKB-Format, optional Spalte „Kategorie“), vorgemerkte übersprungen, Schlüssel = Datum + Betrag + laufende Nummer (`t`+Hash), damit wiederholte oder überlappende Exporte nichts doppelt anlegen. Kategorien per `guessCat` (feste Posten nach Namen, dann `RULES`). Neue Standardkategorie `shop` „Einkäufe & Shopping“. `monthItems`: abgeschlossener Monat mit Kontoauszug = nur echte Buchungen; laufender Monat = Buchungen + feste Posten ohne passende Kontobuchung (±5 %, „kommt noch“).
- v6: Kredite mit Schlussrate (Ballonfinanzierung): Felder `balloon` und `end`, `schedBalloon()` – feste Raten bis Vormonat, Schlussrate im Monat `end`, Restschuld = Barwert der offenen Zahlungen mit Effektivzins. Sondertilgungs-Rechner gilt dort nicht.
- v7: Neuer Aufbau mit drei Reitern (Wunsch des Besitzers): Übersicht (Saldo pro Monat mit Monatsblatt, Kuchendiagramm nach Kategorie umschaltbar Ausgaben/Einnahmen, €/%, Monat/Jahr, Kategorie antippen zeigt alle Einträge), Budgets (neu: Monatslimits pro Kategorie im Doc `budgets`; darunter Fix & Abos und Kredite), Transaktionen (früher Buchungen). Datenformat sonst unverändert, alte Sicherungen bleiben lesbar.
- v8: Saldo pro Monat als Balkendiagramm statt Liste (Wunsch des Besitzers: Balken, Rückblick und Zukunft, wischbar). Summen „letzte 12 Monate“ und „nächste 12 Monate (geplant)“.
- v9: Kommende Monate schätzen Alltagsausgaben und weitere Einnahmen (Schnitt der letzten 6 Monate ohne feste Posten), damit die Planung nicht zu rosig ist (Entscheidung des Besitzers).
- v10: Geldfluss als Sankey-Diagramm in der Übersicht, umschaltbar Monat/Jahr und €/%, mit Sparquote und Sparrate pro Monat.
- v11: App-Verhalten wie im Trainingslog übernommen (nicht markierbar, kein Zoomen, Wischen zwischen Reitern, Haptik, Zahlenfelder markieren, nur Hochformat). Saldo: Wischen wählt Monat (Anzeige mit Saldo, Einnahmen, Ausgaben), Werte an den Balken.
- v12: Einnahmen im Monatsblatt anpassen (Wunsch des Besitzers: Weihnachtsgeld schwankt, TVöD-Erhöhungen unregelmäßig): Betrag nur für diesen Monat (`over`), ab diesem Monat (`changes`), einmalige Einnahme (fester Posten mit start = end).
- v13: Kategorien im Monatsblatt klappen im selben Fenster auf statt in ein neues Blatt zu springen (Wunsch des Besitzers).
- v14: Haptik bei jedem Monatswechsel im Saldo-Diagramm, auch direkt während der Berührung (iPhone-Schalter-Umweg wirkt nur, solange der Finger aufliegt).
- v15: „Einnahmen anpassen“ verschlankt (Besitzer: zu groß): Einnahmen-Zahl im Monatsblatt antippen, Netto-Gehalt eintragen, ab jetzt / nur dieser Monat; Einmalzahlung über kleinen Link.
- v16: Im Monatsblatt links/rechts wischen (oder ‹ ›) wechselt den Monat, mit Haptik.
- v17: Einnahmen im Monatsblatt nur noch EIN Feld: Netto-Einnahmen dieses Monats (Doc `incover`), ersetzt alle Einnahmen des Monats (Besitzer: keine Unterscheidung, nur dieser Monat).
- v18: Schätzung kommender Monate ohne Doppelzählung: Kategorie-Schnitt der letzten 6 Monate minus feste Posten der Kategorie (vorher z. B. Tanken als fester Posten plus alle Tankbelege, ~3.800 € statt ~3.460 € Ausgaben).
- v19: Unsichtbare Haptik-Schalter in Saldo-Balken und ‹ › des Monatsblatts (iPhone: Haptik nur bei echtem Antippen, beim Wischen nicht möglich).
- v20: Sparen zählt nicht mehr als Ausgabe, sondern erscheint getrennt als „gespart“ (Entscheidung des Besitzers).
