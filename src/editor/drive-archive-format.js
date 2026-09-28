export const MAX_DRIVE_ARCHIVE_BYTES = 16 * 1024 * 1024;
export const DRIVE_ARCHIVE_FORMAT = 'anymaker-builder-archive';
// Drive appProperties permits 124 UTF-8 bytes per key + value; archiveId uses 9.
export const validArchiveId = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,115}$/.test(value);

export function validateDriveArchive(value, validateDocument) {
  if (!value || value.format !== DRIVE_ARCHIVE_FORMAT || value.version !== 1 || !validArchiveId(value.id) ||
      typeof value.name !== 'string' || !value.name.trim() || value.name.length > 120 ||
      /[\u0000-\u001f\u007f]/.test(value.name) || !Number.isSafeInteger(value.savedAt) || value.savedAt < 0 || value.savedAt > 8640000000000000) {
    throw new Error('云盘存档格式或版本无效');
  }
  return { format: DRIVE_ARCHIVE_FORMAT, version: 1, id: value.id, name: value.name.trim(), savedAt: value.savedAt, document: validateDocument(value.document) };
}

export function encodeDriveArchive(record, validateDocument) {
  const archive = validateDriveArchive({ ...record, format: DRIVE_ARCHIVE_FORMAT, version: 1, id: record.cloudArchiveId || record.id }, validateDocument);
  const bytes = new TextEncoder().encode(JSON.stringify(archive));
  if (bytes.byteLength > MAX_DRIVE_ARCHIVE_BYTES) throw new Error('云盘存档超过 16 MiB 上限');
  return { archive, bytes };
}

export function decodeDriveArchive(text, validateDocument) {
  let value;
  try {
    value = JSON.parse(text, (key, item) => {
      if (['__proto__', 'prototype', 'constructor'].includes(key)) throw new Error();
      return item;
    });
  } catch { throw new Error('云盘存档不是有效的 JSON'); }
  return validateDriveArchive(value, validateDocument);
}

export async function readLimitedText(response, limit = MAX_DRIVE_ARCHIVE_BYTES) {
  if (Number(response.headers.get('content-length')) > limit) throw new Error('云盘响应超过大小上限');
  if (!response.body?.getReader) throw new Error('浏览器不支持安全读取云盘文件');
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let size = 0; let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) throw new Error('云盘响应超过大小上限');
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } catch (error) { await reader.cancel().catch(() => {}); throw error; }
  finally { reader.releaseLock(); }
}
