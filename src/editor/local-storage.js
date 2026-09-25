import { nativePaintColor } from './native-paint.js';

const finite = (value, min, max, fallback) => Number.isFinite(value) && value >= min && value <= max ? value : fallback;
const bool = (value, fallback) => typeof value === 'boolean' ? value : fallback;
const text = (value, size, fallback = '') => typeof value === 'string' && value.length <= size ? value : fallback;
const vector = value => Array.isArray(value) && value.length === 3 && value.every(n => Number.isFinite(n) && Math.abs(n) <= 10000);
const hexColor = value => typeof value === 'string' && /^#[\da-f]{6}$/i.test(value) ? value.toLowerCase() : null;
const paintColors = (value, fallback) => {
  if (!Array.isArray(value) || value.length > 12) return fallback;
  const colors = value.map(color => hexColor(color) || (Number.isInteger(color) && color >= 0 && color <= 255 ? nativePaintColor(color) : null));
  return colors.every(Boolean) ? [...new Set(colors)] : fallback;
};
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
    leftWidth: finite(s.leftWidth, 240, 720, 304),
    rightWidth: finite(s.rightWidth, 240, 720, 304),
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
    edgeAxisSnap: bool(s.edgeAxisSnap, false),
    connectionVisibility: {
      electric: bool(s.connectionVisibility?.electric, true),
      mechanical: bool(s.connectionVisibility?.mechanical, true),
      liquid: bool(s.connectionVisibility?.liquid, true),
      gas: bool(s.connectionVisibility?.gas, true),
      belt: bool(s.connectionVisibility?.belt, true),
      data: bool(s.connectionVisibility?.data, true),
    },
    edgeLengthsVisible: bool(s.edgeLengthsVisible, false),
    edgeOutlinesVisible: bool(s.edgeOutlinesVisible, false),
    backgroundColor: typeof s.backgroundColor === 'string' && /^#[\da-f]{6}$/i.test(s.backgroundColor) ? s.backgroundColor : '#ffffff',
    lightAzimuth: finite(s.lightAzimuth, -180, 180, 35),
    lightElevation: finite(s.lightElevation, 5, 90, 55),
    lightIntensity: finite(s.lightIntensity, 0, 8, 3),
    shadowStrength: finite(s.shadowStrength, 0, 1, .65),
    lightSoftness: finite(s.lightSoftness, 0, 8, 2),
    cameraLightEnabled: bool(s.cameraLightEnabled, true),
    cameraLightIntensity: finite(s.cameraLightIntensity, 0, 8, 2),
    // Older preferences kept diagnostic native palette indices. Convert them
    // once on read so the visible palette and all newly saved colors are RGB.
    paintQuickColors: paintColors(s.paintQuickColors, ['#bd2636', '#631a24', '#2b3440', '#20252c', '#a16a30']),
    orthographic: bool(s.orthographic, false),
    showBuildingFurniture: bool(s.showBuildingFurniture, false),
    modelThumbnails: bool(s.modelThumbnails, false),
    catalogCardSize: finite(s.catalogCardSize, 64, 156, 72),
    query: text(s.query, 200), category: text(s.category, 80), selectedType: text(s.selectedType, 100, 'engine'),
    tool: ['select', 'place', 'erase', 'translate', 'rotate', 'scale', 'node', 'edge', 'split', 'plate', 'glass', 'connect', 'paint'].includes(s.tool) ? s.tool : 'select',
    sidebarTabs: {
      left: s.sidebarTabs?.left === 'subgrids' ? 'subgrids' : 'catalog',
      right: ['editor', 'inspector', 'resources', 'history'].includes(s.sidebarTabs?.right) ? s.sidebarTabs.right : 'editor',
    },
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
