import * as THREE from 'three';

// Keep each opaque family in a separate, small depth-bias layer. Each family
// also receives a stable sub-layer, because a family-level offset alone still
// leaves two fully coincident component, edge, or plate meshes z-fighting.
export const RENDER_DEPTH_LAYERS = Object.freeze({ component: 0, edge: 1, plate: 2 });
export const DEPTH_SUBLAYERS = 16;
const DEPTH_LAYER_STRIDE = DEPTH_SUBLAYERS * 2;
// Log-depth writes bypass polygon offset. Keep its equivalent tie-break much
// smaller than the normal-buffer polygon units: it is only for coincident
// fragments, while layer ordering remains visibly separated.
export const LOG_DEPTH_LAYER_STEP = 1 / (1 << 20);
export const LOG_DEPTH_SUBLAYER_STEP = LOG_DEPTH_LAYER_STEP / (DEPTH_SUBLAYERS * 4);

function validLayer(layer) {
  return Number.isInteger(layer) && layer >= 0 && layer <= RENDER_DEPTH_LAYERS.plate;
}

function validRank(rank) {
  return Number.isInteger(rank) && rank >= 0 && rank < DEPTH_SUBLAYERS;
}

export function stableDepthRank(key) {
  const text = String(key ?? '');
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % DEPTH_SUBLAYERS;
}

export function depthBias(layer, rank = 0) {
  if (!validLayer(layer) || !validRank(rank)) throw new Error('Invalid render depth layer');
  return -((layer + 1) * DEPTH_LAYER_STRIDE + rank);
}

export function logDepthBias(layer, rank = 0) {
  if (!validLayer(layer) || !validRank(rank)) throw new Error('Invalid render depth layer');
  return -((layer + 1) * LOG_DEPTH_LAYER_STEP + rank * LOG_DEPTH_SUBLAYER_STEP);
}

function installLogDepthBias(material, bias) {
  const state = material.userData.renderDepthState || {
    onBeforeCompile: material.onBeforeCompile,
    customProgramCacheKey: material.customProgramCacheKey,
    bias: 0,
  };
  state.bias = bias;
  material.userData.renderDepthState = state;
  material.onBeforeCompile = shader => {
    state.onBeforeCompile.call(material, shader);
    const offset = state.bias.toExponential();
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <logdepthbuf_fragment>',
      `#include <logdepthbuf_fragment>\n#ifdef USE_LOGDEPTHBUF\n  gl_FragDepth = clamp( gl_FragDepth + (${offset}), 0.0, 1.0 );\n#endif`,
    );
  };
  material.customProgramCacheKey = () => `${state.customProgramCacheKey.call(material)}|render-depth-${state.bias}`;
}

export function configureOpaqueDepth(material, layer, { key = '' } = {}) {
  if (!material || material.transparent || material.depthWrite === false) return material;
  const rank = stableDepthRank(key);
  const bias = depthBias(layer, rank);
  material.depthTest = true;
  material.depthWrite = true;
  material.depthFunc = THREE.LessEqualDepth;
  material.polygonOffset = true;
  // Coplanar support in a normal depth buffer. Do not use a slope factor: the
  // problem is coincident faces, not deliberately sloped decal geometry.
  material.polygonOffsetFactor = 0;
  material.polygonOffsetUnits = bias;
  // Logarithmic depth writes gl_FragDepth itself, bypassing polygon offset.
  // Mirror the same layer tie-break in the final fragment depth on that path.
  installLogDepthBias(material, logDepthBias(layer, rank));
  material.needsUpdate = true;
  material.userData.renderDepthLayer = layer;
  material.userData.renderDepthRank = rank;
  return material;
}

export function configureOpaqueDepthLayer(object, layer, { key = '' } = {}) {
  if (!validLayer(layer)) throw new Error('Invalid render depth layer');
  const rank = stableDepthRank(key);
  const renderOrder = layer * DEPTH_SUBLAYERS + rank;
  object.traverse(child => {
    if (!child.isMesh) return;
    for (const material of Array.isArray(child.material) ? child.material : [child.material]) configureOpaqueDepth(material, layer, { key });
    child.renderOrder = renderOrder;
  });
  return object;
}

function isOpaqueMesh(mesh) {
  if (!mesh?.isMesh) return false;
  return (Array.isArray(mesh.material) ? mesh.material : [mesh.material])
    .some(material => material && !material.transparent && material.depthWrite !== false);
}

// A polygon offset separates the deliberately different component/edge/plate
// families, but its small hash sub-layer is not a complete ordering: two
// entities can legitimately land in the same bucket. Give every live opaque
// draw mesh a unique, deterministic render order as the final tie-break.
// With LessEqualDepth this makes exact depth ties resolve to the same later
// draw on every frame, including the logarithmic-depth path, rather than
// letting driver/triangle submission order decide.
export function assignOpaqueDepthOrder(entries) {
  const meshes = [];
  for (const entry of entries || []) {
    if (!entry?.object || !validLayer(entry.layer)) throw new Error('Invalid opaque depth entry');
    let childIndex = 0;
    entry.object.traverse(child => {
      if (!child.isMesh) return;
      const index = childIndex++;
      if (!isOpaqueMesh(child)) return;
      meshes.push({ mesh: child, layer: entry.layer, key: `${String(entry.key ?? '')}:${index}` });
    });
  }
  meshes.sort((left, right) => left.layer - right.layer || (left.key < right.key ? -1 : left.key > right.key ? 1 : 0));
  for (let order = 0; order < meshes.length; order++) {
    const entry = meshes[order];
    entry.mesh.renderOrder = order;
    for (const material of Array.isArray(entry.mesh.material) ? entry.mesh.material : [entry.mesh.material]) {
      configureOpaqueDepth(material, entry.layer, { key: entry.key });
    }
  }
  return meshes.length;
}
