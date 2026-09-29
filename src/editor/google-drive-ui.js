import { t, setText, applyTranslations, getLocale } from '../i18n.js';
import { createGoogleDriveAuth, loadGoogleIdentity, validGoogleClientId } from './google-drive-auth.js';
import { createGoogleDrive } from './google-drive.js';
import { decodeDriveArchive, encodeDriveArchive } from './drive-archive-format.js';

export function mountGoogleDriveArchives({ host, store, clientId = '', siteClientId = '', saveClientId, validateDocument, refreshArchives, renderArchives, createId, editorBusy }) {
  const siteConfigured = validGoogleClientId(siteClientId);
  if (siteConfigured) clientId = siteClientId;
  const panel = document.createElement('section'); panel.className = 'drive-archives';
  panel.innerHTML = '<h3 data-i18n="Google 云盘"></h3><p class="status" data-i18n="同步已保存的存档；编辑后请先覆盖。云端目录：anymaker-builder-vehicles"></p><details id="drive-config"><summary data-i18n="Google 登录配置"></summary><label for="drive-client-id" data-i18n="OAuth Client ID（公开）"></label><input id="drive-client-id" type="text" maxlength="240" autocomplete="off" spellcheck="false"><p class="status" data-i18n="由站点维护者提供 Web OAuth Client ID；无需客户端密钥。"></p><button id="drive-config-save" type="button" data-i18n="保存登录配置"></button></details><div class="drive-actions"><button id="drive-connect" type="button" data-i18n="登录 Google"></button><button id="drive-disconnect" type="button" data-i18n="断开 Google 连接"></button><button id="drive-refresh" type="button" data-i18n="从谷歌云盘同步"></button></div><p id="drive-status" class="status" role="status" aria-live="polite"></p><div id="drive-list" class="archive-list"></div>';
  host.insertBefore(panel, host.querySelector('#archive-list')); applyTranslations(panel);
  const find = selector => panel.querySelector(selector);
  const input = find('#drive-client-id'); input.value = clientId;
  find('#drive-config').hidden = siteConfigured;
  let auth = null; let loading = false; let working = false; let files = []; let listed = false;
  const drive = createGoogleDrive({ invalidate: () => { auth?.invalidate(); files = []; listed = false; } });
  const message = (key, params) => setText(find('#drive-status'), key, params);
  const isBusy = () => working || loading;
  const fail = error => message('云盘操作失败：{error}', () => ({ error: t(error.message || String(error)) }));
  function render() {
    applyTranslations(panel);
    input.disabled = isBusy();
    for (const selector of ['#drive-config-save', '#drive-connect', '#drive-refresh']) find(selector).disabled = isBusy();
    find('#drive-disconnect').disabled = isBusy() || !auth?.isAuthorized();
    find('#drive-connect').hidden = Boolean(auth?.isAuthorized());
    const list = find('#drive-list'); list.replaceChildren();
    if (listed && !files.length) {
      const empty = document.createElement('p'); empty.className = 'status'; setText(empty, '云盘目录中暂无本应用的存档'); list.append(empty);
    }
    for (const file of files) {
      const row = document.createElement('div'); row.className = 'archive-row drive-row'; row.dataset.driveId = file.id;
      const detail = document.createElement('div'); detail.className = 'archive-detail';
      const title = document.createElement('strong'); title.textContent = file.name;
      const meta = document.createElement('span');
      const date = new Date(file.modifiedTime);
      meta.textContent = (Number.isFinite(date.getTime()) ? date.toLocaleString(getLocale() === 'zh' ? 'zh-CN' : 'en-US') : '') + ' · ' + (Number.isFinite(Number(file.size)) ? Math.ceil(Number(file.size) / 1024) + ' KiB' : '');
      detail.append(title, meta);
      const download = document.createElement('button'); download.type = 'button'; download.className = 'archive-action drive-download'; setText(download, '下载到本地存档'); download.disabled = isBusy();
      download.onclick = () => run(async token => {
        const text = await drive.download(token, file);
        const archive = decodeDriveArchive(text, validateDocument);
        if (archive.id !== file.appProperties.archiveId) throw new Error('云盘存档标识与文件信息不一致，请刷新列表');
        const id = 'drive-' + file.id;
        const existing = await store.get(id);
        if (existing && !confirm(t('重新下载会覆盖本地存档“{name}”，是否继续？', { name: existing.name }))) { message('已取消云盘操作'); return; }
        await store.put({ id, name: archive.name, kind: 'manual', savedAt: archive.savedAt, cloudArchiveId: archive.id, document: archive.document });
        await refreshArchives();
        message('已下载存档 {name}，可在本地存档中读取', { name: archive.name });
      }, { download: true });
      row.append(detail, download); list.append(row);
    }
    renderArchives();
  }
  async function prepare() {
    if (auth || loading || !validGoogleClientId(clientId)) return;
    loading = true; render(); message('正在加载 Google 登录…');
    try {
      const oauth = await loadGoogleIdentity();
      auth = createGoogleDriveAuth({ clientId, oauth });
      message('Google 登录已就绪');
    } catch (error) { fail(error); }
    finally { loading = false; render(); }
  }
  function run(action, { download = false } = {}) {
    if (isBusy() || editorBusy()) return;
    if (!store) { fail(new Error('浏览器不支持 IndexedDB')); return; }
    if (!validGoogleClientId(clientId)) { find('#drive-config').open = true; input.focus(); fail(new Error('请配置有效的 Google OAuth Client ID')); return; }
    if (!auth) { void prepare(); return; }
    if (!auth.isAuthorized()) {
      files = []; listed = false;
      if (download) { message('请刷新云盘列表后重新下载'); render(); return; }
    }
    // Keep authorization before any await so browser popup permission survives.
    const authorization = auth.authorize();
    working = true; render(); message('正在连接 Google 云盘…');
    return authorization.then(action).catch(fail).finally(() => { working = false; render(); });
  }
  find('#drive-config').open = !siteConfigured && !validGoogleClientId(clientId);
  find('#drive-config-save').onclick = () => {
    const value = input.value.trim();
    if (value && !validGoogleClientId(value)) { fail(new Error('请配置有效的 Google OAuth Client ID')); return; }
    auth?.disconnect(); auth = null; files = []; listed = false; clientId = value; saveClientId(value);
    find('#drive-config').open = !value;
    message('已保存 Google 登录配置'); render(); void prepare();
  };
  find('#drive-connect').onclick = () => run(() => message('已连接 Google 云盘'));
  find('#drive-disconnect').onclick = () => { auth?.disconnect(); files = []; listed = false; message('Google 连接已断开'); render(); };
  find('#drive-refresh').onclick = () => run(async token => {
    files = []; listed = false; render();
    files = await drive.list(token); listed = true;
    message('已获取 {count} 个云盘存档，点击下载后才读取文件内容', { count: files.length });
  });
  render();
  if (validGoogleClientId(clientId)) void prepare();
  return {
    prepare, isBusy, relabel: render,
    upload(id) {
      return run(async token => {
        const record = await store.ensureCloudId(id, createId);
        if (!record) throw new Error('本地存档已删除，请刷新列表');
        const { archive, bytes } = encodeDriveArchive(record, validateDocument);
        const uploaded = await drive.upload(token, archive, bytes, file => confirm(t('覆盖 Google 云盘中的“{name}”？其他设备的更改将被替换。', { name: file.name })));
        if (!uploaded) { message('已取消云盘操作'); return; }
        if (listed) files = [uploaded, ...files.filter(file => file.id !== uploaded.id)];
        message('已同步存档 {name} 到 Google 云盘', { name: record.name });
        await refreshArchives();
      });
    },
  };
}
