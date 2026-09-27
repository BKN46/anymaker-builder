const PREFIX = 'AMB1.';
export const MAX_PROJECT_CODE_LENGTH = 8 * 1024 * 1024;
const MAX_DECOMPRESSED_BYTES = 16 * 1024 * 1024;

function ensureCompressionSupport() {
  if (typeof CompressionStream !== 'function' || typeof DecompressionStream !== 'function') {
    throw new Error('此浏览器不支持工程代码压缩');
  }
}

async function readStream(stream, limit) {
  const reader = stream.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!(value instanceof Uint8Array)) throw new Error('工程代码数据无效');
      length += value.byteLength;
      if (length > limit) throw new Error('工程代码解压后过大');
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}

function base64UrlEncode(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function base64UrlDecode(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('工程代码不是有效的 Base64URL');
  const base64 = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - value.length % 4) % 4);
  let binary;
  try { binary = atob(base64); } catch { throw new Error('工程代码不是有效的 Base64URL'); }
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export async function encodeProjectCode(document) {
  ensureCompressionSupport();
  const json = JSON.stringify(document);
  if (typeof json !== 'string' || json.length > MAX_DECOMPRESSED_BYTES) throw new Error('工程代码内容过大');
  const compressed = await readStream(new Blob([new TextEncoder().encode(json)]).stream().pipeThrough(new CompressionStream('gzip')), MAX_DECOMPRESSED_BYTES);
  const code = PREFIX + base64UrlEncode(compressed);
  if (code.length > MAX_PROJECT_CODE_LENGTH) throw new Error('工程代码超过分享上限');
  return code;
}

export async function decodeProjectCode(value) {
  ensureCompressionSupport();
  if (typeof value !== 'string' || value.length > MAX_PROJECT_CODE_LENGTH) throw new Error('工程代码无效或过长');
  const source = value.startsWith(PREFIX) ? value.slice(PREFIX.length) : value;
  if (!source) throw new Error('工程代码为空');
  const compressed = base64UrlDecode(source);
  let bytes;
  try {
    bytes = await readStream(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip')), MAX_DECOMPRESSED_BYTES);
  } catch (error) {
    if (error instanceof Error && error.message === '工程代码解压后过大') throw error;
    throw new Error('工程代码压缩数据无效');
  }
  let parsed;
  try { parsed = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new Error('工程代码不是有效的工程 JSON'); }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('工程代码不是有效的工程文档');
  return parsed;
}

export function isProjectCode(value) {
  return typeof value === 'string' && value.startsWith(PREFIX);
}
