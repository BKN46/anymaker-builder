// Native microcontroller state is data only. The browser editor preserves and
// edits the observed save fields but never evaluates user-authored scripts.
const NAME = /^[A-Za-z_][A-Za-z0-9_]{0,79}$/;
const TYPES = new Set(['bool', 'f64']);
const GROUPS = ['global_inputs', 'global_outputs', 'global_private'];

function dataValue(type, value) {
  if (!TYPES.has(type)) throw new Error('Unsupported microcontroller variable type');
  if (type === 'bool') return { _type: 'bool', type: 'type_bool', ...(value === true ? { data_value: true } : {}) };
  if (value !== undefined && (!Number.isFinite(value) || Math.abs(value) > 1e9)) throw new Error('Invalid microcontroller number');
  return { _type: 'f64', ...(value === undefined ? {} : { data_value: value }) };
}

function variable(value) {
  if (!value || typeof value.name !== 'string' || !NAME.test(value.name)) throw new Error('Invalid microcontroller variable name');
  const source = value.data_value;
  const type = source?._type;
  if (!TYPES.has(type)) throw new Error('Unsupported microcontroller variable type');
  const current = source?.data_value;
  if (current !== undefined && (type === 'bool' ? typeof current !== 'boolean' : !Number.isFinite(current))) throw new Error('Invalid microcontroller variable value');
  return { name: value.name, data_value: dataValue(type, current) };
}

export function microcontrollerState(properties = {}) {
  const script = properties.script === undefined ? '' : properties.script;
  if (typeof script !== 'string') throw new Error('Invalid microcontroller script');
  if (script.length > 65536) throw new Error('Microcontroller script is too long');
  const result = { script };
  for (const group of GROUPS) {
    const values = properties[group] === undefined ? [] : properties[group];
    if (!Array.isArray(values) || values.length > 128) throw new Error('Invalid microcontroller variable group');
    const names = new Set();
    result[group] = values.map(value => {
      const normalized = variable(value);
      if (names.has(normalized.name)) throw new Error('Duplicate microcontroller variable name');
      names.add(normalized.name);
      return normalized;
    });
  }
  return result;
}

export function updateMicrocontrollerState(properties, nextState) {
  const state = microcontrollerState(nextState);
  return { ...(properties || {}), ...state };
}

export function createMicrocontrollerVariable(type = 'f64') {
  return { name: 'value', data_value: dataValue(type, type === 'bool' ? false : 0) };
}
