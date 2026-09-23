import { AUTOSAVE_INTERVAL } from './local-storage.js';

export async function startLocalSession({ store, validate, restore, snapshot, canSave, notify }) {
  let blocked = false;
  let lastPayload = '';
  let state = 'ready';
  let savedAt = null;
  let detail = '';
  const publish = (next, error = '') => { state = next; detail = error; notify({ state, savedAt, detail }); };
  const loaded = store.loadProject(validate);
  if (loaded.record) {
    try {
      await restore(loaded.record.document);
      lastPayload = JSON.stringify(snapshot());
      savedAt = loaded.record.savedAt;
      publish(loaded.recoveredBackup ? 'recovered' : 'restored');
    } catch (error) { blocked = true; publish('error', error.message); }
  } else if (loaded.error) {
    blocked = true; publish('error', loaded.error.message);
  } else {
    lastPayload = JSON.stringify(snapshot());
    publish('ready');
  }

  function save(force = false) {
    if (blocked || !canSave()) return false;
    try {
      const document = snapshot();
      const payload = JSON.stringify(document);
      if (!force && payload === lastPayload) return true;
      const result = store.saveProject(document, validate);
      if (!result.ok) { publish('write-error', result.error.message); return false; }
      savedAt = result.savedAt; lastPayload = payload; publish('saved');
      return true;
    } catch (error) { publish('write-error', error.message); return false; }
  }
  const timer = setInterval(() => save(), AUTOSAVE_INTERVAL);
  const hide = () => { if (document.visibilityState === 'hidden') save(); };
  const exit = () => save();
  const conflict = event => {
    if (event.key !== store.keys.project) return;
    blocked = true; publish('conflict');
  };
  document.addEventListener('visibilitychange', hide);
  window.addEventListener('pagehide', exit);
  window.addEventListener('storage', conflict);
  return {
    save,
    resume() { blocked = false; return save(true); },
    refresh() { notify({ state, savedAt, detail }); },
    dispose() {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', exit);
      window.removeEventListener('storage', conflict);
    },
  };
}
