const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Footer, AlignmentType, LevelFormat,
  ExternalHyperlink, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak,
} = require('docx');

const NAVY = "1A4D8C";
const ACCENT = "0A84FF";
const SOFT_BLUE = "D5E8F5";
const LIGHT_GRAY = "F5F5F5";
const MUTED = "555555";

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "C8D6E5" };
const allBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: 300 },
    alignment: opts.align,
    children: [new TextRun({ text, bold: opts.bold, color: opts.color, size: opts.size, italics: opts.italics })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 80, line: 280 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function numbered(text, ref = 'numbers') {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 280 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function headerCell(text, widthDxa) {
  return new TableCell({
    borders: allBorders,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: { fill: NAVY, type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 22 })],
    })],
  });
}

function cell(text, widthDxa, opts = {}) {
  return new TableCell({
    borders: allBorders,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: opts.shade ? { fill: opts.shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    children: [new Paragraph({
      children: [new TextRun({ text, size: 22, bold: opts.bold, color: opts.color })],
    })],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 100, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 1 } },
    children: [],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 32, color: NAVY })],
  });
}

function subHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: ACCENT })],
  });
}

const CONTENT_WIDTH = 9360;

const toolsTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [1800, 7560],
  rows: [
    new TableRow({ tableHeader: true, children: [headerCell('Tool', 1800), headerCell('What it does', 7560)] }),
    new TableRow({ children: [
      cell('Ink', 1800, { bold: true, shade: SOFT_BLUE }),
      cell('Draw freehand pen marks. Pick any color from the palette and adjust the size.', 7560),
    ]}),
    new TableRow({ children: [
      cell('Highlight', 1800, { bold: true, shade: SOFT_BLUE }),
      cell('Highlighter over text. Uses multiply blend so dark text underneath stays readable. Dark colors (blue, green, etc.) are auto-lightened to look like a true highlighter.', 7560),
    ]}),
    new TableRow({ children: [
      cell('Cover', 1800, { bold: true, shade: SOFT_BLUE }),
      cell('Opaque "white-out" brush for hiding answers. Color follows your selection — light gray works well during prep.', 7560),
    ]}),
    new TableRow({ children: [
      cell('Eraser', 1800, { bold: true, shade: SOFT_BLUE }),
      cell('Drag over any stroke or pasted image to permanently delete it.', 7560),
    ]}),
    new TableRow({ children: [
      cell('Snip', 1800, { bold: true, shade: SOFT_BLUE }),
      cell('Drag a rectangle to capture a region (PDF content plus any annotations on top). Then click anywhere on any page to paste it as a movable image.', 7560),
    ]}),
    new TableRow({ children: [
      cell('Teach Mode', 1800, { bold: true, shade: SOFT_BLUE }),
      cell('Tap a cover to temporarily hide it (revealing the answer). Press R to re-cover everything for the next class.', 7560),
    ]}),
  ],
});

const presetData = [
  ['1', 'Ink', 'Red', '3'],
  ['2', 'Ink', 'Blue', '3'],
  ['3', 'Ink', 'Black', '2'],
  ['4', 'Ink', 'Green', '3'],
  ['5', 'Ink', 'Black', '5 (thick)'],
  ['6', 'Highlight', 'Yellow', '4'],
  ['7', 'Highlight', 'Orange', '4'],
  ['8', 'Cover', 'Gray', '5'],
  ['9', 'Cover', 'Gray', '9 (large)'],
  ['10', 'Eraser', '\u2014', '6'],
];

const presetsTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [900, 2200, 2200, 4060],
  rows: [
    new TableRow({ tableHeader: true, children: [
      headerCell('Slot', 900), headerCell('Tool', 2200), headerCell('Color', 2200), headerCell('Size', 4060),
    ]}),
    ...presetData.map(([s, t, c, sz]) => new TableRow({ children: [
      cell(s, 900, { bold: true, shade: LIGHT_GRAY }),
      cell(t, 2200), cell(c, 2200), cell(sz, 4060),
    ]})),
  ],
});

const shortcutsTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [headerCell('Key', 2400), headerCell('Action', 6960)] }),
    ...[
      ['\u2190 \u2192', 'Previous / Next page'],
      ['T', 'Toggle Teach Mode'],
      ['R', 'Reset all covers (re-hide everything)'],
    ].map(([k, a]) => new TableRow({ children: [
      cell(k, 2400, { bold: true, shade: SOFT_BLUE }), cell(a, 6960),
    ]})),
  ],
});

const saveExportTable = new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: [2400, 6960],
  rows: [
    new TableRow({ tableHeader: true, children: [headerCell('Action', 2400), headerCell('What you get', 6960)] }),
    new TableRow({ children: [
      cell('Save PDF', 2400, { bold: true, shade: SOFT_BLUE }),
      cell('PDF with annotations embedded as editable data. Reopen in this app to keep editing. Other PDF viewers will not show the annotations.', 6960),
    ]}),
    new TableRow({ children: [
      cell('Export Flat PDF', 2400, { bold: true, shade: SOFT_BLUE }),
      cell('Annotations baked permanently onto the page. Visible in any PDF viewer (Adobe, Chrome, Drawboard) but no longer editable. Use this when sharing notes with students.', 6960),
    ]}),
  ],
});

const doc = new Document({
  creator: 'Mr Khemistry',
  title: 'PDF Annotator \u2014 User Guide',
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Calibri', color: NAVY },
        paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Calibri', color: ACCENT },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'numbers',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'prep',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'lesson',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'snip',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'PDF Annotator \u2014 User Guide  \u00b7  Page ', size: 18, color: MUTED }),
          new TextRun({ children: [PageNumber.CURRENT], size: 18, color: MUTED }),
        ],
      })] }),
    },
    children: [
      // Hero
      new Paragraph({
        spacing: { before: 600, after: 0 },
        children: [new TextRun({ text: 'PDF ANNOTATOR', bold: true, size: 24, color: ACCENT })],
      }),
      new Paragraph({
        spacing: { before: 60, after: 80 },
        children: [new TextRun({ text: 'A teaching tool for editable PDF annotations', size: 56, bold: true, color: NAVY })],
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: 'Annotate PDFs in your browser. Save once. Reopen anywhere \u2014 fully editable.', size: 24, italics: true, color: MUTED })],
      }),
      divider(),

      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: 'Open the live app', bold: true, size: 22, color: NAVY })],
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new ExternalHyperlink({
          children: [new TextRun({ text: 'https://mrkhemistry.github.io/pdf-annotator/', color: ACCENT, underline: {}, size: 22 })],
          link: 'https://mrkhemistry.github.io/pdf-annotator/',
        })],
      }),

      // Quick start
      sectionHeading('Quick start'),
      numbered('Open the live app and bookmark it.'),
      numbered('Click Open PDF and pick a file from your laptop.'),
      numbered('Annotate using the tools below.'),
      numbered('Click Save PDF \u2014 the file downloads with your annotations embedded inside it.'),
      numbered('To resume later, reopen the same PDF in this app. Everything reappears, fully editable.'),

      // Tools
      sectionHeading('Tools'),
      toolsTable,

      // Save vs Export
      sectionHeading('Save vs Export'),
      saveExportTable,

      // Color palette
      sectionHeading('Color palette'),
      p('Ten colors: Red, Blue, Green, Yellow, Purple, Brown, Orange, Black, Gray, White. Click a swatch to set the current color for whichever tool is active.'),

      // Presets
      sectionHeading('Presets \u2014 one click for tool, color, and size'),
      p('Ten preset slots sit in the bottom toolbar. Defaults are configured for a typical teaching workflow:', { after: 160 }),
      presetsTable,
      new Paragraph({ spacing: { before: 200, after: 80 }, children: [
        new TextRun({ text: 'How to use them:', bold: true, size: 22, color: NAVY }),
      ]}),
      bullet('Click a preset to apply it instantly.'),
      bullet('Right-click a preset to overwrite it with your current tool, color, and size.'),
      bullet('Presets are saved per-device in the browser. Set them once on each laptop.'),

      new Paragraph({ children: [new PageBreak()] }),

      // Teaching workflow
      sectionHeading('Teaching workflow'),
      subHeading('During lesson preparation'),
      numbered('Pick a Cover preset (slot 8 or 9).', 'prep'),
      numbered('Scribble over each answer to hide it.', 'prep'),
      numbered('Click Save PDF.', 'prep'),
      subHeading('During the lesson'),
      numbered('Open the saved PDF.', 'lesson'),
      numbered('Click Teach Mode (or press T).', 'lesson'),
      numbered('Tap a covered answer \u2014 it disappears, revealing the answer underneath.', 'lesson'),
      numbered('After class, press R to reset all covers, ready for the next lesson.', 'lesson'),

      // Snip workflow
      sectionHeading('Snip workflow'),
      numbered('Click Snip.', 'snip'),
      numbered('Drag a rectangle around the region you want to copy. Both PDF content and annotations on top are captured.', 'snip'),
      numbered('Navigate to any page.', 'snip'),
      numbered('Click anywhere \u2014 the image pastes at the click point.', 'snip'),
      numbered('Click again to drop another copy. Use the Eraser to remove.', 'snip'),

      // Shortcuts
      sectionHeading('Keyboard shortcuts'),
      shortcutsTable,

      // Cross-device
      sectionHeading('Use it on multiple laptops'),
      p('The app is hosted online \u2014 open the same URL from any modern browser. Sync your PDFs through Google Drive, Dropbox, or OneDrive and pick up exactly where you left off.', { after: 120 }),
      bullet('Annotations travel with the PDF \u2014 they are stored inside the file itself.'),
      bullet('Presets do not sync \u2014 set them once per browser.'),

      // Privacy
      sectionHeading('Privacy'),
      p('Everything runs in your browser. PDFs and annotations never leave your device \u2014 there is no upload, no server, and no tracking.'),

      divider(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: 'Built for Mr Khemistry  \u00b7  Repository: github.com/mrkhemistry/pdf-annotator', size: 18, italics: true, color: MUTED })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('PDF-Annotator-Guide.docx', buf);
  console.log('Wrote PDF-Annotator-Guide.docx');
});
