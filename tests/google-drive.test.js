import test from 'node:test';
import assert from 'node:assert/strict';
import { createGoogleDriveAuth, validGoogleClientId, DRIVE_SCOPE } from '../src/editor/google-drive-auth.js';
import { createGoogleDrive, DRIVE_FOLDER } from '../src/editor/google-drive.js';
import { encodeDriveArchive, decodeDriveArchive, readLimitedText, DRIVE_ARCHIVE_FORMAT, MAX_DRIVE_ARCHIVE_BYTES } from '../src/editor/drive-archive-format.js';
import { migrateDocument } from '../src/editor/document.js';
import { normalizeSettings } from '../src/editor/local-storage.js';

const clientId = '12345678-test.apps.googleusercontent.com';
const document = { format: 'anymaker-web-project', version: 1, objects: [] };
const validate = value => migrateDocument(value, []);
const record = { id: 'local-archive', name: '测试 Vehicle', savedAt: 1700000000000, document };
const json = value => new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json' } });
const folder = { id: 'folder-1', name: DRIVE_FOLDER, mimeType: 'application/vnd.google-apps.folder' };
const file = { id: 'file-1', name: 'Vehicle.anymaker.json', size: '100', mimeType: 'application/json', appProperties: { format: DRIVE_ARCHIVE_FORMAT, archiveId: record.id } };

function mockAuth() {
  const attempts = []; const revoked = []; let requests = 0; let clock = 0;
  const oauth = {
    initTokenClient(options) { attempts.push(options); return { requestAccessToken(params) { requests++; assert.equal(params.prompt, 'select_account'); } }; },
    hasGrantedAllScopes: response => response.scope === DRIVE_SCOPE,
    revoke: token => revoked.push(token),
  };
  return { auth: createGoogleDriveAuth({ clientId, oauth, now: () => clock }), attempts, revoked, requests: () => requests, advance: ms => { clock += ms; } };
}
const grant = (attempt, token = 'test-token') => attempt.callback({ access_token: token, expires_in: 3600, scope: DRIVE_SCOPE });

test('Drive auth requests least privilege synchronously and renews expired tokens', async () => {
  const state = mockAuth();
  const first = state.auth.authorize();
  assert.equal(state.requests(), 1);
  assert.equal(state.attempts[0].scope, DRIVE_SCOPE);
  assert.equal(state.attempts[0].include_granted_scopes, false);
  assert.equal(state.auth.authorize(), first);
  grant(state.attempts[0]); assert.equal(await first, 'test-token');
  assert.equal(await state.auth.authorize(), 'test-token'); assert.equal(state.requests(), 1);
  state.advance(3600000); assert.equal(state.auth.isAuthorized(), false);
  const second = state.auth.authorize(); grant(state.attempts[1], 'renewed');
  assert.equal(await second, 'renewed');
  state.auth.disconnect(); assert.deepEqual(state.revoked, ['renewed']); assert.equal(state.auth.isAuthorized(), false);
});

test('Drive auth rejects denied scopes and popup closure, ignores stale callbacks', async () => {
  const state = mockAuth();
  let request = state.auth.authorize(); state.attempts[0].callback({ error: 'access_denied' }); await assert.rejects(request, /授权未完成/);
  request = state.auth.authorize(); state.attempts[1].callback({ access_token: 'bad', scope: '', expires_in: 3600 }); await assert.rejects(request, /需要允许/);
  request = state.auth.authorize(); state.attempts[2].error_callback({ type: 'popup_closed' }); await assert.rejects(request, /窗口/);
  request = state.auth.authorize(); grant(state.attempts[0], 'stale'); assert.equal(state.auth.isAuthorized(), false);
  grant(state.attempts[3], 'fresh'); assert.equal(await request, 'fresh');
  state.auth.invalidate(); assert.equal(state.auth.isAuthorized(), false);
});

test('Only public Google client configuration survives preferences normalization', () => {
  assert.ok(validGoogleClientId(clientId)); assert.equal(validGoogleClientId('evil.example'), false);
  const settings = normalizeSettings({ version: 1, googleClientId: clientId, access_token: 'secret', refresh_token: 'secret' });
  assert.equal(settings.googleClientId, clientId); assert.equal(JSON.stringify(settings).includes('secret'), false);
  assert.equal(normalizeSettings({ version: 1, googleClientId: 'bad' }).googleClientId, '');
});

test('Drive envelopes preserve project data and reject invalid versions, IDs and topology', () => {
  const { archive, bytes } = encodeDriveArchive({ ...record, cloudArchiveId: 'stable-auto-id' }, validate);
  assert.equal(archive.id, 'stable-auto-id');
  assert.deepEqual(decodeDriveArchive(new TextDecoder().decode(bytes), validate), archive);
  for (const patch of [{ version: 2 }, { id: 'x'.repeat(116) }, { id: "x' or trashed = false" }, { name: '' }, { savedAt: Infinity }, { document: { ...document, version: 999 } }, { document: { ...document, topology: { nodes: [], edges: [{ id: 'broken', a: 'missing', b: 'missing' }], plates: [], links: [] } } }]) {
    assert.throws(() => decodeDriveArchive(JSON.stringify({ ...archive, ...patch }), validate));
  }
  assert.throws(() => decodeDriveArchive('{"__proto__": {}}', validate));
  assert.throws(() => encodeDriveArchive(record, () => ({ large: 'x'.repeat(MAX_DRIVE_ARCHIVE_BYTES) })), /16 MiB/);
});

test('Drive downloads enforce actual streamed byte limits and validate UTF-8', async () => {
  assert.equal(await readLimitedText(new Response('中文'), 6), '中文');
  await assert.rejects(readLimitedText(new Response('中文'), 5), /大小上限/);
  await assert.rejects(readLimitedText(new Response('x', { headers: { 'content-length': '100' } }), 5), /大小上限/);
  await assert.rejects(readLimitedText(new Response(new Uint8Array([255])), 5));
  let cancelled = false;
  const stream = new ReadableStream({ pull(controller) { controller.enqueue(new Uint8Array(6)); }, cancel() { cancelled = true; } });
  await assert.rejects(readLimitedText(new Response(stream), 5)); assert.ok(cancelled);
});

test('Drive listing paginates metadata without downloading media or creating an empty folder', async () => {
  const urls = [];
  const drive = createGoogleDrive({ fetchImpl: async (url, options) => {
    urls.push(url); assert.equal(options.headers.Authorization, 'Bearer token'); assert.equal(options.redirect, 'error');
    const parsed = new URL(url);
    if (parsed.searchParams.get('q').includes('vnd.google-apps.folder')) return json({ files: [folder] });
    if (parsed.searchParams.get('pageToken')) return json({ files: [{ ...file, id: 'file-2' }] });
    return json({ files: [file], nextPageToken: 'second' });
  } });
  assert.equal((await drive.list('token')).length, 2); assert.equal(urls.length, 3); assert.ok(urls.every(url => !url.includes('alt=media')));
  const empty = createGoogleDrive({ fetchImpl: async (_, options) => { assert.equal(options.method, undefined); return json({ files: [] }); } });
  assert.deepEqual(await empty.list('token'), []);
});

test('Drive sync creates its folder once and updates existing archive IDs after confirmation', async () => {
  let hasFolder = false; let hasFile = false; let creates = 0; let updates = 0; let puts = 0; let stored;
  const drive = createGoogleDrive({ fetchImpl: async (url, options) => {
    const parsed = new URL(url);
    if (options.method === 'PUT') { puts++; hasFile = true; stored = JSON.parse(new TextDecoder().decode(options.body)); return json(file); }
    if (parsed.pathname.includes('/upload/')) {
      if (options.method === 'POST') creates++; else { assert.equal(options.method, 'PATCH'); updates++; assert.ok(parsed.pathname.endsWith('/file-1')); }
      const meta = JSON.parse(options.body); assert.equal(meta.appProperties.archiveId, record.id);
      assert.equal(Boolean(meta.parents), !hasFile);
      return new Response(null, { headers: { location: 'https://www.googleapis.com/upload/drive/v3/files?upload_id=unit' } });
    }
    if (options.method === 'POST') { hasFolder = true; assert.equal(JSON.parse(options.body).name, DRIVE_FOLDER); return json(folder); }
    return json({ files: parsed.searchParams.get('q').includes('vnd.google-apps.folder') ? (hasFolder ? [folder] : []) : (hasFile ? [file] : []) });
  } });
  const { archive, bytes } = encodeDriveArchive(record, validate);
  await drive.upload('token', archive, bytes);
  assert.equal(await drive.upload('token', archive, bytes, () => false), null);
  await drive.upload('token', archive, bytes, () => true);
  assert.equal(creates, 1); assert.equal(updates, 1); assert.equal(puts, 2); assert.deepEqual(stored.document, validate(document));
});

test('Drive rejects redirected upload destinations before sending a token', async () => {
  let calls = 0;
  const drive = createGoogleDrive({ fetchImpl: async (url) => {
    calls++; assert.ok(url.startsWith('https://www.googleapis.com/'));
    if (url.includes('/upload/')) return new Response(null, { headers: { location: 'https://example.invalid/steal' } });
    return json({ files: new URL(url).searchParams.get('q').includes('vnd.google-apps.folder') ? [folder] : [] });
  } });
  const { archive, bytes } = encodeDriveArchive(record, validate);
  await assert.rejects(drive.upload('token', archive, bytes), /上传地址/); assert.equal(calls, 3);
});

test('Drive rejects repeated page tokens, incomplete lists and duplicate archive IDs', async () => {
  const repeated = createGoogleDrive({ fetchImpl: async () => json({ files: [folder], nextPageToken: 'repeat' }) });
  await assert.rejects(repeated.list('token'), /分页/);
  const incomplete = createGoogleDrive({ fetchImpl: async () => json({ files: [], incompleteSearch: true }) });
  await assert.rejects(incomplete.list('token'), /不完整/);
  const duplicate = createGoogleDrive({ fetchImpl: async url => json({ files: new URL(url).searchParams.get('q').includes('vnd.google-apps.folder') ? [folder] : [file, { ...file, id: 'file-2' }] }) });
  const { archive, bytes } = encodeDriveArchive(record, validate);
  await assert.rejects(duplicate.upload('token', archive, bytes, () => true), /重复/);
});

test('Drive authorization errors invalidate sessions and unsafe downloads make no requests', async () => {
  let invalidated = false; let calls = 0;
  const drive = createGoogleDrive({ invalidate: () => { invalidated = true; }, fetchImpl: async () => { calls++; return new Response(null, { status: 401 }); } });
  await assert.rejects(drive.list('token'), /过期/); assert.ok(invalidated);
  for (const patch of [{ id: '../escape' }, { mimeType: 'text/html' }, { size: String(MAX_DRIVE_ARCHIVE_BYTES + 1) }]) await assert.rejects(drive.download('token', { ...file, ...patch }));
  assert.equal(calls, 1);
});
