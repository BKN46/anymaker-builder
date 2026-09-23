// These indices are observed in test-vehicle. They are diagnostic previews,
// not a reverse-engineered Anymaker palette or shader implementation.
const observed = new Map([
  [26, '#bd2636'],
  [28, '#631a24'],
  [49, '#2b3440'],
  [79, '#20252c'],
]);

function byte(value) { return Math.round(Math.max(0, Math.min(1, value)) * 255).toString(16).padStart(2, '0'); }

export function nativePaintColor(index) {
  if (observed.has(index)) return observed.get(index);
  const hue = (index * .61803398875) % 1;
  const saturation = .62; const lightness = .46;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const segment = hue * 6; const middle = chroma * (1 - Math.abs(segment % 2 - 1));
  const [red, green, blue] = segment < 1 ? [chroma, middle, 0] : segment < 2 ? [middle, chroma, 0] : segment < 3 ? [0, chroma, middle] : segment < 4 ? [0, middle, chroma] : segment < 5 ? [middle, 0, chroma] : [chroma, 0, middle];
  const offset = lightness - chroma / 2;
  return '#' + byte(red + offset) + byte(green + offset) + byte(blue + offset);
}

export function isGlassPlate(plate) { return plate?.type === 'window'; }
