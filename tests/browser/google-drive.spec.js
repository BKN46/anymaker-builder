import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const CLIENT_ID = '12345678-browser.apps.googleusercontent.com';
const FORMAT = 'anymaker-builder-archive';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const sample = (name, nodes = 0) => ({ format: 'anymaker-web-project', version: 1, projectName: name, objects: [], topology: { nodes: nodes ? [{ id: 'node-1', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 } }] : [], edges: [], plates: [], links: [] } });

async function records(page) {
  return page.evaluate(() => new Promise((resolve, reject) => {
    const open = indexedDB.open('anymaker-builder-archives-v1:' + location.pathname, 1);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result; const request = db.transaction('projects').objectStore('projects').getAll();
      request.onsuccess = () => { resolve(request.result); db.close(); };
      request.onerror = () => reject(request.error);
    };
  }));
}
async function importProject(page, document) {
  await page.locator('#file-input').setInputFiles({ name: 'drive-project.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(document)) });
  await expect(page.locator('#project-name')).toHaveValue(document.projectName);
}
async function open(page) {
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#left-tab-archives').click();
}
async function configure(page) {
  await page.locator('#drive-client-id').fill(CLIENT_ID); await page.locator('#drive-config-save').click();
  await expect(page.locator('#drive-status')).toContainText('Google sign-in is ready');
}
async function save(page, name = 'My vehicle') {
  await page.locator('#archive-name').fill(name); await page.locator('#archive-save').click();
  const row = page.locator('#archive-list .archive-row').filter({ has: page.locator('strong', { hasText: name }) });
  await expect(row).toBeVisible();
  const id = await row.getAttribute('data-archive-id');
  return page.locator('[data-archive-id="' + id + '"]');
}
async function mockGoogle(page) {
  const state = { scriptLoads: 0, requests: [], folder: null, files: new Map(), mediaGets: 0, creates: 0, updates: 0, uploads: 0, failNext: 0 };
  await page.route('https://accounts.google.com/gsi/client', async route => {
    state.scriptLoads++;
    await route.fulfill({ contentType: 'application/javascript', body:
      'window.google = { accounts: { oauth2: {' +
      'initTokenClient: options => ({ requestAccessToken: params => { window.googleTestCalls = (window.googleTestCalls || 0) + 1; window.googleTestGesture = navigator.userActivation.isActive; window.googleTestScope = options.scope; queueMicrotask(() => { if (window.googleTestError === "popup") options.error_callback({type:"popup_closed"}); else if (window.googleTestError === "denied") options.callback({error:"access_denied"}); else options.callback({access_token:"browser-test-only-token",expires_in:3600,scope:"' + SCOPE + '"}); }); } }),' +
      'hasGrantedAllScopes: (response, scope) => response.scope === scope, revoke: (token, callback) => { window.googleTestRevoked = true; callback({successful:true}); }' +
      '} } };' });
  });
  await page.route('https://www.googleapis.com/**', async route => {
    const request = route.request(); const url = new URL(request.url());
    const headers = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET,POST,PATCH,PUT,OPTIONS', 'access-control-expose-headers': 'Location' };
    const reply = body => route.fulfill({ json: body, headers });
    if (request.method() === 'OPTIONS') { await route.fulfill({ status: 204, headers }); return; }
    state.requests.push({ url: url.href, method: request.method() });
    expect(request.headers().authorization).toBe('Bearer browser-test-only-token');
    if (state.failNext) { const status = state.failNext; state.failNext = 0; await route.fulfill({ status, headers }); return; }
    if (url.searchParams.get('alt') === 'media') {
      state.mediaGets++; const file = state.files.get(url.pathname.split('/').at(-1));
      await route.fulfill({ body: file.body, contentType: 'application/json', headers }); return;
    }
    if (request.method() === 'PUT') {
      state.uploads++; const body = request.postData(); const archive = JSON.parse(body);
      const id = state.uploadTarget;
      const file = { id, name: archive.name + '.anymaker.json', modifiedTime: '2026-09-28T12:00:00Z', size: String(Buffer.byteLength(body)), mimeType: 'application/json', appProperties: { format: FORMAT, archiveId: archive.id } };
      state.files.set(id, { ...file, body }); await reply(file); return;
    }
    if (url.pathname.includes('/upload/')) {
      if (request.method() === 'POST') { state.creates++; state.uploadTarget = 'file-' + state.creates; }
      else { state.updates++; state.uploadTarget = url.pathname.split('/').at(-1); }
      await route.fulfill({ status: 200, headers: { ...headers, location: 'https://www.googleapis.com/upload/drive/v3/files?upload_id=browser' } }); return;
    }
    if (request.method() === 'POST') {
      const metadata = request.postDataJSON(); expect(metadata.name).toBe('anymaker-builder-vehicles');
      state.folder = { ...metadata, id: 'folder-browser' }; await reply(state.folder); return;
    }
    const query = url.searchParams.get('q');
    if (query.includes('vnd.google-apps.folder')) { await reply({ files: state.folder ? [state.folder] : [] }); return; }
    const match = query.match(/key='archiveId' and value='([^']+)'/);
    const files = [...state.files.values()].filter(file => !match || file.appProperties.archiveId === match[1]).map(({ body, ...file }) => file);
    await reply({ files });
  });
  return state;
}

test('archives overwrite, sign in, create and update Drive files, list metadata and download on demand', async ({ page }, testInfo) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  const cloud = await mockGoogle(page); await open(page);
  expect(cloud.scriptLoads).toBe(0); await configure(page);
  await importProject(page, sample('Original')); const row = await save(page);
  const id = await row.getAttribute('data-archive-id');
  await importProject(page, sample('Edited', 1));
  page.once('dialog', dialog => dialog.accept()); await row.locator('.archive-overwrite').click();
  await expect(page.locator('#archive-status')).toContainText('Overwrote archive');
  const overwritten = (await records(page)).find(record => record.id === id);
  expect(overwritten.document.projectName).toBe('Edited'); expect(overwritten.document.topology.nodes).toHaveLength(1);
  await row.locator('.archive-drive-sync').click(); await expect(page.locator('#drive-status')).toContainText('Synced archive My vehicle');
  expect(cloud.creates).toBe(1); expect(cloud.folder.name).toBe('anymaker-builder-vehicles');
  expect(await page.evaluate(() => ({ gesture: window.googleTestGesture, scope: window.googleTestScope }))).toEqual({ gesture: true, scope: SCOPE });
  expect(JSON.parse(cloud.files.get('file-1').body).document).toEqual(overwritten.document);
  page.once('dialog', dialog => dialog.accept()); await row.locator('.archive-drive-sync').click();
  await expect.poll(() => cloud.updates).toBe(1); await expect(page.locator('#drive-refresh')).toBeEnabled(); expect(cloud.creates).toBe(1);
  await page.locator('#drive-refresh').click(); await expect(page.locator('.drive-row')).toHaveCount(1); expect(cloud.mediaGets).toBe(0);
  await importProject(page, sample('Keep current editor'));
  await page.locator('.drive-download').click(); await expect(page.locator('#drive-status')).toContainText('Downloaded My vehicle');
  expect(cloud.mediaGets).toBe(1); await expect(page.locator('#project-name')).toHaveValue('Keep current editor');
  const downloaded = (await records(page)).find(record => record.id === 'drive-file-1');
  expect(downloaded.document).toEqual(overwritten.document); expect(downloaded.cloudArchiveId).toBe(id);
  const savedAt = downloaded.savedAt;
  page.once('dialog', dialog => dialog.dismiss()); await page.locator('.drive-download').click();
  await expect(page.locator('#drive-status')).toContainText('cancelled');
  expect((await records(page)).find(record => record.id === 'drive-file-1').savedAt).toBe(savedAt);
  await page.locator('#language-select').selectOption('zh');
  await expect(page.locator('#drive-refresh')).toHaveText('从谷歌云盘同步'); await expect(row.locator('.archive-overwrite')).toHaveText('覆盖');
  await page.locator('#drive-refresh').scrollIntoViewIfNeeded(); await page.screenshot({ path: testInfo.outputPath('google-drive-archives.png') });
  expect(await page.locator('#left-sidebar').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  const persisted = await page.evaluate(() => JSON.stringify(Object.entries(localStorage)));
  expect(persisted).toContain(CLIENT_ID); expect(persisted).not.toContain('browser-test-only-token'); expect(JSON.stringify(await records(page))).not.toContain('browser-test-only-token');
  await page.reload(); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#drive-client-id')).toHaveValue(CLIENT_ID); await expect(page.locator('#drive-connect')).toBeVisible(); await expect(page.locator('.drive-row')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('Drive failures keep local archives intact and stale account lists are cleared', async ({ page }) => {
  const cloud = await mockGoogle(page); await open(page); await configure(page); const row = await save(page, 'Keep me');
  await page.evaluate(() => { window.googleTestError = 'popup'; }); await row.locator('.archive-drive-sync').click();
  await expect(page.locator('#drive-status')).toContainText('closed or blocked'); expect(cloud.requests).toHaveLength(0);
  await page.evaluate(() => { window.googleTestError = 'denied'; }); await row.locator('.archive-drive-sync').click();
  await expect(page.locator('#drive-status')).toContainText('not completed'); expect(cloud.requests).toHaveLength(0);
  await page.evaluate(() => { window.googleTestError = ''; }); await row.locator('.archive-drive-sync').click();
  await expect(page.locator('#drive-status')).toContainText('Synced archive Keep me');
  await page.locator('#drive-refresh').click(); await expect(page.locator('.drive-row')).toHaveCount(1);
  const before = (await records(page)).filter(record => record.kind === 'manual');
  cloud.files.get('file-1').body = JSON.stringify({ format: FORMAT, version: 1, id: before[0].id, name: 'Corrupt', savedAt: 1, document: { ...sample('Broken'), topology: { nodes: [], edges: [{ id: 'bad', a: 'missing', b: 'missing' }], plates: [], links: [] } } });
  await page.locator('.drive-download').click(); await expect(page.locator('#drive-status')).toContainText('Drive operation failed');
  expect((await records(page)).filter(record => record.kind === 'manual')).toEqual(before);
  cloud.failNext = 401; await page.locator('#drive-refresh').click(); await expect(page.locator('#drive-status')).toContainText('authorization expired');
  await expect(page.locator('.drive-row')).toHaveCount(0); await expect(page.locator('#drive-connect')).toBeVisible();
  await page.locator('#drive-refresh').click(); await expect(page.locator('.drive-row')).toHaveCount(1);
  expect(await page.evaluate(() => window.googleTestCalls)).toBe(4);
  await page.locator('#drive-disconnect').click(); await expect(page.locator('.drive-row')).toHaveCount(0);
  expect(await page.evaluate(() => window.googleTestRevoked)).toBe(true);
});

test('Google setup survives reload and failed SDK loading can be retried', async ({ page }) => {
  await page.route('https://accounts.google.com/gsi/client', route => route.abort());
  await open(page); await page.locator('#drive-client-id').fill('invalid'); await page.locator('#drive-config-save').click();
  await expect(page.locator('#drive-status')).toContainText('valid Google OAuth Client ID');
  await page.locator('#drive-client-id').fill(CLIENT_ID); await page.locator('#drive-config-save').click();
  await expect(page.locator('#drive-status')).toContainText('Could not load Google sign-in');
  await page.unroute('https://accounts.google.com/gsi/client'); const cloud = await mockGoogle(page);
  await page.locator('#drive-connect').click(); await expect(page.locator('#drive-status')).toContainText('Google sign-in is ready');
  await page.locator('#drive-connect').click(); await expect(page.locator('#drive-status')).toContainText('Connected to Google Drive');
  expect(cloud.requests).toHaveLength(0);
});

test('archive identities survive concurrent autosaves and remain distinct across devices', async ({ page }) => {
  await page.route('**/archive-store-test.js', route => route.fulfill({ contentType: 'application/javascript', body: readFileSync(new URL('../../src/editor/archive-store.js', import.meta.url), 'utf8') }));
  await open(page);
  const result = await page.evaluate(async () => {
    const { createArchiveStore } = await import(new URL('archive-store-test.js', location.href).href);
    const first = createArchiveStore(indexedDB, '/drive-race-test');
    const second = createArchiveStore(indexedDB, '/drive-other-device');
    const stale = { id: 'autosave-current', kind: 'auto', name: 'Automatic', savedAt: 1, document: { marker: 'before' } };
    await first.put(stale); await second.put(stale);
    await Promise.all([
      first.ensureCloudId(stale.id, () => 'device-one'),
      first.put({ ...stale, savedAt: 2, document: { marker: 'after' } }),
    ]);
    await first.ensureCloudId(stale.id, () => 'should-not-replace');
    await second.ensureCloudId(stale.id, () => 'device-two');
    return { first: await first.get(stale.id), second: await second.get(stale.id) };
  });
  expect(result.first.cloudArchiveId).toBe('device-one'); expect(result.first.document.marker).toBe('after'); expect(result.first.savedAt).toBe(2);
  expect(result.second.cloudArchiveId).toBe('device-two');
});
