import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PDFDocument } from 'pdf-lib';

const packageUrl = new URL('../package.json', import.meta.url);
const generatorUrl = new URL('../scripts/generate-epk-pdf.mjs', import.meta.url);
const pdfUrl = new URL('../public/coptr-epk.pdf', import.meta.url);

test('build pipeline generates the static one-page EPK PDF before Vite copies public assets', async () => {
  const packageJson = JSON.parse(await readFile(packageUrl, 'utf8'));

  assert.match(packageJson.scripts.build, /node scripts\/generate-epk-pdf\.mjs && vite build/);
});

test('EPK PDF generator creates a one-page PDF with clickable booking links', async () => {
  assert.ok(existsSync(generatorUrl), 'scripts/generate-epk-pdf.mjs should exist');
  const source = await readFile(generatorUrl, 'utf8');

  assert.match(source, /PDFDocument/);
  assert.match(source, /const pageWidth = 612/);
  assert.match(source, /const pageHeight = 792/);
  assert.match(source, /pdfDoc\.addPage\(\[pageWidth, pageHeight\]\)/);
  assert.match(source, /page\.doc\.context\.register/);
  assert.match(source, /Subtype: 'Link'/);
  assert.match(source, /URI: url/);
  assert.match(source, /support-mix-take1\/s-UkMCcLh93Uo/);
  assert.match(source, /https:\/\/soundcloud\.com\/coptrmp3/);
  assert.match(source, /mailto:paul\.f\.gerlach@gmail\.com/);
  assert.match(source, /coptr-cruisin\.webp/);
});

test('generated EPK PDF asset exists in public for direct download', () => {
  assert.ok(existsSync(pdfUrl), 'public/coptr-epk.pdf should exist');
});

test('generated EPK PDF is one page and contains clickable URL annotations', async () => {
  const pdfBytes = await readFile(pdfUrl);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const rawPdf = pdfBytes.toString('latin1');

  assert.equal(pdfDoc.getPageCount(), 1);
  assert.match(rawPdf, /\/URI/);
  assert.match(rawPdf, /support-mix-take1\/s-UkMCcLh93Uo/);
  assert.match(rawPdf, /mailto:paul\.f\.gerlach@gmail\.com/);
  assert.match(rawPdf, /https:\/\/soundcloud\.com\/coptrmp3/);
});
