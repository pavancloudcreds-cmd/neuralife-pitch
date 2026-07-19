// Build-time PDF generator. Run via `npm run generate-pdf` (tsx, plain
// Node.js — NOT part of the browser bundle). Puppeteer launches a real
// headless Chrome, so it cannot run inside a visitor's browser or on
// GitHub Pages (static hosting only). Instead this pre-renders the whole
// 17-page book to a static PDF at build/deploy time; the in-browser
// "Download PDF" button just links to that pre-built file.
//
// The output is imposed for duplex printing, not just the 17 pages back
// to back: see bookStructure.ts for which pages share a physical leaf and
// which get a blank back. Hand this file to a digital press as-is with
// "duplex, flip on long edge" and the front/back of every sheet lines up
// correctly — no separate imposition step needed.
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PDFDocument } from 'pdf-lib';

import { DEMO_STUDENT } from './demoData';
import { NP } from './tokens';
import { processSvgOutline } from './svgOutline';
import { buildPrintLeaves } from './bookStructure';
import type { PageId } from './bookStructure';

import CoverPage from './pages/CoverPage';
import PromisePage from './pages/PromisePage';
import StudentProfilePage from './pages/StudentProfilePage';
import AboutThisReportPage from './pages/AboutThisReportPage';
import CareerPage from './pages/CareerPage';
import AnalysisPage from './pages/AnalysisPage';
import ClassPage from './pages/ClassPage';
import JourneyPage from './pages/JourneyPage';
import NoteForArjunPage from './pages/NoteForArjunPage';
import FeedbackEnglishPage from './pages/FeedbackEnglishPage';
import FeedbackTeluguPage from './pages/FeedbackTeluguPage';
import AllTheBestPage from './pages/AllTheBestPage';
import NeuraIDCertificatePage from './pages/NeuraIDCertificatePage';
import BackCoverPage from './pages/BackCoverPage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..');
const PUBLIC = path.join(ROOT, 'public');

function readAsset(relPath: string): string {
  return fs.readFileSync(path.join(PUBLIC, relPath), 'utf-8');
}

function readAssetBase64DataUri(relPath: string, mime: string): string {
  const buf = fs.readFileSync(path.join(PUBLIC, relPath));
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// Same recolor options used by the live browser hooks (useSVGInline calls in
// CoverPage/JourneyPage/AllTheBestPage) — kept identical so the PDF matches
// the web view pixel-for-pixel.
const POSE1_RAW = readAsset('book/pose1-seated.svg');
const POSE2_RAW = readAsset('book/pose2-celebrated.svg');
const POSE3_RAW = readAsset('book/pose3-horizon.svg');

const scholarGold = processSvgOutline(POSE1_RAW, '#D4A843', 'none');
const scholarNavy = processSvgOutline(POSE1_RAW, '#1A2332', 'none');
const scholarAmber = processSvgOutline(POSE2_RAW, '#92400E', 'none');
const scholarWhite = processSvgOutline(POSE3_RAW, '#FFFFFF', '#FFFFFF');

const QR_DATA_URI = readAssetBase64DataUri('print-assets/qr.png', 'image/png');
const LOGO_DATA_URI = readAssetBase64DataUri('book/neuralife-logo.png', 'image/png');
const PHOTO_DATA_URI = readAssetBase64DataUri('book/student-pass-photo.png', 'image/png');

const NOTO_TELUGU_BASE64 = fs.readFileSync(
  path.join(PUBLIC, 'fonts', 'NotoSansTelugu-Regular.ttf')
).toString('base64');

const FONTS_CSS = `
  @font-face {
    font-family: 'Noto Sans Telugu';
    src: url('data:font/truetype;base64,${NOTO_TELUGU_BASE64}') format('truetype');
    font-weight: 400 700;
    font-style: normal;
  }
`;

const GOOGLE_FONTS_LINK =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,700' +
  '&family=Lora:ital,wght@0,400;0,600;1,400&family=Poppins:wght@400;600;700;800&display=swap';

const PAGE_ELEMENTS: Record<PageId, ReactElement> = {
  cover:           <CoverPage student={DEMO_STUDENT} forPrint scholarSvg={scholarGold} />,
  promise:         <PromisePage student={DEMO_STUDENT} forPrint logoSrc={LOGO_DATA_URI} />,
  profile:         <StudentProfilePage student={DEMO_STUDENT} forPrint scholarSvg={scholarNavy} photoSrc={PHOTO_DATA_URI} />,
  'about-report':  <AboutThisReportPage forPrint logoSrc={LOGO_DATA_URI} />,
  career:          <CareerPage student={DEMO_STUDENT} forPrint />,
  analysis:        <AnalysisPage student={DEMO_STUDENT} forPrint />,
  class7:          <ClassPage student={DEMO_STUDENT} classYear={7} forPrint />,
  class8:          <ClassPage student={DEMO_STUDENT} classYear={8} forPrint />,
  class9:          <ClassPage student={DEMO_STUDENT} classYear={9} forPrint />,
  class10:         <ClassPage student={DEMO_STUDENT} classYear={10} forPrint />,
  journey:         <JourneyPage student={DEMO_STUDENT} forPrint scholarSvg={scholarAmber} />,
  'note-for-arjun': <NoteForArjunPage forPrint />,
  'feedback-en':   <FeedbackEnglishPage student={DEMO_STUDENT} forPrint />,
  'feedback-te':   <FeedbackTeluguPage student={DEMO_STUDENT} forPrint />,
  allthebest:      <AllTheBestPage student={DEMO_STUDENT} forPrint scholarSvg={scholarWhite} />,
  'neura-cert':    <NeuraIDCertificatePage student={DEMO_STUDENT} forPrint scholarSvg={scholarNavy} logoSrc={LOGO_DATA_URI} />,
  backcover:       <BackCoverPage forPrint qrSrc={QR_DATA_URI} />,
};

// A physically blank leaf side — no ink, just paper — rendered at the same
// trim size so the PDF page count/geometry lines up with every other page.
function BlankPage() {
  return <div style={{ width: NP.PAGE_W, height: NP.PAGE_H, background: '#FFFFFF' }} />;
}

// Imposes the 17 content pages onto physical leaves (see bookStructure.ts):
// most pages get their own leaf with a blank back; a few page pairs share
// one leaf front/back. Expanding to leaf.front, leaf.back for every leaf
// produces a duplex-ready page sequence — send straight to a digital press
// with "duplex, flip on long edge" and the front/back of every sheet lines
// up correctly, blanks included, with no manual imposition step needed.
const PAGE_DEFINITIONS: { id: string; element: ReactElement }[] = buildPrintLeaves().flatMap(leaf => [
  { id: `${leaf.front}-front`, element: PAGE_ELEMENTS[leaf.front] },
  leaf.back
    ? { id: `${leaf.back}-back`, element: PAGE_ELEMENTS[leaf.back] }
    : { id: `${leaf.front}-blank-back`, element: <BlankPage /> },
]);

// Page components render at a fixed NP.PAGE_W x NP.PAGE_H (420x594 CSS px —
// shared with the on-screen viewer), but the PDF page itself is physically
// 148mm x 210mm (~559x794 CSS px at 96dpi). Without scaling, the fixed-size
// content just sits in the top-left corner of the larger physical page,
// leaving blank margins on the right/bottom. Stretch it to fill exactly.
const MM_TO_PX = 96 / 25.4;
const PAGE_W_PX = 148 * MM_TO_PX;
const PAGE_H_PX = 210 * MM_TO_PX;
const SCALE_X = PAGE_W_PX / NP.PAGE_W;
const SCALE_Y = PAGE_H_PX / NP.PAGE_H;

function buildPageHTML(inner: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${GOOGLE_FONTS_LINK}" rel="stylesheet">
<style>
${FONTS_CSS}
* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  color-adjust: exact !important;
  box-sizing: border-box;
}
html, body {
  margin: 0; padding: 0;
  width: 148mm; height: 210mm;
  overflow: hidden;
}
.page {
  width: 148mm; height: 210mm;
  overflow: hidden;
  position: relative;
}
.page-content {
  width: ${NP.PAGE_W}px;
  height: ${NP.PAGE_H}px;
  transform: scale(${SCALE_X}, ${SCALE_Y});
  transform-origin: top left;
}
</style>
</head>
<body>
<div class="page"><div class="page-content">${inner}</div></div>
</body>
</html>`;
}

export async function generateNeuraPathPDF(): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
  });

  const pagePdfBuffers: Buffer[] = [];

  try {
    for (const def of PAGE_DEFINITIONS) {
      const page = await browser.newPage();
      await page.setViewport({ width: 874, height: 1240, deviceScaleFactor: 2 });

      const inner = renderToStaticMarkup(def.element);
      const html = buildPageHTML(inner);

      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await new Promise(resolve => setTimeout(resolve, 400));

      const pdfBuffer = await page.pdf({
        width: '148mm',
        height: '210mm',
        printBackground: true,
        margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
        preferCSSPageSize: false,
      });

      pagePdfBuffers.push(Buffer.from(pdfBuffer));
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const mergedPdf = await PDFDocument.create();
  for (const buf of pagePdfBuffers) {
    const srcDoc = await PDFDocument.load(buf);
    const [srcPage] = await mergedPdf.copyPages(srcDoc, [0]);
    mergedPdf.addPage(srcPage);
  }

  return Buffer.from(await mergedPdf.save());
}

async function main() {
  console.log(
    `Generating NeuraPath PDF — 17 content pages imposed onto ` +
    `${PAGE_DEFINITIONS.length / 2} duplex leaves (${PAGE_DEFINITIONS.length} PDF pages, blanks included)...`
  );
  const pdfBytes = await generateNeuraPathPDF();
  const outDir = path.join(PUBLIC, 'downloads');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'NeuraPath-Sample.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log(`Wrote ${outPath} (${(pdfBytes.length / 1024).toFixed(0)} KB)`);
}

// Only run when invoked directly (tsx src/scenes/neurapath/generatePDF.tsx),
// not when imported.
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
