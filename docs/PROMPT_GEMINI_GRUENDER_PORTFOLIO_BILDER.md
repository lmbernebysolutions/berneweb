# Prompt: Gründer-Portfolio-Bilder mit Anzug (Gemini)

**Zweck:** Aus normalen Fotos von euch (Lennard & Daniel) professionelle Portfolio-/Gründerbilder im Anzug erzeugen – für die Über-uns-Seite, Team-Section und Marketing.  
**Priorität:** Das Ergebnis soll **wirklich wie ihr aussehen** – realitätsnahe Übernahme der echten Gesichter, Haut, Mimik und Haltung. Nur Kleidung und Setting werden angepasst; das Bild wirkt natürlich, nicht wie ein generisches Stock-Foto.  
**Modell:** Für Gemini mit Bildgenerierung/-bearbeitung (z. B. Gemini 2.0, Image-Generierung oder Edit-Modus mit Bild-Upload).  
**Input:** 1–2 normale Fotos pro Person (frontal oder leicht seitlich, gut beleuchtet, Gesicht klar erkennbar).  
**Output:** Natürlich wirkende Portrait-/Halbfiguren-Bilder – erkennbar ihr, im Anzug, web-tauglich.

---

## 1. System-Kontext (wenn als System-Prompt möglich)

```
Du bist ein professioneller Bildbearbeiter mit Fokus auf realistische, natürliche Portraits. Deine oberste Regel: Die Person aus dem hochgeladenen Foto muss 1:1 erkennbar bleiben – Gesicht, Gesichtszüge, Haut, Mimik, Körperstatur und Haltung so nah wie möglich am Original. Nur Kleidung (Anzug) und Hintergrund/Beleuchtung werden angepasst. Das Ergebnis soll aussehen wie „diese echte Person in einem Anzug“, nicht wie ein generisches Model-Foto. Natürlichkeit und Wiedererkennung gehen vor Perfektion.
```

---

## 2. Haupt-Prompt (für Gemini – mit Bild-Upload)

**Kopiere den folgenden Block und ersetze [NAME] optional durch den Namen. Lade zuerst 1–2 normale Fotos der Person hoch, dann sende den Prompt.**

```
Erzeuge aus dem/den hochgeladenen Foto(s) ein natürliches Gründer- bzw. Portfolio-Portrait. Wichtigste Regel: **Realitätsnahe Übernahme** – das Ergebnis soll eindeutig dieselbe Person zeigen wie das Original.

**Person – treue Übernahme (höchste Priorität)**
- Gesicht, Gesichtszüge, Hautton, Hauttextur und Alter exakt wie im Original beibehalten. Die Person muss sofort wiedererkennbar sein.
- Mimik und Blickrichtung aus dem Original übernehmen oder nur minimal angleichen (natürlich wirken).
- Körperhaltung und Pose aus dem Foto beibehalten; nur die Kleidung wird „angezogen“ (Anzug), nicht die Person neu erfunden.
- Keine Idealisierung: keine geglättete „Plastik“-Haut, keine veränderten Gesichtsproportionen, kein Model-Look. Wirkt wie ein echtes Foto von dieser Person im Anzug.

**Kleidung**
- Die Person trägt einen Anzug: dunkler Business-Anzug (Navy, Anthrazit oder Dunkelgrau), helles Hemd, Krawatte optional.
- Stoff und Schnitt wirken natürlich und passend zur Person, nicht übertrieben gestylt.

**Setting & Beleuchtung**
- Neutraler, ruhiger Hintergrund (weiches Grau oder dezent), der zum Original-Licht passt.
- Beleuchtung natürlich: ähnlich zum Ausgangsfoto oder behutsam verbessert, keine harten Schatten, kein Studio-Kitsch.
- Bildausschnitt: Portrait oder Halbfigur wie im Original, ggf. leicht angepasst.

**Stil**
- Natürlich und authentisch – „so sehen wir aus, nur im Anzug“. Seriös, aber nicht steif.
- Qualität: scharf, keine sichtbaren KI-Artefakte; Gesicht und Hände müssen plausibel und unverfälscht wirken.

**Technische Ausgabe**
- Hochformat oder Quadrat (z. B. 4:5 oder 1:1) für Web. Keine Wasserzeichen, keine Rahmen.
```

---

## 3. Kurz-Version (einzeilig, falls Zeichenlimit)

```
Wandle das hochgeladene Foto in ein natürliches Gründer-Portrait um: Person 1:1 erkennbar lassen – Gesicht, Haut, Mimik und Haltung aus dem Original beibehalten, nur Anzug (dunkel, helles Hemd) und neutralen Hintergrund hinzufügen. Wirkt wie ein echtes Foto von dieser Person im Anzug, nicht wie ein generisches Model-Bild. Natürlich, keine übertriebene Retusche, keine KI-Artefakte.
```

---

## 4. Optionale Verfeinerungen (nach Bedarf anhängen)

- **Einheitlicher Look für zwei Personen:**  
  „Beide Gründer sollen den gleichen Stil haben: gleicher Hintergrund-Typ, gleiche Beleuchtung, gleicher Anzug-Stil (z. B. beide Navy-Anzug, helles Hemd), damit die Bilder auf der Website zusammenpassen.“

- **Hintergrund-Farbe an Marke:**  
  „Hintergrund in einem dezenten Blau-Grau (ähnlich #283569), weich und ohne harte Kanten.“

- **Noch seriöser:**  
  „Krawatte hinzufügen, Anzug klassisch, Bild wirkt wie für eine Kanzlei oder Beratung.“

- **Etwas lockerer:**  
  „Anzug ohne Krawatte, oberster Hemdknopf offen; wirkt modern und zugänglich.“

---

## 5. Was vermeiden (Negative Instructions)

- **Gesicht verändern:** Keine anderen Gesichtszüge, kein „Schönrechnen“, keine Idealisierung – die Person muss exakt wiedererkennbar sein.
- **Plastik-Look:** Keine übertrieben geglättete Haut, keine Retusche die „Model“ wirkt.
- **Pose erfinden:** Haltung und Mimik aus dem Original übernehmen, nicht durch eine generische Pose ersetzen.
- Unglaubwürdige Hände, doppelte Gliedmaßen oder sichtbare KI-Artefakte.
- Sehr bunte oder ablenkende Hintergründe.
- Steife Passfoto-Pose, wenn das Original lockerer wirkt.
- Wasserzeichen oder Text im Bild.

---

## 6. Workflow-Tipp

1. **Pro Person:** 1–2 normale Fotos hochladen (möglichst frontal oder 3/4, gute Auflösung).
2. **Prompt einfügen** (Abschnitt 2 oder 3).
3. **Ergebnis prüfen:** Sieht es wirklich wie ihr aus? Erkennbarkeit zuerst, dann Anzug, Hintergrund, Beleuchtung.
4. **Bei Bedarf:** Eine der Verfeinerungen aus Abschnitt 4 ergänzen und erneut generieren.
5. **Export:** In ausreichender Auflösung speichern (z. B. mind. 800×1000 px für Web).

---

*Erstellt für Berneby Solutions – Gründer-Portraits für Über-uns & Team-Section. Angelehnt an Prompt-Engineering-Skill (Struktur, Constraints, Negative Instructions).*
