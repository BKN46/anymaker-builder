import * as THREE from 'three';

export const RENDER_QUALITY_DEFAULTS = Object.freeze({
  resolutionScale: 1, maxPixelRatio: 1.5, interactionScale: .75, maxFps: 60,
  antialias: true, shadows: true, shadowMapSize: 1024, shadowType: 'soft',
  shadowUpdate: 'on-change', interactionShadows: false,
  toneMapping: 'none', exposure: 1, showStats: false,
});
export const RENDER_QUALITY_PRESETS = Object.freeze({
  performance: { ...RENDER_QUALITY_DEFAULTS, maxPixelRatio: 1, interactionScale: .65, shadows: false, antialias: false },
  balanced: { ...RENDER_QUALITY_DEFAULTS },
  quality: { ...RENDER_QUALITY_DEFAULTS, maxPixelRatio: 2, interactionScale: 1, shadowMapSize: 2048, interactionShadows: true },
});
export function normalizeRenderQuality(value) {
  const input = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const defaults = RENDER_QUALITY_DEFAULTS;
  const number = (key, min, max) => Number.isFinite(input[key]) && input[key] >= min && input[key] <= max ? input[key] : defaults[key];
  const choice = (key, values) => values.includes(input[key]) ? input[key] : defaults[key];
  const bool = key => typeof input[key] === 'boolean' ? input[key] : defaults[key];
  return {
    resolutionScale: number('resolutionScale', .5, 1.5), maxPixelRatio: number('maxPixelRatio', 1, 3),
    interactionScale: number('interactionScale', .35, 1), maxFps: choice('maxFps', [0, 30, 60, 120]),
    antialias: bool('antialias'), shadows: bool('shadows'), shadowMapSize: choice('shadowMapSize', [512, 1024, 2048, 4096]),
    shadowType: choice('shadowType', ['basic', 'pcf', 'soft']), shadowUpdate: choice('shadowUpdate', ['on-change', 'continuous']),
    interactionShadows: bool('interactionShadows'), toneMapping: choice('toneMapping', ['none', 'linear', 'reinhard', 'aces']),
    exposure: number('exposure', .1, 3), showStats: bool('showStats'),
  };
}
export function renderPixelRatio(quality, deviceRatio = 1, interacting = false) {
  const ratio = Number.isFinite(deviceRatio) && deviceRatio > 0 ? deviceRatio : 1;
  return Math.min(ratio, quality.maxPixelRatio) * quality.resolutionScale * (interacting ? quality.interactionScale : 1);
}
export function renderQualityPreset(quality) {
  return Object.keys(RENDER_QUALITY_PRESETS).find(name => Object.keys(quality).every(key => key === 'showStats' || quality[key] === RENDER_QUALITY_PRESETS[name][key])) || 'custom';
}
export function createRenderQualityController(renderer, light, initial) {
  let quality = normalizeRenderQuality(initial);
  let interacting = false;
  let shadowsDirty = true;
  const antialiasAtStartup = renderer.getContext().getContextAttributes().antialias;
  const shadowTypes = { basic: THREE.BasicShadowMap, pcf: THREE.PCFShadowMap, soft: THREE.PCFSoftShadowMap };
  const toneMappings = { none: THREE.NoToneMapping, linear: THREE.LinearToneMapping, reinhard: THREE.ReinhardToneMapping, aces: THREE.ACESFilmicToneMapping };
  function apply() {
    const ratio = renderPixelRatio(quality, globalThis.devicePixelRatio, interacting);
    if (Math.abs(renderer.getPixelRatio() - ratio) > .001) renderer.setPixelRatio(ratio);
    renderer.shadowMap.enabled = quality.shadows;
    renderer.shadowMap.type = shadowTypes[quality.shadowType];
    renderer.shadowMap.autoUpdate = quality.shadowUpdate === 'continuous' && (!interacting || quality.interactionShadows);
    const size = Math.min(quality.shadowMapSize, renderer.capabilities.maxTextureSize);
    if (light.shadow.mapSize.x !== size) {
      light.shadow.map?.dispose(); light.shadow.map = null;
      light.shadow.mapPass?.dispose(); light.shadow.mapPass = null;
      light.shadow.mapSize.set(size, size);
    }
    renderer.toneMapping = toneMappings[quality.toneMapping];
    renderer.toneMappingExposure = quality.exposure;
  }
  apply();
  return {
    setQuality(value) { quality = normalizeRenderQuality(value); shadowsDirty = true; apply(); },
    setInteraction(value) {
      if (interacting === value) return;
      interacting = value;
      if (!value) shadowsDirty = true;
      apply();
    },
    invalidateShadows() { shadowsDirty = true; },
    beforeRender() {
      // Keep the cached shadow texture and shader variant while dragging.
      // Dropping an object refreshes it once with the final validated scene.
      const frozen = interacting && !quality.interactionShadows;
      renderer.shadowMap.needsUpdate = quality.shadows && shadowsDirty && !frozen;
      if (renderer.shadowMap.needsUpdate) shadowsDirty = false;
    },
    get reloadRequired() { return quality.antialias !== antialiasAtStartup; },
    get quality() { return quality; },
  };
}
