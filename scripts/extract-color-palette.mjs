import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const rom = process.argv[2];
if (!rom) throw new Error('Usage: node scripts/extract-color-palette.mjs <Anymaker/rom>');

const source = readFileSync(join(rom, 'textures', 'color_palette.txtr'));
if (source.length !== 24 + 256 * 4 || source.toString('ascii', 0, 4) !== 'TXTR'
  || source.readUInt32LE(4) !== 2 || source.readUInt32LE(8) !== 2
  || source.readUInt16LE(12) !== 256 || source.readUInt16LE(14) !== 1
  || source.readUInt32LE(16) !== 1 || source.readUInt32LE(20) !== 256 * 4) {
  throw new Error('Unsupported color_palette.txtr layout');
}
const colors = [];
let padding = false;
for (let index = 0; index < 256; index++) {
  const offset = 24 + index * 4;
  const alpha = source[offset + 3];
  if (alpha === 0) { padding = true; continue; }
  if (alpha !== 255 || padding) throw new Error(`Unexpected palette alpha at index ${index}`);
  colors.push(`#${source.subarray(offset, offset + 3).toString('hex')}`);
}
if (colors.length !== 85) throw new Error(`Unexpected official palette size: ${colors.length}`);
const hash = createHash('sha256').update(source).digest('hex');
const rows = [];
for (let index = 0; index < colors.length; index += 8) rows.push(`  ${colors.slice(index, index + 8).map(color => `'${color}'`).join(', ')},`);
const output = `// Generated from Anymaker rom/textures/color_palette.txtr by scripts/extract-color-palette.mjs.\n// Source SHA-256: ${hash}\nexport const GAME_PALETTE = Object.freeze([\n${rows.join('\n')}\n]);\n`;
writeFileSync(new URL('../src/editor/game-palette.js', import.meta.url), output);
console.log(`Extracted ${colors.length} official colors (${hash})`);
