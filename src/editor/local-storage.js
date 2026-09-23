const finite = (value, min, max, fallback) => Number.isFinite(value) && value >= min && value <= max ? value : fallback;
const bool = (value, fallback) => typeof value === 'boolean' ? value : fallback;
const text = (value, size, fallback = '') => typeof value === 'string' && value.length <= size ? value : fallback;
const vector = value => Array.isArray(value) && value.length === 3 && value.every(n => Number.isFinite(n) && Math.abs(n) <= 10000);
export const AUTOSAVE_INTERVAL = 60000;

export function normalizeSettings(input = {}) {
  const s = input && input.version === 1 ? input : {};
  let camera = null;
  if (vector(s.camera?.position) && vector(s.camera?.target)) {
    const distance = Math.hypot(...s.camera.position.map((n, i) => n - s.camera.target[i]));
    if (distance > .005 && distance < 2000) camera = { position: [...s.camera.position], target: [...s.camera.target] };
  }
  return {
    version: 1,
    language: s.language === 'zh' ? 'zh' : 'en',
    leftWidth: finite(s.leftWidth, 240, 480, 304),
    leftCollapsed: bool(s.leftCollapsed, false),
    rightOpen: bool(s.rightOpen, false),
    gridColor: typeof s.gridColor === 'string' && /^#[\da-f]{6}$/i.test(s.gridColor) ? s.gridColor : '#8294a8',
    gridOpacity: finite(s.gridOpacity, 0, 1, .45),
    gridStyle: s.gridStyle === 'dashed' ? 'dashed' : 'solid',
    gridVisible: bool(s.gridVisible, true),
    nodesVisible: bool(s.nodesVisible, true),
    nodeColor: typeof s.nodeColor === 'string' && /^#[\da-f]{6}$/i.test(s.nodeColor) ? s.nodeColor : '#246bce',
    nodeSize: finite(s.nodeSize, .02, .25, .055),
    nodeOpacity: finite(s.nodeOpacity, 0, 1, 1),
    beamAxisSnap: bool(s.beamAxisSnap, false),
    query: text(s.query, 200), category: text(s.category, 80), selectedType: text(s.selectedType, 100, 'engine'),
    tool: ['select', 'place', 'erase', 'translate', 'rotate', 'scale', 'node', 'beam', 'plate'].includes(s.tool) ? s.tool : 'select',
    drawers: { catalog: bool(s.drawers?.catalog, true), inspector: bool(s.drawers?.inspector, false), resources: bool(s.drawers?.resources, false) },
    camera,
  };
}

export function createLocalStore(getStorage, scope = '/') {
  const prefix = 'anymaker:' + scope;
  const keys = { settings: prefix + ':settings:v1', project: prefix + ':autosave:v1', backup: prefix + ':autosave-backup:v1' };
  function parse(raw, limit) {
    if (raw.length > limit) throw new Error('Local record exceeds the size limit');
    return JSON.parse(raw);
  }
  function readRecord(raw, validate) {
    const record = parse(raw, 8 * 1024 * 1024);
    if (!record || record.version !== 1 || !Number.isFinite(record.savedAt)) throw new Error('Unsupported local backup');
    return { ...record, document: validate(record.document) };
  }
  return {
    keys,
    loadSettings() {
      try {
        const raw = getStorage().getItem(keys.settings);
        return { settings: normalizeSettings(raw ? parse(raw, 16384) : undefined), error: null };
      } catch (error) { return { settings: normalizeSettings(), error }; }
    },
    saveSettings(settings) {
      try { getStorage().setItem(keys.settings, JSON.stringify(normalizeSettings(settings))); return { ok: true }; }
      catch (error) { return { ok: false, error }; }
    },
    loadProject(validate) {
      let failure = null;
      for (const key of [keys.project, keys.backup]) {
        try {
          const raw = getStorage().getItem(key);
          if (raw) return { record: readRecord(raw, validate), recoveredBackup: key === keys.backup, error: null };
        } catch (error) { failure = error; }
      }
      return { record: null, error: failure };
    },
    saveProject(document, validate, now = Date.now()) {
      try {
        const validated = validate(document);
        const raw = JSON.stringify({ version: 1, savedAt: now, document: validated });
        if (raw.length > 8 * 1024 * 1024) throw new Error('Project too large for local backup');
        const storage = getStorage();
        const old = storage.getItem(keys.project);
        if (old) {
          let validOld = false;
          try { readRecord(old, validate); validOld = true; } catch { /* Keep an existing valid backup when the latest record is corrupt. */ }
          if (validOld) {
            try { storage.setItem(keys.backup, old); } catch { /* The current record remains intact if the next atomic write fails. */ }
          }
        }
        storage.setItem(keys.project, raw);
        return { ok: true, savedAt: now };
      } catch (error) { return { ok: false, error }; }
    },
  };
}
