import { test, expect } from '@playwright/test';
import { observeRendering } from './render-observer.js';

test('rendering quality applies detailed controls, caches shadows and persists through reload', async ({ page }, testInfo) => {
  await observeRendering(page);
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('#render-quality-settings')).toContainText('Rendering quality');
  await page.locator('#render-preset').selectOption('quality');
  await expect(page.locator('#render-shadowMapSize')).toHaveValue('2048');
  await page.locator('#render-resolutionScale').fill('0.8');
  await page.locator('#render-maxPixelRatio').fill('1.25');
  await page.locator('#render-interactionScale').fill('0.5');
  await page.locator('#render-maxFps').selectOption('120');
  await page.locator('#render-shadowMapSize').selectOption('512');
  await page.locator('#render-shadowType').selectOption('pcf');
  await page.locator('#render-shadowUpdate').selectOption('on-change');
  await page.locator('#render-interactionShadows').uncheck();
  await page.locator('#render-toneMapping').selectOption('aces');
  await page.locator('#render-exposure').fill('1.4');
  await page.locator('#render-showStats').check();
  await page.locator('#render-antialias').uncheck();
  await expect(page.locator('#render-reload-notice')).toBeVisible();
  await expect(page.locator('#render-preset')).toHaveValue('custom');
  await expect(page.locator('#render-stats')).toContainText('draws');
  const live = await page.evaluate(() => {
    const { renderer, scene } = window.__renderTestState;
    return { ratio: renderer.getPixelRatio(), size: scene.children.find(o => o.isDirectionalLight).shadow.mapSize.x, exposure: renderer.toneMappingExposure, auto: renderer.shadowMap.autoUpdate };
  });
  expect(live).toEqual({ ratio: .8, size: 512, exposure: 1.4, auto: false });
  await expect.poll(() => page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':settings:v1')).renderQuality?.maxFps;
  })).toBe(120);
  await page.locator('#language-select').selectOption('zh');
  await expect(page.locator('#render-quality-settings')).toContainText('渲染质量');
  await page.reload(); await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#render-resolutionScale')).toHaveValue('0.8');
  await expect(page.locator('#render-shadowType')).toHaveValue('pcf');
  await expect(page.locator('#render-maxFps')).toHaveValue('120');
  await expect(page.locator('#render-exposure')).toHaveValue('1.4');
  await expect(page.locator('#render-antialias')).not.toBeChecked();
  await expect(page.locator('#render-reload-notice')).toBeHidden();
  await page.locator('#render-quality-settings h2').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('render-quality-settings.png') });
  expect(await page.evaluate(() => window.__renderTestState.renderer.getContext().getContextAttributes().antialias)).toBe(false);
  const sample = await page.evaluate(async () => {
    const state = window.__renderTestState;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const before = state.shadowFrames; const frames = state.frames;
    await new Promise(resolve => setTimeout(resolve, 250));
    return { shadows: state.shadowFrames - before, frames: state.frames - frames };
  });
  expect(sample.shadows).toBe(0); expect(sample.frames).toBeGreaterThan(0);
  await page.locator('#right-sidebar-toggle').click();
  const canvas = page.locator('#viewport canvas'); const box = await canvas.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 30, { steps: 8 });
  expect(await page.evaluate(() => window.__renderTestState.renderer.getPixelRatio())).toBe(.4);
  await page.mouse.up({ button: 'right' });
  expect(await page.evaluate(() => window.__renderTestState.renderer.getPixelRatio())).toBe(.8);
  expect(errors).toEqual([]);
});

const settingsKey = 'anymaker:/anymaker-builder/:settings:v1';
const projectKey = 'anymaker:/anymaker-builder/:autosave:v1';
async function ready(page, catalogCount = '332 / 598') {
  await expect(page.locator('#catalog-count')).toHaveText(catalogCount);
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
}

test('hide by type preferences survive reload independently of selection and connection filters', async ({ page }) => {
  await page.goto('./'); await ready(page);
  await page.locator('#type-visibility-toggle').click();
  await expect(page.locator('[data-hidden-kind]:checked')).toHaveCount(0);
  for (const kind of ['node', 'plate', 'link']) await page.locator('[data-hidden-kind="' + kind + '"]').check();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key))?.hiddenKinds, settingsKey)).toEqual({ component: false, structure: false, node: true, edge: false, plate: true, link: true });
  await page.reload(); await ready(page); await page.locator('#type-visibility-toggle').click();
  for (const kind of ['component', 'structure', 'node', 'edge', 'plate', 'link']) {
    await expect(page.locator('[data-hidden-kind="' + kind + '"]')).toBeChecked({ checked: ['node', 'plate', 'link'].includes(kind) });
    await expect(page.locator('[data-selectable-kind="' + kind + '"]')).toBeChecked();
  }
  await expect(page.locator('[data-connection-kind]:checked')).toHaveCount(7);
  await page.locator('#language-select').selectOption('zh');
  await expect(page.locator('#type-visibility-toggle')).toHaveText('按类型隐藏');
});

test('mirror plane visibility preference survives reload', async ({ page }) => {
  await page.goto('./'); await ready(page);
  await page.locator('#mirror-action').click();
  await expect(page.locator('#mirror-hide-plane')).not.toBeChecked();
  await page.locator('#mirror-hide-plane').check();
  await expect(page.locator('#viewport')).toHaveAttribute('data-mirror-guide-visible', 'false');
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key))?.hideMirrorPlane, settingsKey)).toBe(true);
  await page.reload(); await ready(page);
  await page.locator('#mirror-action').click();
  await expect(page.locator('#mirror-hide-plane')).toBeChecked();
  await expect(page.locator('#viewport')).toHaveAttribute('data-mirror-guide-visible', 'false');
});

test('English default, language switching, axis views, grid and panel preferences survive reload', async ({ page }) => {
  await page.goto('./'); await ready(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#save-btn')).toHaveText('Save vehicle');
  await expect(page.locator('#language-select')).toHaveValue('en');
  await expect(page.locator('#copy-action')).toHaveAttribute('aria-label', 'Copy');
  await expect(page.locator('#mirror-action')).toHaveAttribute('aria-label', 'Mirror');
  await expect(page.locator('.brand')).toHaveText('ANYMAKERbuilder by BKN');
  await expect(page.locator('.notice')).toHaveCount(0);
  expect(await page.locator('#tools').evaluate(element => !!element.closest('.topbar'))).toBe(false);
  expect(await page.locator('.top-tool-section').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await expect(page.locator('#orientation-indicator [data-view]')).toHaveCount(7);
  const handle = await page.locator('#left-sidebar-toggle').boundingBox();
  expect(handle.height).toBeGreaterThan(handle.width * 3);
  await page.locator('#language-select').selectOption('zh');
  await expect(page.locator('#save-btn')).toHaveText('保存载具');
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#language-select').selectOption('en');
  await expect(page.locator('#object-count')).toHaveText('0 components');
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('label[for="camera-light-enabled"]')).toHaveText('Camera fill light');
  await expect(page.locator('label[for="camera-light-intensity"]')).toHaveText('Camera fill intensity');
  await page.locator('#grid-color').fill('#ff3366');
  await page.locator('#grid-opacity').fill('0.25');
  await page.locator('#grid-style').selectOption('dashed');
  await page.locator('#node-color').fill('#22aa66');
  await page.locator('#node-size').fill('0.12');
  await page.locator('#node-opacity').fill('0.4');
  await page.locator('#edge-lengths-visible').check();
  await page.locator('#edge-outlines-visible').check();
  await page.locator('#background-color').fill('#102030');
  await page.locator('#light-azimuth').fill('80');
  await page.locator('#light-elevation').fill('35');
  await page.locator('#light-intensity').fill('4.2');
  await page.locator('#shadow-strength').fill('0.8');
  await page.locator('#light-softness').fill('3.5');
  await page.locator('#camera-light-enabled').uncheck();
  await page.locator('#camera-light-intensity').fill('5.5');
  await page.locator('#show-building-furniture').check();
  await expect(page.locator('#use-model-thumbnails')).not.toBeChecked();
  await page.locator('#use-model-thumbnails').check();
  await page.locator('#orthographic-view').check();
  const projectionButton = page.locator('#orientation-indicator [data-view="iso"]');
  await expect(projectionButton).toHaveAttribute('aria-pressed', 'true');
  await projectionButton.click();
  await expect(page.locator('#orthographic-view')).not.toBeChecked();
  await expect(projectionButton).toHaveAttribute('aria-pressed', 'false');
  await projectionButton.click();
  await expect(page.locator('#orthographic-view')).toBeChecked();
  await expect(page.locator('#node-size-value')).toHaveText('0.120');
  await expect(page.locator('#grid-settings')).toContainText('1 block = 8 cm');
  await expect(page.locator('#axis-snap-btn')).toContainText('Axis snap');
  await expect(page.locator('#axis-snap-btn')).toContainText('Shift');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#axis-snap-btn').click();
  await page.locator('#nodes-btn').click();
  await page.locator('#orientation-indicator [data-view="right"]').click();
  await page.locator('#left-sidebar-resizer').focus(); await page.keyboard.press('End');
  await page.locator('#left-sidebar-toggle').click();
  // SwiftShader thumbnail rendering can stall evaluation after settings are saved.
  // Keep checking the persisted value while allowing the renderer to finish.
  await expect.poll(async () => JSON.parse(await page.evaluate(key => localStorage.getItem(key), settingsKey))?.leftCollapsed, { timeout: 15000 }).toBe(true);
  const before = JSON.parse(await page.evaluate(key => localStorage.getItem(key), settingsKey));
  expect(before.gridColor).toBe('#ff3366'); expect(before.gridStyle).toBe('dashed'); expect(before.gridOpacity).toBe(.25);
  expect(before.nodeColor).toBe('#22aa66'); expect(before.nodeSize).toBe(.12); expect(before.nodeOpacity).toBe(.4);
  expect(before.edgeLengthsVisible).toBe(true);
  expect(before.edgeOutlinesVisible).toBe(true);
  expect(before.backgroundColor).toBe('#102030'); expect(before.lightAzimuth).toBe(80); expect(before.lightElevation).toBe(35);
  expect(before.lightIntensity).toBe(4.2); expect(before.shadowStrength).toBe(.8); expect(before.lightSoftness).toBe(3.5); expect(before.orthographic).toBe(true);
  expect(before.cameraLightEnabled).toBe(false); expect(before.cameraLightIntensity).toBe(5.5);
  expect(before.showBuildingFurniture).toBe(true);
  expect(before.modelThumbnails).toBe(true);
  expect(before.camera.position[0]).toBeGreaterThan(before.camera.target[0]);
  await page.reload(); await ready(page, '598 / 598');
  await expect(page.locator('#left-sidebar')).toBeHidden();
  await expect(page.locator('#right-sidebar')).toBeVisible();
  await expect(page.locator('#grid-color')).toHaveValue('#ff3366');
  await expect(page.locator('#grid-opacity')).toHaveValue('0.25');
  await expect(page.locator('#grid-style')).toHaveValue('dashed');
  await expect(page.locator('#node-color')).toHaveValue('#22aa66');
  await expect(page.locator('#node-size')).toHaveValue('0.12');
  await expect(page.locator('#node-opacity')).toHaveValue('0.4');
  await expect(page.locator('#edge-lengths-visible')).toBeChecked();
  await expect(page.locator('#edge-outlines-visible')).toBeChecked();
  await expect(page.locator('#background-color')).toHaveValue('#102030');
  await expect(page.locator('#orthographic-view')).toBeChecked();
  await expect(page.locator('#light-azimuth')).toHaveValue('80');
  await expect(page.locator('#light-elevation')).toHaveValue('35');
  await expect(page.locator('#light-intensity')).toHaveValue('4.2');
  await expect(page.locator('#shadow-strength')).toHaveValue('0.8');
  await expect(page.locator('#light-softness')).toHaveValue('3.5');
  await expect(page.locator('#camera-light-enabled')).not.toBeChecked();
  await expect(page.locator('#camera-light-intensity')).toHaveValue('5.5');
  await expect(page.locator('#show-building-furniture')).toBeChecked();
  await expect(page.locator('#use-model-thumbnails')).toBeChecked();
  await expect(page.locator('#grid-settings')).toContainText('1 block = 8 cm');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('#left-sidebar')).toBeHidden();
  const layout = await page.locator('#viewport').boundingBox(); expect(layout.x).toBe(0);
  await page.locator('#left-sidebar-toggle').click();
  const left = await page.locator('#left-sidebar').boundingBox(); expect(left.width).toBe(before.leftWidth);
  await page.screenshot({ path: 'test-results/preferences.png' });
});

test('60-second autosave recovers committed structures but not unfinished edge drafts', async ({ page }) => {
  await page.clock.install();
  await page.goto('./'); await ready(page);
  const canvas = page.locator('canvas');
  const component = { id: 'backup-engine', type: 'engine', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'vehicle.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [component] })) });
  await expect(page.locator('#object-count')).toHaveText('1 components');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.click({ position: { x: 720, y: 330 } });
  await expect(page.locator('#topology-count')).toHaveText('2 nodes · 1 edges · 0 plates');
  await canvas.click({ position: { x: 800, y: 500 } });
  await page.clock.fastForward(61000);
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'saved');
  const record = JSON.parse(await page.evaluate(key => localStorage.getItem(key), projectKey));
  expect(record.document.topology.nodes).toHaveLength(2);
  expect(record.document.topology.edges).toHaveLength(1);
  expect(record.document.objects).toEqual([component]);
  expect(Object.keys(record.document).sort()).toEqual(['format', 'grids', 'objects', 'projectName', 'topology', 'version']);
  expect(record.document.renderQuality).toBeUndefined();
  await page.reload(); await ready(page);
  await expect(page.locator('#topology-count')).toHaveText('2 nodes · 1 edges · 0 plates');
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'restored');
  await expect(page.locator('#object-count')).toHaveText('1 components');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 nodes · 0 edges · 0 plates');
  await page.clock.fastForward(61000);
  expect(JSON.parse(await page.evaluate(key => localStorage.getItem(key), projectKey)).document.topology.edges).toEqual([]);
});

test('damaged local data does not crash the editor or get silently overwritten', async ({ page }) => {
  await page.addInitScript(({ settingsKey, projectKey }) => {
    localStorage.setItem(settingsKey, '{broken');
    localStorage.setItem(projectKey, '{broken');
  }, { settingsKey, projectKey });
  await page.clock.install();
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./'); await ready(page);
  await expect(page.locator('#language-select')).toHaveValue('en');
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'error');
  await expect(page.locator('#alert-host .app-alert-error').first()).toBeVisible();
  await page.locator('[data-tool="node"]').click();
  await page.locator('canvas').click({ position: { x: 450, y: 400 } });
  await page.clock.fastForward(61000);
  expect(await page.evaluate(key => localStorage.getItem(key), projectKey)).toBe('{broken');
  await expect(page.locator('#topology-count')).toHaveText('1 nodes · 0 edges · 0 plates');
  expect(errors).toEqual([]);
});

test('quota errors preserve the last saved vehicle and report a recoverable error', async ({ page }) => {
  await page.clock.install(); await page.goto('./'); await ready(page);
  await page.locator('[data-tool="node"]').click();
  await page.locator('canvas').click({ position: { x: 450, y: 400 } });
  await page.clock.fastForward(61000);
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'saved');
  const saved = await page.evaluate(key => localStorage.getItem(key), projectKey);
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.includes(':autosave')) throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.locator('canvas').click({ position: { x: 680, y: 400 } });
  await page.clock.fastForward(61000);
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'write-error');
  await expect(page.locator('#alert-host .app-alert-error')).toContainText('Local save failed');
  expect(await page.evaluate(key => localStorage.getItem(key), projectKey)).toBe(saved);
  await expect(page.locator('#topology-count')).toHaveText('2 nodes · 0 edges · 0 plates');
});

test('another tab saving pauses overwrites until the user explicitly resumes', async ({ page, context }) => {
  await page.clock.install(); await page.goto('./'); await ready(page);
  const other = await context.newPage();
  await other.goto('./'); await ready(other);
  const incoming = { version: 1, savedAt: Date.now(), document: { format: 'anymaker-web-project', version: 1, objects: [], topology: { nodes: [{ id: 'other-node', position: { x: 1, y: 2, z: 3 } }], edges: [], plates: [] } } };
  await other.evaluate(({ key, value }) => localStorage.setItem(key, value), { key: projectKey, value: JSON.stringify(incoming) });
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'conflict');
  await expect(page.locator('#alert-host .app-alert-warning').filter({ hasText: 'Another tab saved' })).toBeVisible();
  await page.locator('[data-tool="node"]').click();
  await page.locator('canvas').click({ position: { x: 450, y: 400 } });
  await page.clock.fastForward(61000);
  expect(JSON.parse(await page.evaluate(key => localStorage.getItem(key), projectKey))).toEqual(incoming);
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#resume-autosave').click();
  await expect(page.locator('#autosave-status')).toHaveAttribute('data-state', 'saved');
  const saved = JSON.parse(await page.evaluate(key => localStorage.getItem(key), projectKey));
  expect(saved.document.topology.nodes[0].id).toBe('node-1');
  await other.close();
});
