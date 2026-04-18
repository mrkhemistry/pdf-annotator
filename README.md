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
| **Ink** | Draw freehand pen marks. Pick any color from the palette and adjust the size. |
| **Highlight** | Highlighter over text. Uses multiply blend so dark text underneath stays readable. Dark colors (blue, green, etc.) are auto-lightened to look like a true highlighter. |
| **Cover** | Opaque "white-out" brush for hiding answers. Color follows your selection (light gray works well during prep). |
| **Eraser** | Drag over any stroke or image to permanently delete it. |
| **Snip** | Drag a rectangle to capture a region (PDF content + annotations on top). Then click anywhere on any page to paste it as a movable image. |
| **Teach Mode** | Tap a cover to temporarily hide it (revealing the answer). Press **R** to re-cover everything for the next class. |

---

## Save vs Export

- **Save PDF** — downloads a PDF with annotations embedded as editable data. Reopen it in this app to keep editing. Other PDF viewers won't see the annotations (they're in a custom metadata slot only this app reads).
- **Export Flat PDF** — bakes annotations permanently onto the page. Visible in any PDF viewer (Adobe, Chrome, Drawboard) but no longer editable. Use this when sharing notes with students.

---

## Color palette

Ten colors: Red · Blue · Green · Yellow · Purple · Brown · Orange · Black · Gray · White.

Click a swatch to set the current color for whichever tool is active.

---

## Presets — one click for tool, color, and size

Ten preset slots in the bottom toolbar. Defaults:

| Slot | Tool | Color | Size |
|------|------|-------|------|
| 1 | Ink | Red | 3 |
| 2 | Ink | Blue | 3 |
| 3 | Ink | Black | 2 |
| 4 | Ink | Green | 3 |
| 5 | Ink | Black | 5 (thick) |
| 6 | Highlight | Yellow | 4 |
| 7 | Highlight | Orange | 4 |
| 8 | Cover | Gray | 5 |
| 9 | Cover | Gray | 9 (large) |
| 10 | Eraser | — | 6 |

- **Click** a preset to apply it instantly.
- **Right-click** a preset to overwrite it with your current tool, color, and size.
- Presets are saved per-device (browser localStorage).

---

## Teaching workflow

**During lesson prep:**
1. Pick a Cover preset (slot 8 or 9).
2. Scribble over each answer to hide it.
3. Click **Save PDF**.

**During the lesson:**
1. Open the saved PDF.
2. Click **Teach Mode** (or press **T**).
3. Tap a covered answer → it disappears, revealing the answer.
4. After class, press **R** to reset all covers (ready for the next lesson).

---

## Snip workflow

1. Click **Snip**.
2. Drag a rectangle around the region you want to copy. Both PDF content and annotations on top are captured.
3. Navigate to any page.
4. Click anywhere → image pastes at the click point.
5. Click again to drop another copy. Erase to remove.

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
