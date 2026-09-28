import { DRIVE_ARCHIVE_FORMAT, MAX_DRIVE_ARCHIVE_BYTES, validArchiveId, readLimitedText } from './drive-archive-format.js';

export const DRIVE_FOLDER = 'anymaker-builder-vehicles';
const API = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';
const FOLDER_MIME = 'application/vnd.google-apps.folder';
const FIELDS = 'id,name,mimeType,modifiedTime,size,appProperties';
const validFileId = value => typeof value === 'string' && /^[A-Za-z0-9_-]{1,200}$/.test(value);
const quoted = value => {
  if (!validFileId(value)) throw new Error('Invalid Drive query ID');
  return String.fromCharCode(39) + value + String.fromCharCode(39);
};

function checkFile(value) {
  if (!value || !validFileId(value.id) || typeof value.name !== 'string' || value.name.length > 1024) throw new Error('Google 云盘返回了无效的文件信息');
  return value;
}

export function createGoogleDrive({ fetchImpl = globalThis.fetch, invalidate = () => {} } = {}) {
  async function request(url, token, options = {}, mode = 'json') {
    const target = new URL(url);
    if (target.origin !== 'https://www.googleapis.com' || target.username || target.password ||
        !/^\/(?:upload\/)?drive\/v3\/files(?:\/[A-Za-z0-9_-]+)?$/.test(target.pathname)) throw new Error('Google 云盘上传地址无效');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetchImpl(target.href, { ...options, signal: controller.signal, redirect: 'error', credentials: 'omit', headers: { ...options.headers, Authorization: `Bearer ${token}` } });
      if (!response.ok) {
        if (response.status === 401) { invalidate(); throw new Error('Google 授权已过期，请再次点击同步以登录'); }
        if (response.status === 403) throw new Error('Google 云盘拒绝访问，请检查授权、存储空间和 Drive API 配置');
        if (response.status === 404) throw new Error('云盘文件已删除或不可访问，请刷新列表');
        if (response.status === 429 || response.status >= 500) throw new Error('Google 云盘暂时不可用，请稍后重试');
        throw new Error('Google 云盘请求失败（{status}）'.replace('{status}', response.status));
      }
      if (mode === 'location') return response.headers.get('location');
      const text = await readLimitedText(response, mode === 'text' ? MAX_DRIVE_ARCHIVE_BYTES : 1024 * 1024);
      return mode === 'text' ? text : JSON.parse(text);
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('Google 云盘请求超时，请重试');
      if (error instanceof TypeError) throw new Error('无法连接 Google 云盘，请检查网络后重试');
      throw error;
    } finally { clearTimeout(timer); }
  }
  async function listQuery(token, q) {
    const files = []; const seen = new Set(); let pageToken = '';
    do {
      const params = new URLSearchParams({ q, spaces: 'drive', pageSize: '100', fields: `nextPageToken,incompleteSearch,files(${FIELDS})`, orderBy: 'modifiedTime desc' });
      if (pageToken) params.set('pageToken', pageToken);
      const result = await request(`${API}?${params}`, token);
      if (!Array.isArray(result.files) || result.incompleteSearch) throw new Error('云盘列表不完整，请重试');
      files.push(...result.files.map(checkFile));
      pageToken = result.nextPageToken || '';
      if (files.length > 2000 || (pageToken && (seen.size >= 100 || typeof pageToken !== 'string' || pageToken.length > 2048 || seen.has(pageToken)))) throw new Error('云盘列表过大或分页无效');
      seen.add(pageToken);
    } while (pageToken);
    return [...new Map(files.map(file => [file.id, file])).values()];
  }
  async function folders(token, create = false) {
    const result = await listQuery(token, `trashed = false and mimeType = '${FOLDER_MIME}' and name = '${DRIVE_FOLDER}' and 'root' in parents`);
    if (result.length || !create) return result;
    return [checkFile(await request(`${API}?fields=${FIELDS}`, token, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: DRIVE_FOLDER, mimeType: FOLDER_MIME, parents: ['root'] }) }))];
  }
  function fileQuery(directories) {
    return `trashed = false and mimeType = 'application/json' and (${directories.map(folder => `${quoted(folder.id)} in parents`).join(' or ')}) and appProperties has { key='format' and value='${DRIVE_ARCHIVE_FORMAT}' }`;
  }
  return {
    async list(token) {
      const directories = await folders(token);
      return directories.length ? listQuery(token, fileQuery(directories)) : [];
    },
    async upload(token, archive, bytes, confirmReplace = () => false) {
      if (!validArchiveId(archive.id) || !(bytes instanceof Uint8Array) || bytes.length > MAX_DRIVE_ARCHIVE_BYTES) throw new Error('云盘存档格式或版本无效');
      const directories = await folders(token, true);
      const matches = await listQuery(token, `${fileQuery(directories)} and appProperties has { key='archiveId' and value=${quoted(archive.id)} }`);
      if (matches.length > 1) throw new Error('云盘存在重复存档标识，请在 Google 云盘中保留一份后重试');
      const existing = matches[0];
      if (existing && !(await confirmReplace(existing))) return null;
      const metadata = { name: archive.name + '.anymaker.json', mimeType: 'application/json', appProperties: { format: DRIVE_ARCHIVE_FORMAT, archiveId: archive.id } };
      if (!existing) metadata.parents = [directories.slice().sort((a, b) => a.id.localeCompare(b.id))[0].id];
      const url = `${UPLOAD}${existing ? '/' + existing.id : ''}?uploadType=resumable&fields=${FIELDS}`;
      const location = await request(url, token, { method: existing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json', 'X-Upload-Content-Type': 'application/json', 'X-Upload-Content-Length': String(bytes.length) }, body: JSON.stringify(metadata) }, 'location');
      if (!location) throw new Error('Google 云盘上传地址无效');
      return checkFile(await request(location, token, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: bytes }));
    },
    async download(token, file) {
      checkFile(file);
      if (file.mimeType !== 'application/json' || file.appProperties?.format !== DRIVE_ARCHIVE_FORMAT || !validArchiveId(file.appProperties?.archiveId)) throw new Error('云盘存档格式或版本无效');
      if (Number(file.size) > MAX_DRIVE_ARCHIVE_BYTES) throw new Error('云盘存档超过 16 MiB 上限');
      return request(`${API}/${file.id}?alt=media`, token, {}, 'text');
    },
  };
}
