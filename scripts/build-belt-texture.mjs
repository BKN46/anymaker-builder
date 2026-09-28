// Offline, targeted conversion of the game's raw RGBA8 belt texture.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import path from 'node:path';

const [rom] = process.argv.slice(2);
if (!rom) throw new Error('Usage: node scripts/build-belt-texture.mjs <Anymaker/rom>');
const source = 'textures/belt.txtr'; const bytes = await readFile(path.join(rom, source));
if (bytes.toString('ascii', 0, 4) !== 'TXTR' || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== 2) throw new Error('Unsupported belt TXTR header');
const width = bytes.readUInt16LE(12); const height = bytes.readUInt16LE(14); const levels = bytes.readUInt32LE(16);
if (width !== 32 || height !== 32 || levels !== 6) throw new Error('Unverified belt texture dimensions');
let offset = 20; let pixels;
for (let level = 0; level < levels; level++) {
  const size = Math.max(1, width >> level) * Math.max(1, height >> level) * 4;
  if (offset + 4 + size > bytes.length || bytes.readUInt32LE(offset) !== size) throw new Error('Invalid belt texture mipmap');
  if (!level) pixels = bytes.subarray(offset + 4, offset + 4 + size);
  offset += 4 + size;
}
if (offset !== bytes.length) throw new Error('Unexpected belt texture payload');
const crc32 = data => {
  let crc = 0xffffffff;
  for (const value of data) { crc ^= value; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  return (crc ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const output = Buffer.alloc(data.length + 12); output.writeUInt32BE(data.length); output.write(type, 4, 'ascii'); data.copy(output, 8);
  output.writeUInt32BE(crc32(output.subarray(4, -4)), output.length - 4); return output;
};
const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
const scanlines = Buffer.alloc(height * (width * 4 + 1));
for (let y = 0; y < height; y++) pixels.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(scanlines, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
const hash = value => createHash('sha256').update(value).digest('hex');
const metadata = { source, sourceSha256: hash(bytes), sourceBytes: bytes.length, format: 'TXTR v2 RGBA8', width, height, sourceMipLevels: levels, url: 'assets/textures/belt.png', outputSha256: hash(png), outputBytes: png.length };
await mkdir('public/assets/textures', { recursive: true });
await writeFile('public/' + metadata.url, png);
await writeFile('public/assets/textures/belt.json', JSON.stringify(metadata, null, 2) + String.fromCharCode(10));
console.log('Published belt texture: ' + width + 'x' + height + ', ' + png.length + ' bytes; source SHA-256 ' + metadata.sourceSha256);
