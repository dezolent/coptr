import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  PDFDocument,
  PDFName,
  PDFString,
  StandardFonts,
  rgb,
} from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const outputPath = path.join(publicDir, 'coptr-epk.pdf');

const pageWidth = 612;
const pageHeight = 792;

const colors = {
  black: rgb(0.008, 0.014, 0.032),
  sheet: rgb(0.012, 0.027, 0.067),
  cyan: rgb(0.439, 1, 0.875),
  magenta: rgb(0.992, 0.275, 0.941),
  blue: rgb(0.016, 0.365, 0.929),
  orange: rgb(1, 0.49, 0.16),
  white: rgb(1, 1, 1),
  slate: rgb(0.72, 0.77, 0.82),
  muted: rgb(0.42, 0.48, 0.56),
};

const links = {
  spotify: 'https://open.spotify.com/artist/1CDtx3RB970KejjPi8UxfB',
  soundcloud: 'https://soundcloud.com/coptrmp3',
  appleMusic: 'https://music.apple.com/us/artist/coptr/1839103475',
  youtube: 'https://youtube.com/@coptr.mp3?sub_confirmation=1',
  instagram: 'https://instagram.com/coptr.mp3/',
  tiktok: 'https://tiktok.com/@coptr.mp3',
  email: 'mailto:paul.f.gerlach@gmail.com',
  supportMix: 'https://soundcloud.com/coptrmp3/support-mix-take1/s-UkMCcLh93Uo',
  cruisin: 'https://coptr.com/stream/cruisin',
};

const assets = {
  textLogo: 'brand/coptr-white-text-logo.webp',
  circleLogo: 'brand/coptr-white-circle-logo.webp',
  banner: 'profile/coptr-banner.webp',
  portrait: 'profile/coptr-sunglasses.webp',
  performance: 'profile/coptr-dj-performance-photo.webp',
  cruisin: 'covers/coptr-cruisin.webp',
  spotify: 'social/spotify.webp',
  soundcloud: 'social/soundcloud.webp',
  appleMusic: 'social/apple-music.webp',
  youtube: 'social/youtube.webp',
  instagram: 'social/instagram.webp',
  tiktok: 'social/titkok.webp',
};

function assetPath(relativePath) {
  return path.join(publicDir, relativePath);
}

function drawRect(page, x, y, width, height, color, opacity = 1) {
  page.drawRectangle({ x, y, width, height, color, opacity });
}

function drawRule(page, x, y, width, color, opacity = 1) {
  page.drawRectangle({ x, y, width, height: 1, color, opacity });
}

function drawVerticalRule(page, x, y, height, color, opacity = 1) {
  page.drawRectangle({ x, y, width: 1, height, color, opacity });
}

function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawTextBlock(page, text, options) {
  const {
    x,
    y,
    maxWidth,
    size,
    font,
    color = colors.white,
    lineHeight = size * 1.3,
    maxLines = Number.POSITIVE_INFINITY,
  } = options;
  const lines = wrapText(text, font, size, maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });
  return y - lines.length * lineHeight;
}

async function embedContain(pdfDoc, relativePath, width, height) {
  const imageBuffer = await sharp(assetPath(relativePath))
    .resize(Math.round(width * 2), Math.round(height * 2), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return pdfDoc.embedPng(imageBuffer);
}

async function embedCover(pdfDoc, relativePath, width, height, position = 'center') {
  const imageBuffer = await sharp(assetPath(relativePath))
    .resize(Math.round(width * 2), Math.round(height * 2), {
      fit: 'cover',
      position,
    })
    .png()
    .toBuffer();

  return pdfDoc.embedPng(imageBuffer);
}

function addLink(page, x, y, width, height, url) {
  // Link annotations use Subtype: 'Link' and URI: url to keep exported PDF links clickable.
  const annotation = page.doc.context.register(
    page.doc.context.obj({
      Type: PDFName.of('Annot'),
      Subtype: PDFName.of('Link'),
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      A: {
        Type: PDFName.of('Action'),
        S: PDFName.of('URI'),
        URI: PDFString.of(url),
      },
    }),
  );

  page.node.addAnnot(annotation);
}

function drawLabel(page, text, x, y, font, color = colors.cyan) {
  page.drawText(text.toUpperCase(), {
    x,
    y,
    size: 7.5,
    font,
    color,
    characterSpacing: 1.8,
  });
}

function drawCard(page, x, y, width, height, accentColor, baseColor = colors.sheet) {
  drawRect(page, x, y, width, height, baseColor, 0.92);
  drawVerticalRule(page, x, y, height, accentColor, 0.85);
  drawRule(page, x, y + height - 1, width, accentColor, 0.25);
}

async function generatePdf() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setTitle('Coptr EPK');
  pdfDoc.setAuthor('Coptr');
  pdfDoc.setSubject('Electronic Press Kit');
  pdfDoc.setKeywords(['Coptr', 'EPK', 'Miami', 'DJ', 'helicopter pilot']);
  pdfDoc.setProducer('Coptr Website');
  pdfDoc.setCreator('Coptr Website');

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const [
    bannerImage,
    textLogo,
    circleLogo,
    portraitImage,
    performanceImage,
    cruisinImage,
    spotifyLogo,
    soundcloudLogo,
    appleMusicLogo,
    youtubeLogo,
    instagramLogo,
    tiktokLogo,
  ] = await Promise.all([
    embedCover(pdfDoc, assets.banner, pageWidth, pageHeight, 'center'),
    embedContain(pdfDoc, assets.textLogo, 230, 80),
    embedContain(pdfDoc, assets.circleLogo, 220, 220),
    embedCover(pdfDoc, assets.portrait, 178, 228, 'top'),
    embedCover(pdfDoc, assets.performance, 128, 82, 'center'),
    embedCover(pdfDoc, assets.cruisin, 72, 72, 'center'),
    embedContain(pdfDoc, assets.spotify, 26, 26),
    embedContain(pdfDoc, assets.soundcloud, 26, 26),
    embedContain(pdfDoc, assets.appleMusic, 26, 26),
    embedContain(pdfDoc, assets.youtube, 26, 26),
    embedContain(pdfDoc, assets.instagram, 26, 26),
    embedContain(pdfDoc, assets.tiktok, 26, 26),
  ]);

  drawRect(page, 0, 0, pageWidth, pageHeight, colors.black);
  page.drawImage(bannerImage, {
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    opacity: 0.13,
  });
  drawRect(page, 0, 0, pageWidth, pageHeight, colors.black, 0.82);
  drawRect(page, 0, 789, pageWidth, 3, colors.cyan);
  drawRect(page, 215, 789, 205, 3, colors.magenta);
  drawRect(page, 420, 789, 192, 3, colors.blue);

  page.drawEllipse({ x: 512, y: 675, xScale: 145, yScale: 145, color: colors.blue, opacity: 0.12 });
  page.drawEllipse({ x: 465, y: 692, xScale: 92, yScale: 92, borderColor: colors.cyan, borderWidth: 0.6, opacity: 0.2 });
  page.drawImage(circleLogo, { x: 410, y: 600, width: 180, height: 180, opacity: 0.08 });

  drawRect(page, 28, 28, 556, 736, colors.sheet, 0.9);

  drawLabel(page, 'Electronic Press Kit', 42, 726, helveticaBold);
  page.drawText('BRICKELL / MIAMI', {
    x: 224,
    y: 726,
    size: 7.5,
    font: helveticaBold,
    color: colors.slate,
    characterSpacing: 1.5,
  });

  page.drawImage(textLogo, { x: 40, y: 645, width: 218, height: 76 });

  drawTextBlock(page, 'Aviation-grade bass for Miami opening rooms.', {
    x: 42,
    y: 628,
    maxWidth: 292,
    size: 25,
    font: helveticaBold,
    color: colors.white,
    lineHeight: 28,
  });

  drawTextBlock(
    page,
    'Brickell-based helicopter pilot turned DJ, building an aviation-inspired audiovisual identity through melodic hybrid dubstep, rock influences, and coastal night-drive energy - from beach roads to afterhours.',
    {
      x: 42,
      y: 540,
      maxWidth: 286,
      size: 10.6,
      font: helvetica,
      color: colors.slate,
      lineHeight: 15.2,
      maxLines: 6,
    },
  );

  drawRect(page, 390, 465, 178, 228, rgb(0.027, 0.07, 0.14));
  page.drawImage(portraitImage, { x: 390, y: 465, width: 178, height: 228 });
  drawRect(page, 390, 465, 178, 228, colors.blue, 0.08);
  drawRule(page, 516, 671, 32, colors.cyan, 0.9);
  drawVerticalRule(page, 548, 639, 32, colors.cyan, 0.9);

  drawRect(page, 334, 438, 132, 86, colors.black, 0.95);
  page.drawImage(performanceImage, { x: 338, y: 442, width: 124, height: 78 });

  drawRect(page, 430, 410, 126, 38, colors.black, 0.86);
  drawLabel(page, 'Flight Plan', 449, 432, helveticaBold);
  page.drawText('Brickell > beach roads', {
    x: 444,
    y: 418,
    size: 8,
    font: helveticaBold,
    color: colors.slate,
  });

  drawCard(page, 42, 408, 292, 94, colors.magenta, rgb(0.94, 0.12, 0.64));
  drawRect(page, 42, 408, 292, 94, colors.orange, 0.2);
  drawLabel(page, 'Primary Listen', 60, 470, helveticaBold, colors.white);
  page.drawText('Sample Opener Mix', {
    x: 60,
    y: 446,
    size: 22,
    font: helveticaBold,
    color: colors.black,
  });
  page.drawText('Opening-set preview for promoters', {
    x: 60,
    y: 430,
    size: 8.5,
    font: helveticaBold,
    color: rgb(0.12, 0.08, 0.12),
    characterSpacing: 0.8,
  });
  drawRect(page, 294, 436, 28, 28, colors.black);
  page.drawText('>', { x: 304, y: 443, size: 16, font: helveticaBold, color: colors.cyan });
  addLink(page, 42, 408, 292, 94, links.supportMix);

  drawCard(page, 42, 310, 139, 74, colors.magenta);
  drawLabel(page, 'FFO', 57, 360, helveticaBold, colors.magenta);
  drawTextBlock(page, 'Virtual Riot, Subtronics, Crankdat, Tape B', {
    x: 57,
    y: 342,
    maxWidth: 102,
    size: 9.5,
    font: helveticaBold,
    color: colors.white,
    lineHeight: 13,
  });

  drawCard(page, 195, 310, 139, 74, colors.cyan);
  drawLabel(page, 'Local Opening Slots', 210, 360, helveticaBold);
  drawTextBlock(page, 'Built for support sets, club warmups, and local promoter lineups.', {
    x: 210,
    y: 342,
    maxWidth: 105,
    size: 8.5,
    font: helveticaBold,
    color: colors.white,
    lineHeight: 12,
  });

  drawCard(page, 42, 72, 318, 205, colors.blue, rgb(0.025, 0.055, 0.13));
  drawLabel(page, 'Listen / Contact', 60, 246, helveticaBold);
  page.drawText('Quick links for booking', {
    x: 60,
    y: 226,
    size: 15,
    font: helveticaBold,
    color: colors.white,
  });
  page.drawText('paul.f.gerlach@gmail.com', {
    x: 198,
    y: 248,
    size: 8.5,
    font: helveticaBold,
    color: colors.slate,
  });
  addLink(page, 198, 244, 125, 13, links.email);

  const socialIcons = [
    [spotifyLogo, links.spotify],
    [soundcloudLogo, links.soundcloud],
    [appleMusicLogo, links.appleMusic],
    [youtubeLogo, links.youtube],
    [instagramLogo, links.instagram],
    [tiktokLogo, links.tiktok],
  ];
  socialIcons.forEach(([logo, url], index) => {
    const x = 60 + index * 42;
    drawRect(page, x, 186, 30, 30, colors.black, 0.7);
    page.drawImage(logo, { x: x + 3, y: 189, width: 24, height: 24 });
    addLink(page, x, 186, 30, 30, url);
  });

  drawRect(page, 60, 98, 260, 68, colors.white);
  page.drawImage(cruisinImage, { x: 60, y: 98, width: 68, height: 68 });
  drawLabel(page, 'Latest Track', 142, 140, helveticaBold, colors.blue);
  page.drawText("CRUISIN'", {
    x: 142,
    y: 119,
    size: 18,
    font: helveticaBold,
    color: colors.black,
  });
  page.drawText('>', { x: 296, y: 120, size: 16, font: helveticaBold, color: colors.black });
  addLink(page, 60, 98, 260, 68, links.cruisin);

  drawCard(page, 382, 72, 174, 205, colors.cyan, rgb(0.03, 0.06, 0.12));
  page.drawText('Promoter snapshot', {
    x: 400,
    y: 246,
    size: 16,
    font: helveticaBold,
    color: colors.white,
  });
  drawTextBlock(
    page,
    'Coptr is positioning locally as a reliable opener with a visual identity promoters can remember: helicopter pilot precision, neon Miami movement, and melodic bass with enough edge for late-night rooms.',
    {
      x: 400,
      y: 222,
      maxWidth: 132,
      size: 8.7,
      font: helvetica,
      color: colors.slate,
      lineHeight: 12.4,
      maxLines: 8,
    },
  );

  const bullets = [
    'Ready for short direct-support and early-night club sets.',
    'Sound: melodic hybrid dubstep, rock influence, coastal night-drive energy.',
    'Audience fit: bass-forward local clubs, afterhours, and beach-road pregame bills.',
  ];
  let bulletY = 124;
  bullets.forEach((bullet) => {
    page.drawText('-', { x: 400, y: bulletY, size: 10, font: helveticaBold, color: colors.magenta });
    bulletY = drawTextBlock(page, bullet, {
      x: 412,
      y: bulletY,
      maxWidth: 124,
      size: 7.8,
      font: helveticaBold,
      color: colors.white,
      lineHeight: 10,
      maxLines: 2,
    }) - 6;
  });

  page.drawText('COPTR.COM/EPK', {
    x: 42,
    y: 42,
    size: 7,
    font: helveticaBold,
    color: colors.muted,
    characterSpacing: 1.2,
  });

  await mkdir(publicDir, { recursive: true });
  const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
  await writeFile(outputPath, pdfBytes);
  console.log(`Generated ${path.relative(rootDir, outputPath)}`);
}

try {
  await generatePdf();
} catch (error) {
  console.error('Failed to generate EPK PDF');
  console.error(error);
  process.exitCode = 1;
}
