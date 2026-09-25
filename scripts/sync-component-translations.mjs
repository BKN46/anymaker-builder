// Update only published component names from the game's component translation table.
// This deliberately leaves definitions, Mesh bindings, and other generated
// fields untouched when the game data has unrelated changes.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/sync-component-translations.mjs <Anymaker/rom>');

const translationSource = 'languages_components.tsv';
const translationBytes = fs.readFileSync(path.join(root, translationSource));
const rows = translationBytes.toString('utf8').split(/\r?\n/).filter(Boolean).map(line => line.split('\t'));
rows[0][0] = rows[0][0].replace(/^\uFEFF/, '');
const enColumn = rows[0].indexOf('en');
const zhColumn = rows[0].indexOf('zh');
if (enColumn < 0 || zhColumn < 0) throw new Error(`Missing en or zh column in ${translationSource}`);
const translations = new Map();
for (const [rowIndex, row] of rows.slice(1).entries()) {
  const id = row[0];
  const nameEn = row[enColumn];
  const nameZh = row[zhColumn];
  if (typeof id !== 'string' || !id) throw new Error(`Missing component id in ${translationSource} row ${rowIndex + 2}`);
  if (translations.has(id)) throw new Error(`Duplicate component id in ${translationSource}: ${id}`);
  if (typeof nameEn !== 'string' || !nameEn.trim()) throw new Error(`Missing en component name in ${translationSource}: ${id}`);
  if (typeof nameZh !== 'string' || !nameZh.trim()) throw new Error(`Missing zh component name in ${translationSource}: ${id}`);
  translations.set(id, { nameEn, nameZh });
}

const output = path.resolve('public/data');
const indexPath = path.join(output, 'index.json');
const componentIndexPath = path.join(output, 'component-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
if (index.format !== 'anymaker-component-index' || index.version !== 1 || !Array.isArray(index.definitions)) throw new Error('Invalid published component index');
const writeJsonIfChanged = (file, value) => {
  const content = JSON.stringify(value);
  if (fs.readFileSync(file, 'utf8') !== content) fs.writeFileSync(file, content);
};

let updated = 0;
for (const entry of index.definitions) {
  const names = translations.get(entry.id);
  if (!names) throw new Error(`Missing component names for ${entry.id} in ${translationSource}`);
  if (entry.name !== names.nameEn || entry.name_zh !== names.nameZh) updated++;
  entry.name = names.nameEn;
  entry.name_zh = names.nameZh;
  const detailPath = path.resolve('public', entry.detail);
  const detail = JSON.parse(fs.readFileSync(detailPath, 'utf8'));
  if (detail.id !== entry.id) throw new Error(`Component detail ID mismatch: ${entry.id}`);
  detail.name = names.nameEn;
  detail.name_zh = names.nameZh;
  writeJsonIfChanged(detailPath, detail);
}

index.translationSource = 'rom/' + translationSource;
index.translationSourceSha256 = createHash('sha256').update(translationBytes).digest('hex');
writeJsonIfChanged(indexPath, index);
writeJsonIfChanged(componentIndexPath, index);
console.log(`Synchronized ${index.definitions.length} component names from ${translationSource}; updated ${updated}`);
