export const DEFAULT_PROJECT_NAME = 'anymaker-vehicle';
export const MAX_PROJECT_NAME_LENGTH = 120;

export function normalizeProjectName(value, fallback = DEFAULT_PROJECT_NAME) {
  if (typeof value !== 'string') return fallback;
  const name = value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, MAX_PROJECT_NAME_LENGTH).trim();
  return name || fallback;
}

export function projectFileBaseName(value) {
  const name = normalizeProjectName(value)
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/[. ]+$/g, '')
    .trim();
  if (!name || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(name)) return DEFAULT_PROJECT_NAME;
  return name;
}
