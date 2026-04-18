# PDF Annotator

A lightweight web-based PDF annotator for teaching. Annotations save inside the PDF and stay editable when you reopen the file.

**Live app:** https://mrkhemistry.github.io/pdf-annotator/

---

## Quick start

1. Open the live app (bookmark it).
2. Click **Open PDF** and pick a file.
3. Annotate (see tools below).
4. Click **Save PDF** — downloads the same file with your annotations embedded.
5. To resume later, reopen the saved PDF in this app — everything reappears, fully editable.

---

## Tools

| Tool | What it does |
|------|--------------|
| **Ink** | Draw freehand pen marks. Use the color palette + size slider. |
| **Highlight** | Yellow (or any color) highlighter over text. Uses multiply blend so text underneath stays readable. |
| **Cover** | Opaque "white-out" brush for hiding answers. Color is whatever you pick (gray works well during prep). |
| **Eraser** | Drag over any stroke to permanently delete it. |
| **Teach Mode** | Tap a cover to temporarily hide it (reveals the answer). Press **R** to re-cover everything for the next class. |

---

## Presets (one-click tool + color + size)

Five preset slots in the bottom toolbar. Defaults:

1. Red Ink, size 3
2. Blue Ink, size 3
3. Black Ink, size 2
4. Yellow Highlight, size 4
5. Gray Cover, size 5

- **Click** a preset to apply it instantly.
- **Right-click** a preset to overwrite it with your current tool/color/size.
- Presets are saved per-device (browser localStorage).

---

## Teaching workflow

**During lesson prep:**
1. Pick the Cover preset.
2. Scribble over each answer to hide it.
3. Save the PDF.

**During the lesson:**
1. Open the saved PDF.
2. Click **Teach Mode** (or press **T**).
3. Tap a covered answer → it disappears, revealing the answer.
4. After the class, press **R** to reset all covers (ready for the next lesson).

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| ← → | Previous / next page |
| **T** | Toggle teach mode |
| **R** | Reset all covers (re-hide everything) |

---

## Cross-device use

The app is hosted online — open the same URL on any laptop. Sync your PDFs through Google Drive / Dropbox / OneDrive and pick up where you left off.

- **Annotations travel with the PDF** (they're inside the file).
- **Presets do not sync** — set them once per browser.

---

## Privacy

Everything runs in your browser. PDFs and annotations never leave your device — no upload, no server, no tracking.

---

## Notes

- Annotations are stored in a custom PDF metadata field. **Other PDF viewers (Adobe, Chrome, Drawboard) will not show them** — only this app reads them. The PDF still opens normally everywhere; it just looks unmarked.
- If you want a shareable copy with annotations baked in (visible in any viewer, no longer editable), ask for a "flattened export" feature.
