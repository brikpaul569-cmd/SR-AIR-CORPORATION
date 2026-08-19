const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  const input = path.join(__dirname, '..', 'public', 'references', 'EDICIONFINAL-removebg.png');
  const meta = await sharp(input).metadata();
  const { data } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const w = meta.width, h = meta.height, ch = meta.channels;

  // Sample bg color from the card body (left of QR area)
  let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
  for (let y = 300; y < 320; y++) {
    for (let x = 410; x < 430; x++) {
      const idx = (y * w + x) * ch;
      if (data[idx + 3] > 50) {
        bgR += data[idx]; bgG += data[idx + 1]; bgB += data[idx + 2]; bgCount++;
      }
    }
  }
  bgR = Math.round(bgR / bgCount);
  bgG = Math.round(bgG / bgCount);
  bgB = Math.round(bgB / bgCount);
  console.log('Local bg color:', bgR, bgG, bgB);

  // Precise QR cover - within card bounds only
  const qrX = 443, qrY = 272, qrW = 70, qrH = 70;

  const overlay = Buffer.from(
    '<svg width="' + w + '" height="' + h + '">' +
    '<rect x="' + qrX + '" y="' + qrY + '" width="' + qrW + '" height="' + qrH + '" ' +
    'fill="rgb(' + bgR + ',' + bgG + ',' + bgB + ')" />' +
    '</svg>'
  );

  const outPath = path.join(__dirname, '..', 'public', 'references', 'EDICIONFINAL-clean.png');
  await sharp(input)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toFile(outPath);

  console.log('Written:', outPath);
  console.log('Size:', fs.statSync(outPath).size);
})();
