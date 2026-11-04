import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const width = 1200;
const height = 630;
const portraitSize = 292;

const groomPath = path.join(root, "public/images/groom2.png");
const bridePath = path.join(root, "public/images/bride2.png");
const emblemPath = path.join(root, "public/images/favicon-400kb_512x512.webp");

function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
}

async function circularPortrait(file) {
  const resized = await sharp(file)
    .resize(portraitSize, portraitSize, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();

  return sharp(resized)
    .composite([{ input: circleMask(portraitSize), blend: "dest-in" }])
    .png()
    .toBuffer();
}

function backgroundSvg() {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="48%" r="68%">
      <stop offset="0%" stop-color="#5c1a2c"/>
      <stop offset="48%" stop-color="#3a1020"/>
      <stop offset="100%" stop-color="#14060b"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f3e2b8"/>
      <stop offset="45%" stop-color="#c9a45c"/>
      <stop offset="100%" stop-color="#8c6a32"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <ellipse cx="600" cy="320" rx="250" ry="210" fill="#c9a45c" opacity="0.09"/>
  <rect x="22" y="22" width="1156" height="586" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <rect x="34" y="34" width="1132" height="562" fill="none" stroke="#e7d4a5" stroke-width="0.8" opacity="0.75"/>
  <path d="M58 58 l18 8 l-8 18 l-18 -8 z" fill="none" stroke="#c9a45c" stroke-width="1.2"/>
  <path d="M1142 58 l-18 8 l8 18 l18 -8 z" fill="none" stroke="#c9a45c" stroke-width="1.2"/>
  <path d="M58 572 l18 -8 l-8 -18 l-18 8 z" fill="none" stroke="#c9a45c" stroke-width="1.2"/>
  <path d="M1142 572 l-18 -8 l8 -18 l18 8 z" fill="none" stroke="#c9a45c" stroke-width="1.2"/>
</svg>`);
}

function overlaySvg(groomCenterX, brideCenterX, centerY) {
  const ring = portraitSize / 2 + 7;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f3e2b8"/>
      <stop offset="50%" stop-color="#c9a45c"/>
      <stop offset="100%" stop-color="#f3e2b8"/>
    </linearGradient>
  </defs>
  <circle cx="${groomCenterX}" cy="${centerY}" r="${ring}" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <circle cx="${brideCenterX}" cy="${centerY}" r="${ring}" fill="none" stroke="url(#gold)" stroke-width="3"/>
  <text x="600" y="268" text-anchor="middle" font-family="Georgia, 'Palatino Linotype', 'Times New Roman', serif" font-size="42" font-weight="700" fill="#f3e2b8">VIGNESH  ♥  PREETHI</text>
  <line x1="455" y1="292" x2="565" y2="292" stroke="#c9a45c" stroke-width="1"/>
  <circle cx="600" cy="292" r="3.5" fill="#c9a45c"/>
  <line x1="635" y1="292" x2="745" y2="292" stroke="#c9a45c" stroke-width="1"/>
  <text x="600" y="334" text-anchor="middle" font-family="Georgia, 'Palatino Linotype', 'Times New Roman', serif" font-size="20" letter-spacing="5" fill="#c9a45c">ENGAGEMENT CEREMONY</text>
  <text x="600" y="386" text-anchor="middle" font-family="Georgia, 'Palatino Linotype', 'Times New Roman', serif" font-size="32" fill="#fff9ef">15 NOVEMBER 2026</text>
  <text x="600" y="432" text-anchor="middle" font-family="Georgia, 'Palatino Linotype', 'Times New Roman', serif" font-size="16" letter-spacing="2.4" fill="#e7d4a5">R.U. Sunil Thirumana Mandapam, Salem</text>
</svg>`);
}

function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6 + count * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = header.length;
  const parts = [header];
  pngs.forEach((png, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(png.size >= 256 ? 0 : png.size, entry);
    header.writeUInt8(png.size >= 256 ? 0 : png.size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.data.length;
    parts.push(png.data);
  });
  return Buffer.concat(parts);
}

async function emblemPng(size) {
  const resized = await sharp(emblemPath)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (resized.info.channels !== 4) {
    throw new Error(`Expected an RGBA emblem, received ${resized.info.channels} channels.`);
  }

  return sharp(resized.data, {
    raw: {
      width: resized.info.width,
      height: resized.info.height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9, force: true })
    .toBuffer();
}

const groomTop = Math.round((height - portraitSize) / 2);
const groomLeft = 52;
const brideLeft = width - 52 - portraitSize;
const centerY = groomTop + portraitSize / 2;

const [groom, bride, background] = await Promise.all([
  circularPortrait(groomPath),
  circularPortrait(bridePath),
  sharp(backgroundSvg()).png().toBuffer(),
]);

const overlay = overlaySvg(groomLeft + portraitSize / 2, brideLeft + portraitSize / 2, centerY);

function assertRgbaPng(buffer, label) {
  if (buffer[25] !== 6) {
    throw new Error(`${label} PNG color type is ${buffer[25]}, expected 6 (RGBA).`);
  }
}

const ogPath = path.join(root, "public/images/engagement-og.jpg");
await sharp(background)
  .composite([
    { input: groom, left: groomLeft, top: groomTop },
    { input: bride, left: brideLeft, top: groomTop },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, progressive: false, mozjpeg: false, chromaSubsampling: "4:2:0" })
  .toFile(ogPath);

const iconDir = path.join(root, "public/icons");
await mkdir(iconDir, { recursive: true });

const icon192 = await emblemPng(192);
const icon512 = await emblemPng(512);
const apple = await emblemPng(180);
const icon32 = await emblemPng(32);
const icon16 = await emblemPng(16);
const icon48 = await emblemPng(48);

for (const [label, buffer] of [
  ["icon16", icon16],
  ["icon32", icon32],
  ["icon48", icon48],
  ["apple", apple],
  ["icon192", icon192],
  ["icon512", icon512],
]) {
  assertRgbaPng(buffer, label);
}

await Promise.all([
  writeFile(path.join(iconDir, "icon-192.png"), icon192),
  writeFile(path.join(iconDir, "icon-512.png"), icon512),
  writeFile(path.join(root, "src/app/apple-icon.png"), apple),
  writeFile(path.join(iconDir, "apple-touch-icon.png"), apple),
  writeFile(path.join(root, "src/app/icon.png"), icon32),
  writeFile(path.join(root, "src/app/favicon.ico"), buildIco([
    { size: 16, data: icon16 },
    { size: 32, data: icon32 },
    { size: 48, data: icon48 },
  ])),
]);

const ogMeta = await sharp(ogPath).metadata();
console.log(
  JSON.stringify(
    {
      og: { path: ogPath, width: ogMeta.width, height: ogMeta.height, bytes: ogMeta.size },
      icons: ["src/app/favicon.ico", "src/app/icon.png", "src/app/apple-icon.png", "public/icons/icon-192.png", "public/icons/icon-512.png"],
    },
    null,
    2,
  ),
);
