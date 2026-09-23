// Renderer-independent connection commands. Native files expose six network
// families; endpoint/port compatibility remains definition-driven and is
// deliberately not guessed here.
import { assertGridVector } from './grid.js';

export const LINK_KINDS = ['electric', 'mechanical', 'liquid', 'gas', 'belt', 'data'];

// These diagnostic colours identify a network family consistently in the
// connection toolbar, endpoint markers, and rendered links.
export const LINK_COLORS = Object.freeze({
  electric: '#f1c232',
  mechanical: '#f2994a',
  liquid: '#2f80ed',
  gas: '#27ae60',
  belt: '#98a2b3',
  data: '#9b51e0',
});

const clone = value => structuredClone(value);
const port = value => value === undefined ? 0 : value;

function endpoint(value, label, componentIds) {
  if (!value || typeof value.componentId !== 'string' || !value.componentId) throw new Error(`${label} endpoint must reference a component`);
  if (componentIds && !componentIds.has(value.componentId)) throw new Error(`${label} endpoint references an unknown component: ${value.componentId}`);
  if (!Number.isInteger(port(value.port)) || port(value.port) < 0 || port(value.port) > 255) throw new Error(`${label} port must be an integer from 0 to 255`);
  return { componentId: value.componentId, ...(value.port === undefined ? {} : { port: value.port }) };
}

export function validateLinks(links = [], componentIds = null) {
  if (!Array.isArray(links)) throw new Error('Connections must be an array');
  const ids = new Set();
  return links.map((link, index) => {
    if (!link || typeof link.id !== 'string' || !link.id || ids.has(link.id)) throw new Error(`Connection ID is invalid or duplicated: ${index}`);
    if (!LINK_KINDS.includes(link.kind)) throw new Error(`Unsupported connection kind: ${String(link.kind)}`);
    const from = endpoint(link.from, 'Connection source', componentIds);
    const to = endpoint(link.to, 'Connection target', componentIds);
    if (from.componentId === to.componentId && port(from.port) === port(to.port)) throw new Error('A connection cannot use the same component port twice');
    if (!Array.isArray(link.points) || link.points.length > 256) throw new Error('Connection route must contain at most 256 points');
    if (link.color !== undefined && (!Number.isInteger(link.color) || link.color < 0 || link.color > 255)) throw new Error('Connection color must be an integer from 0 to 255');
    ids.add(link.id);
    const normalized = { id: link.id, kind: link.kind, from, to, points: link.points.map(point => assertGridVector(point, 'Connection route point')) };
    if (Number.isInteger(link.color) && link.color >= 0 && link.color <= 255) normalized.color = link.color;
    return normalized;
  });
}

export function createLink(links, value, componentIds = null) {
  const next = validateLinks(links, componentIds);
  const prefix = `${value.kind}-link`;
  let index = 1;
  while (next.some(link => link.id === `${prefix}-${index}`)) index++;
  const [link] = validateLinks([{ ...clone(value), id: `${prefix}-${index}` }], componentIds);
  return { links: [...next, link], link };
}

export function removeLink(links, id, componentIds = null) {
  const next = validateLinks(links, componentIds);
  if (!next.some(link => link.id === id)) throw new Error(`Connection does not exist: ${id}`);
  return { links: next.filter(link => link.id !== id) };
}
