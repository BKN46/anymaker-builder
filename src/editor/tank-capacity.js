// Tank capacity follows the component definition's inclusive integer-cell bounds.
// One occupied cell represents half a litre in the game's tank properties.
export const LITERS_PER_CELL = 0.5;

export const TANK_TYPES = new Set([
  'liquid_tank',
  'gas_tank_a',
  'gas_tank_b',
  'gas_tank_c',
]);

function validVector(value) {
  return Array.isArray(value)
    && value.length === 3
    && value.every(item => Number.isFinite(item));
}

function extensionFor(definition, extension) {
  if (!validVector(extension)) return [0, 0, 0];
  return extension.map((value, index) => {
    if (!Number.isInteger(value) || value < 0) return 0;
    const axis = ['x', 'y', 'z'][index];
    return ['stretch', 'tile'].includes(definition?.[`mode_${axis}`]) ? value : 0;
  });
}

/**
 * Return the maximum tank volume in litres, or null when the definition has
 * no usable integer-cell occupancy. Published definitions omit zero-valued
 * bounds_min fields in some components, so an omitted minimum is zero.
 */
export function tankCapacityLiters(definition, extension = undefined) {
  const zones = Array.isArray(definition?.zones) ? definition.zones : [];
  if (!zones.length) return null;
  const extra = extensionFor(definition, extension);
  let cells = 0;
  let found = false;
  for (const zone of zones) {
    const max = zone?.bounds_max;
    const min = zone?.bounds_min || [0, 0, 0];
    if (!validVector(min) || !validVector(max)) continue;
    if (min.some((value, index) => value > max[index])) continue;
    const size = max.map((value, index) => value - min[index] + 1 + extra[index]);
    if (size.some(value => !Number.isFinite(value) || value <= 0)) continue;
    cells += size[0] * size[1] * size[2];
    found = true;
  }
  return found && Number.isFinite(cells) ? cells * LITERS_PER_CELL : null;
}

export function tankCapacityCells(liters) {
  return Number.isFinite(liters) ? liters / LITERS_PER_CELL : null;
}
