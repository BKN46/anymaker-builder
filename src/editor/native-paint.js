import { GAME_PALETTE } from './game-palette.js';

export function officialPaintColors() {
  return GAME_PALETTE;
}

export function nativePaintColor(index) {
  return Number.isInteger(index) ? GAME_PALETTE[index] || null : null;
}

function rgb(hex) {
  return [1, 3, 5].map(index => Number.parseInt(hex.slice(index, index + 2), 16));
}

// The texture stores opaque game colors at indices 0..84. Transparent padding
// must never be selected for an RGB color, even if its RGB bytes are white.
export function nearestNativePaintIndex(color) {
  if (typeof color !== 'string' || !/^#[\da-f]{6}$/i.test(color)) return null;
  const target = rgb(color);
  let closest = 0; let distance = Infinity;
  for (let index = 0; index < GAME_PALETTE.length; index++) {
    const candidate = rgb(nativePaintColor(index));
    const nextDistance = candidate.reduce((sum, value, channel) => sum + (value - target[channel]) ** 2, 0);
    if (nextDistance < distance) { closest = index; distance = nextDistance; }
  }
  return closest;
}

export function isGlassPlate(plate) { return plate?.type === 'window'; }
