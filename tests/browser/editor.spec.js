import { test, expect } from '@playwright/test';
import { meshFixture } from '../fixtures.js';
import { readFileSync } from 'node:fs';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const key = 'anymaker:' + location.pathname + ':settings:v1';
    localStorage.setItem(key, JSON.stringify({ version: 1, language: 'zh' }));
  });
});

async function openRightSidebar(page) {
  const toggle = page.locator('#right-sidebar-toggle');
  if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
}

test('GitHub build time selects a successful Pages deployment over a newer failure', async ({ page }) => {
  await page.route(/api\.github\.com\/repos\/BKN46\/anymaker-builder\/actions\/runs/, route => route.fulfill({
    contentType: 'application/json',
    body: JSON.stringify({ workflow_runs: [
      { path: 'dynamic/pages/pages-build-deployment', status: 'completed', conclusion: 'failure', updated_at: '2026-09-24T10:00:00Z' },
      { path: 'dynamic/pages/pages-build-deployment', status: 'completed', conclusion: 'success', updated_at: '2026-09-23T09:00:00Z' },
    ] }),
  }));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#github-build-time')).toHaveAttribute('title', '2026-09-23T09:00:00.000Z');
});

test('GitHub build status remains visible when no Pages run succeeds', async ({ page }) => {
  await page.route(/api\.github\.com\/repos\/BKN46\/anymaker-builder\/actions\/runs/, route => route.fulfill({
    contentType: 'application/json', body: JSON.stringify({ workflow_runs: [] }),
  }));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#github-build-time')).toHaveText('暂无成功的 Pages 构建');
});

test('Mesh → placement → transforms → history → files on Pages subpath', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#load-btn')).toHaveCount(0);
  await expect(page.locator('#catalog-count')).toContainText('332 / 598');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await expect(page.locator('#asset-status')).toContainText('1 个 Mesh');
  await expect(page.locator('#save-status')).toContainText('模型库已登记');
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#inspector-content')).toContainText('342 顶点 / 218 三角形');
  await openRightSidebar(page);
  await page.locator('#right-tab-inspector').click();
  const x = page.getByRole('spinbutton', { name: 'position-x', exact: true });
  await x.fill('15'); await x.press('Enter');
  await expect(x).toHaveValue('15');
  await page.locator('[data-tool="rotate"]').click();
  const yRotation = page.getByRole('spinbutton', { name: 'rotation-y', exact: true });
  await yRotation.fill('90'); await yRotation.press('Enter');
  await page.locator('#delete-selected').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await page.locator('#undo-btn').click(); await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#redo-btn').click(); await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await openRightSidebar(page);
  await page.locator('#right-tab-resources').click();
  const xmlDownload = page.waitForEvent('download'); await page.locator('#export-btn').click();
  const xml = await xmlDownload; const xmlStream = await xml.createReadStream(); let xmlContent = ''; for await (const c of xmlStream) xmlContent += c;
  expect(xmlContent).toContain('game-compatible="false"');
  await page.screenshot({ path: 'test-results/editor.png' });
  expect(errors).toEqual([]);
});

test('structural commands create independent components and remain undoable', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#copy-action').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await page.locator('#mirror-action').click();
  await expect(page.locator('#mirror-toolbar')).toBeVisible();
  await expect(page.locator('#mirror-action')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 540, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('4 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
});

test('Shift click multi-selection batches structural actions into one history entry', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 380, y: 400 } });
  await expect(page.locator('#undo-btn')).toBeEnabled();
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 680, y: 400 } });
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await canvas.click({ position: { x: 380, y: 400 } });
  await page.keyboard.down('Shift'); await canvas.click({ position: { x: 680, y: 400 } }); await page.keyboard.up('Shift');
  await expect(page.locator('#inspector-content')).toContainText('已选择 2 个组件');
  await page.locator('#copy-action').click();
  await expect(page.locator('#object-count')).toHaveText('4 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('2 个组件');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('4 个组件');
});

test('native JSON maps through the domain model and imports components', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#native-export-btn')).toBeEnabled();
  const freshNativeDownloads = [];
  page.on('download', download => freshNativeDownloads.push(download));
  await page.locator('#save-btn').click();
  await expect.poll(() => freshNativeDownloads.length).toBe(2);
  expect((await Promise.all(freshNativeDownloads.map(download => download.suggestedFilename()))).sort()).toEqual(['anymaker-vehicle.data', 'anymaker-vehicle.meta']);
  await page.locator('#library-btn').click();
  await expect(page.locator('#right-sidebar')).toBeVisible();
  await expect(page.locator('#right-tab-resources')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#resources-tab-panel')).toBeVisible();
  const native = {
    definitions: { components: ['engine'] },
    vehicles: { vehicles: [{ id: 9, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] }, nodes: [], edges: [], plates: [], grids: [{ components: [{ def: 0, id: 3, pos: [0, 0, 0] }] }], electric_links: [], mechanical_links: [], liquid_links: [], gas_links: [], belt_links: [], data_links: [] }] },
  };
  const meta = { bounds: { min: [0, 0, 0], max: [1, 1, 1] } };
  await page.locator('#native-input').setInputFiles([
    { name: 'vehicle.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) },
    { name: 'vehicle.meta', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(meta)) },
  ]);
  await expect(page.locator('#object-count')).toHaveText('1 个组件', { timeout: 30000 });
  await expect(page.locator('#native-summary')).toContainText('已导入 vehicle.data / vehicle.meta');
  await expect(page.locator('#native-import-btn')).toHaveCount(0);
  await expect(page.locator('#native-export-btn')).toBeEnabled();
  await page.locator('#left-tab-subgrids').click();
  const subgrid = page.locator('.subgrid-row', { hasText: '主载具 9' });
  await expect(subgrid).toContainText('1 网格 · 1 组件 · 可见');
  await subgrid.getByRole('button', { name: '隐藏' }).click();
  await expect(subgrid.getByRole('button', { name: '取消隐藏' })).toBeVisible();
  let subgridProject = await saveProject(page);
  expect(subgridProject.objects[0].hidden).toBe(true);
  await subgrid.getByRole('button', { name: '取消隐藏' }).click();
  subgridProject = await saveProject(page);
  expect(subgridProject.objects[0].hidden).toBeUndefined();
  const nativeDownloads = [];
  page.on('download', download => nativeDownloads.push(download));
  await page.locator('#save-btn').click();
  await expect.poll(() => nativeDownloads.length).toBe(2);
  expect((await Promise.all(nativeDownloads.map(download => download.suggestedFilename()))).sort()).toEqual(['vehicle.data', 'vehicle.meta']);
  await page.locator('#native-input').setInputFiles({ name: 'other.data', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(native)) });
  await expect(page.locator('#native-export-btn')).toBeEnabled();
  await expect(page.locator('#native-summary')).toContainText('请同时选择一份 .data 和一份 .meta 文件');
});

test('extendable components expose native linear dimensions instead of transform scale', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#language-select').selectOption('en');
  const component = { id: 'shaft', type: 'drive_shaft', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  await page.locator('#file-input').setInputFiles({ name: 'shaft.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [component] })) });
  await expect(page.locator('#object-count')).toHaveText('1 components');
  const canvas = page.locator('canvas'); const bounds = await canvas.boundingBox();
  await canvas.click({ position: { x: bounds.width / 2, y: bounds.height / 2 } });
  await openRightSidebar(page); await page.locator('#right-tab-inspector').click();
  await expect(page.locator('#inspector-content')).toContainText('Linear size');
  const input = page.locator('input[aria-label="Linear size Z"]');
  await expect(input).toHaveValue('0');
  await input.fill('3'); await input.press('Tab');
  await expect(input).toHaveValue('3');
  const document = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  expect(document.objects[0].nativeExtension).toEqual([0, 0, 3]);
});

test('history drawer restores a committed snapshot and viewport reports vehicle size', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await page.locator('canvas').click({ position: { x: 440, y: 420 } });
  await expect(page.locator('#vehicle-size')).toContainText('载具尺寸');
  await expect(page.locator('#vehicle-size')).toContainText('cm');
  await openRightSidebar(page);
  await page.locator('#right-tab-history').click();
  await expect(page.locator('#history-list .history-entry')).toHaveCount(2);
  await page.locator('#history-list .history-entry').nth(1).click();
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await expect(page.locator('#vehicle-size')).toContainText('空载具');
});

test('paint and connection context toolbars expose saved colors, network ports and selection highlighting', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#selection-filter-toolbar')).toBeVisible();
  await expect(page.locator('#selection-filter-toolbar [data-selectable-kind]')).toHaveCount(5);
  await expect(page.locator('#selection-filter-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#selection-filter-options')).toBeHidden();
  await page.locator('#selection-filter-toggle').click();
  await expect(page.locator('#selection-filter-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#selection-filter-options')).toBeVisible();
  await page.locator('#selection-filter-toolbar [data-selectable-kind="edge"]').uncheck();
  await expect(page.locator('#selection-filter-toolbar [data-selectable-kind="edge"]')).not.toBeChecked();
  await page.locator('#selection-filter-toolbar [data-selectable-kind="edge"]').check();
  const connectionVisibilityToggle = page.locator('#connection-visibility-toggle');
  await expect(connectionVisibilityToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#connection-visibility-options')).toBeHidden();
  await connectionVisibilityToggle.click();
  await expect(connectionVisibilityToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#connection-visibility-options [data-connection-kind]')).toHaveCount(6);
  await expect(page.locator('#connection-visibility-options [data-connection-kind]:checked')).toHaveCount(6);
  await page.locator('[data-connection-kind="liquid"]').uncheck();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':settings:v1'))?.connectionVisibility?.liquid)).toBe(false);
  const canvas = page.locator('canvas');
  await page.locator('#component-search').fill('electric_port_straight');
  await page.locator('[data-id="electric_port_straight"]').click();
  await canvas.click({ position: { x: 420, y: 420 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  for (const tool of ['translate', 'rotate', 'scale', 'hide']) {
    await page.locator(`[data-tool="${tool}"]`).click();
    await canvas.hover({ position: { x: 420, y: 420 } });
    await expect.poll(() => page.locator('#viewport').getAttribute('data-interaction-highlight-count').then(Number)).toBeGreaterThanOrEqual(1);
  }

  await page.locator('[data-tool="paint"]').click();
  await expect(page.locator('#paint-toolbar')).toBeVisible();
  await canvas.hover({ position: { x: 420, y: 420 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await page.locator('#paint-toolbar-hex').fill('#7c3aed');
  await page.locator('#paint-toolbar-hex').press('Tab');
  await page.locator('#save-paint-quick-color').click();
  await expect(page.locator('#paint-quick-colors')).toContainText('#7c3aed');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':settings:v1'))?.paintQuickColors?.includes('#7c3aed') ?? false)).toBe(true);
  await page.locator('#paint-quick-colors .quick-color-item', { hasText: '#7c3aed' }).locator('.quick-color-remove').click();
  await expect(page.locator('#paint-quick-colors')).not.toContainText('#7c3aed');

  await page.locator('[data-tool="connect"]').click();
  await expect(page.locator('#connection-toolbar')).toBeVisible();
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-count', '1');
  await page.locator('#connection-kind-buttons [data-kind="liquid"]').click();
  await expect(page.locator('#connection-kind-buttons [data-kind="liquid"]')).toHaveClass(/active/);
  await expect(page.locator('#viewport')).toHaveAttribute('data-connection-port-count', '0');

  await page.reload();
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-tool="paint"]').click();
  await expect(page.locator('#paint-quick-colors')).not.toContainText('#7c3aed');
});

test('registered reference vehicle imports every component and structural record', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('#native-input').setInputFiles([
    'test-vehicle/vehicle.data',
    'test-vehicle/vehicle.meta',
  ]);
  await expect(page.locator('#object-count')).toHaveText('159 个组件', { timeout: 60000 });
  await expect(page.locator('#topology-count')).toHaveText('271 节点 · 493 梁 · 138 面板 · 73 连接');
  await expect(page.locator('#native-reference-preview-btn')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#orientation-indicator')).toBeVisible();
  await expect(page.locator('.top-tool-section')).toBeVisible();
  // Read the committed scene snapshot after import; counts alone cannot catch
  // surface-grid handles floating outside the doors.
  const imported = await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    return JSON.parse(localStorage.getItem('anymaker:' + location.pathname + ':autosave:v1')).document;
  });
  const evidence = JSON.parse(readFileSync(new URL('../../doc/evidence/native-grid-transform.json', import.meta.url)));
  // Import recenters the whole assembly at the editor origin. Compare to the
  // main vehicle's hinge pin so the rendering bounds do not affect this check.
  const hinge = imported.objects.find(object => object.id === '553:grid-553-1:113');
  const hingePosition = [6.8, 1.6, 19.6];
  for (const expected of evidence.referenceComponents) {
    const handle = imported.objects.find(object => object.id === expected.id);
    expect(handle.type).toBe('mechanical_handle');
    for (const [index, axis] of ['x', 'y', 'z'].entries()) expect(handle.position[axis] - hinge.position[axis]).toBeCloseTo(expected.worldPosition[index] - hingePosition[index], 10);
  }
  await page.locator('canvas').screenshot({ path: 'test-results/reference-vehicle-import.png' });
  await page.locator('#library-btn').click();
  await page.locator('#native-reference-preview-btn').click();
  await page.locator('canvas').screenshot({ path: 'test-results/reference-vehicle-door-handles.png' });
});

test('editor history atomically restores interleaved component and topology actions', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#new-btn').click();
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
});

test('topology tools create nodes and an edge in the viewport', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await openRightSidebar(page);
  await page.locator('#edge-lengths-visible').check();
  await expect(page.locator('.edge-length-label')).toHaveCount(1);
  await expect(page.locator('.edge-length-label')).toBeVisible();
  await expect(page.locator('.edge-length-label')).toContainText('X');
  await page.locator('#edge-lengths-visible').uncheck();
  await expect(page.locator('#edge-length-labels')).toBeHidden();
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
});

test('hide tool persists component and edge visibility and restores all hidden objects', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 620, y: 450 } });
  await page.locator('[data-tool="hide"]').click();
  await canvas.click({ position: { x: 560, y: 450 } });
  await expect(page.locator('#restore-transparency')).toBeVisible();
  let saved = await saveProject(page);
  expect(saved.topology.edges[0].hidden).toBe(true);
  await page.locator('#restore-transparency').click();
  await expect(page.locator('#restore-transparency')).toBeHidden();
  saved = await saveProject(page);
  expect(saved.topology.edges[0].hidden).toBeUndefined();

  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 740, y: 540 } });
  await expect(page.locator('#object-count')).toHaveText('1 个组件');
  await page.locator('[data-tool="hide"]').click();
  await expect(page.locator('[data-tool="hide"]')).toHaveClass(/active/);
  await canvas.click({ position: { x: 740, y: 540 } });
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBe(true);
  await expect(page.locator('#restore-transparency')).toBeVisible();
  await page.locator('#restore-transparency').click();
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBeUndefined();
});

test('hide toolbar saves the current hidden objects as a visibility group and reapplies it', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('#mesh-input').setInputFiles({ name: 'engine_block_a_0_0_0.mesh', mimeType: 'application/octet-stream', buffer: meshFixture() });
  await page.locator('#component-search').fill('engine');
  await page.locator('[data-id="engine"]').click();
  await canvas.click({ position: { x: 560, y: 420 } });
  await page.locator('[data-tool="hide"]').click();
  await canvas.click({ position: { x: 560, y: 420 } });
  await expect(page.locator('#restore-transparency')).toBeVisible();
  await expect(page.locator('#transparency-toolbar')).toBeVisible();
  await page.locator('#transparency-group-name').fill('engine group');
  await page.locator('#save-transparency-group').click();
  await expect(page.locator('#transparency-groups')).toContainText('engine group');
  let saved = await saveProject(page);
  expect(saved.visibilityGroups).toHaveLength(1);
  expect(saved.objects[0].hidden).toBe(true);
  const groupToggle = page.locator('#transparency-groups .transparency-group-toggle');
  await expect(groupToggle).toHaveAttribute('aria-pressed', 'true');
  await groupToggle.click();
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBeUndefined();
  await groupToggle.click();
  saved = await saveProject(page);
  expect(saved.objects[0].hidden).toBe(true);
});

test('node tool hides IDs, toggles helpers and merges without orphaned data', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="node"]').click();
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 680, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await expect(page.locator('#node-labels')).toHaveCount(0);
  await page.locator('#nodes-btn').click();
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#nodes-btn').click();
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'true');
  await canvas.click({ position: { x: 500, y: 450 } });
  await canvas.click({ position: { x: 680, y: 450 } });
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
  const saved = await saveProject(page);
  expect(Object.keys(saved.topology.nodes[0]).sort()).toEqual(['id', 'position']);
  await canvas.click({ position: { x: 680, y: 450 } });
  await page.keyboard.press('Delete');
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('1 节点 · 0 梁 · 0 面板');
});

async function saveProject(page) {
  const download = page.waitForEvent('download');
  await page.locator('#project-save-btn').evaluate(element => element.click());
  const stream = await (await download).createReadStream(); let content = '';
  for await (const chunk of stream) content += chunk;
  return JSON.parse(content);
}

test('catalog uses compact square cards and category icons with accessible labels', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toHaveText('332 / 598');
  const cards = page.locator('#component-list .component');
  await expect(cards.locator('svg.category-icon')).toHaveCount(332);
  expect(await cards.evaluateAll(elements => elements.every(element => !['building', 'furniture'].includes(element.dataset.category)))).toBe(true);
  await expect(page.locator('#use-model-thumbnails')).not.toBeChecked();
  await page.locator('#use-model-thumbnails').check();
  await expect.poll(() => cards.locator('img.component-thumbnail').count()).toBeGreaterThan(0, { timeout: 30000 });
  await page.locator('#use-model-thumbnails').uncheck();
  await expect(cards.locator('svg.category-icon')).toHaveCount(332);
  await page.locator('#show-building-furniture').check();
  await expect(page.locator('#catalog-count')).toHaveText('598 / 598');
  await expect(cards.locator('svg.category-icon')).toHaveCount(598);
  const first = await cards.nth(0).boundingBox(); const second = await cards.nth(1).boundingBox();
  const firstId = await cards.nth(0).getAttribute('data-id');
  expect(firstId).toBeTruthy();
  await cards.nth(0).hover();
  await expect(page.locator('#component-id-tooltip')).toHaveText(firstId);
  await expect(page.locator('#component-model-preview')).toBeVisible({ timeout: 30000 });
  await page.mouse.move(1100, 900);
  await expect(page.locator('#component-model-preview')).toBeHidden();
  expect(Math.abs(first.width - first.height)).toBeLessThan(1);
  expect(first.width).toBeLessThan(95); expect(second.y).toBe(first.y); expect(second.x).toBeGreaterThan(first.x);
  await page.locator('#category-filter').selectOption('wheel');
  expect(await cards.count()).toBeGreaterThan(0);
  expect(await cards.evaluateAll(elements => elements.every(element => element.dataset.category === 'wheel'))).toBe(true);
  const wheelIcon = await cards.first().locator('path').getAttribute('d');
  await page.locator('#category-filter').selectOption('engine');
  expect(await cards.first().locator('path').getAttribute('d')).not.toBe(wheelIcon);
  await page.locator('#component-search').fill('engine');
  const engine = page.locator('[data-id="engine"]');
  await expect(engine).toHaveAttribute('title', /engine/);
  await expect(engine.locator('.component-id')).toHaveText('engine');
  await engine.click(); await expect(page.locator('[data-id="engine"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#component-search').fill('no-such-component-xyz');
  await expect(page.locator('.catalog-empty')).toContainText('没有匹配组件');
});

test('camera-plane edge creation previews, cancels and commits both endpoints atomically', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('332 / 598');
  const canvas = page.locator('canvas');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.hover({ position: { x: 740, y: 330 } });
  await expect(page.locator('#build-status')).toContainText('整格端点');
  await expect(page.locator('#edge-ruler')).toBeVisible();
  await expect(page.locator('#edge-ruler output')).toHaveCount(3);
  await expect(page.locator('#edge-ruler-mode')).toHaveText('自由建梁');
  const dimensions = await page.locator('#edge-ruler output').evaluateAll(elements => elements.map(e => Number(e.dataset.cells)));
  expect(dimensions.filter(cells => cells > 0).length).toBeGreaterThan(1);
  expect(dimensions.every(Number.isInteger)).toBe(true);
  await expect(page.locator('#undo-btn')).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(page.locator('#build-status')).toBeHidden();
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 450, y: 400 } });
  await canvas.click({ position: { x: 740, y: 330 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await expect(page.locator('#object-count')).toHaveText('0 个组件');
  const built = await saveProject(page);
  expect(built.topology.nodes.some(node => Math.abs(node.position.y) > .01)).toBe(true);
  await page.locator('#nodes-btn').click();
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  expect(await saveProject(page)).toEqual(built);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  await page.locator('#redo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await expect(page.locator('#nodes-btn')).toHaveAttribute('aria-pressed', 'false');
  await canvas.click({ position: { x: 740, y: 330 } });
  await canvas.click({ position: { x: 850, y: 520 } });
  await expect(page.locator('#topology-count')).toHaveText('3 节点 · 2 梁 · 0 面板');
  await page.locator('#fit-btn').click();
  await page.screenshot({ path: 'test-results/edge-builder.png' });
  await page.locator('#file-input').setInputFiles({ name: 'old.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ format: 'anymaker-web-project', version: 1, objects: [] })) });
  await expect(page.locator('#topology-count')).toHaveText('0 节点 · 0 梁 · 0 面板');
  expect(errors).toEqual([]);
});

test('front-view solid edges are pickable off the centerline and split with hidden nodes', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('#nodes-btn').click();
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.click({ position: { x: 770, y: 420 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  const built = await saveProject(page);
  for (const node of built.topology.nodes) expect(node.position.z).toBeCloseTo(0, 5);
  await page.locator('[data-tool="erase"]').click();
  await canvas.click({ position: { x: 600, y: 425 } });
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 0 梁 · 0 面板');
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('2 节点 · 1 梁 · 0 面板');
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 600, y: 420 }, modifiers: ['Alt'] });
  await expect(page.locator('#topology-count')).toHaveText('3 节点 · 2 梁 · 0 面板');
  const split = await saveProject(page);
  for (const node of split.topology.nodes) {
    expect(node.position.y).toBeCloseTo(built.topology.nodes[0].position.y, 5);
    expect(node.position.z).toBeCloseTo(0, 5);
  }
});

test('glass tool closes selected edges into an offset window panel and paint stores Hex RGB colors', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  const canvas = page.locator('canvas');
  const corners = [[430, 560], [730, 560], [730, 280], [430, 280]];
  await page.locator('[data-tool="edge"]').click();
  for (let index = 0; index < corners.length; index++) {
    await canvas.click({ position: { x: corners[index][0], y: corners[index][1] } });
    const next = corners[(index + 1) % corners.length];
    await canvas.click({ position: { x: next[0], y: next[1] } });
  }
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 0 面板');
  await page.locator('[data-tool="paint"]').click();
  await canvas.hover({ position: { x: 580, y: 560 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '1');
  await canvas.click({ position: { x: 580, y: 560 } });
  let saved = await saveProject(page);
  expect(saved.topology.edges.some(edge => edge.color === '#bd2636')).toBe(true);
  await page.locator('[data-tool="glass"]').click();
  await canvas.click({ position: { x: 580, y: 560 } });
  await expect.poll(() => page.locator('#viewport').getAttribute('data-edge-center-highlight-count').then(Number)).toBeGreaterThanOrEqual(1);
  for (const [x, y] of [[730, 420], [580, 280], [430, 420]]) await canvas.click({ position: { x, y } });
  await expect(page.locator('#topology-count')).toHaveText('4 节点 · 4 梁 · 1 面板');
  saved = await saveProject(page);
  expect(saved.topology.plates[0].normalOffset).toBeCloseTo(.04, 8);
  expect(saved.topology.plates[0].type).toBe('window');
  await openRightSidebar(page);
  await page.locator('[data-tool="paint"]').click();
  await canvas.hover({ position: { x: 580, y: 560 } });
  // The finished panel covers the boundary beam and has paint priority.
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '0');
  await expect(page.locator('#viewport')).toHaveAttribute('data-plate-boundary-highlight-count', '1');
  await canvas.click({ position: { x: 580, y: 560 } });
  saved = await saveProject(page);
  expect(saved.topology.plates.some(plate => plate.color_front === '#bd2636')).toBe(true);
  await canvas.hover({ position: { x: 560, y: 400 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await expect(page.locator('#viewport')).toHaveAttribute('data-edge-center-highlight-count', '0');
  await expect(page.locator('#viewport')).toHaveAttribute('data-plate-boundary-highlight-count', '1');
  await canvas.click({ position: { x: 560, y: 400 } });
  saved = await saveProject(page);
  expect(saved.topology.plates[0].color_front).toBe('#bd2636');
  await page.locator('#paint-toolbar-hex').fill('#7c3aed');
  await page.locator('#paint-toolbar-hex').press('Tab');
  await canvas.click({ position: { x: 560, y: 400 } });
  await expect(page.locator('#pick-paint-color')).toBeVisible();
  await page.locator('#pick-paint-color').click();
  await expect(page.locator('#pick-paint-color')).toHaveAttribute('aria-pressed', 'true');
  await canvas.click({ position: { x: 560, y: 400 } });
  await expect(page.locator('#paint-toolbar-hex')).toHaveValue('#7c3aed');
  await expect(page.locator('#paint-color-hex')).toHaveValue('#7c3aed');
  await expect(page.locator('#pick-paint-color')).toHaveAttribute('aria-pressed', 'false');

  await page.locator('[data-tool="select"]').click();
  await canvas.hover({ position: { x: 560, y: 400 } });
  await expect(page.locator('#viewport')).toHaveAttribute('data-interaction-highlight-count', '1');
  await canvas.click({ position: { x: 560, y: 400 } });
  await expect(page.locator('#inspector-content')).toContainText('已选择 1 个结构对象');
  // Click the exposed outer half of the supporting beam; the panel now
  // intentionally covers the centreline and wins overlapping paint hits.
  await page.keyboard.down('Shift'); await canvas.click({ position: { x: 580, y: 575 } }); await page.keyboard.up('Shift');
  await expect(page.locator('#inspector-content')).toContainText('已选择 2 个结构对象');
  await expect.poll(() => page.locator('#viewport').getAttribute('data-interaction-highlight-count').then(Number)).toBeGreaterThanOrEqual(2);
});

test('XYZ rulers follow axis snapping, language, cancellation and committed endpoints', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-view="front"]').click();
  await page.locator('[data-tool="edge"]').click();
  const canvas = page.locator('canvas'); const ruler = page.locator('#edge-ruler');
  await canvas.click({ position: { x: 430, y: 420 } });
  await canvas.hover({ position: { x: 750, y: 340 } });
  await expect(ruler).toBeVisible();
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'true');
  await expect(ruler).toHaveAttribute('data-axis', 'x');
  await expect(page.locator('#edge-ruler-mode')).toHaveText('吸附 X 轴');
  const dimensions = await ruler.locator('output').evaluateAll(elements => elements.map(e => Number(e.dataset.cells)));
  expect(dimensions[0]).toBeGreaterThan(0); expect(dimensions.slice(1)).toEqual([0, 0]); expect(dimensions.every(Number.isInteger)).toBe(true);
  await canvas.hover({ position: { x: 440, y: 240 } });
  await expect(ruler).toHaveAttribute('data-axis', 'y');
  await canvas.hover({ position: { x: 750, y: 340 } });
  await page.screenshot({ path: 'test-results/edge-axis-ruler.png' });
  await page.locator('#language-select').selectOption('en');
  await canvas.hover({ position: { x: 750, y: 340 } });
  await expect(page.locator('#edge-ruler-mode')).toHaveText('Snap to X axis');
  await expect(ruler.locator('output').first()).toContainText('cells');
  await canvas.click({ position: { x: 750, y: 340 } });
  await expect(ruler).toBeHidden();
  const built = await saveProject(page);
  const [a, b] = built.topology.nodes.map(node => node.position);
  expect(b.y).toBe(a.y); expect(b.z).toBe(a.z); expect(Math.abs(b.x - a.x) / .08).toBe(dimensions[0]);
  expect(Object.keys(built).sort()).toEqual(['format', 'objects', 'topology', 'version']);
  await page.locator('#undo-btn').click();
  await expect(page.locator('#topology-count')).toHaveText('0 nodes · 0 edges · 0 plates');
  await page.locator('#redo-btn').click();
  expect(await saveProject(page)).toEqual(built);
  await canvas.click({ position: { x: 600, y: 500 } });
  await canvas.hover({ position: { x: 730, y: 380 } });
  await page.keyboard.press('a');
  await expect(ruler).toHaveAttribute('data-axis', '');
  await page.locator('#component-search').focus(); await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
  await canvas.hover({ position: { x: 730, y: 380 } });
  await page.locator('#viewport').focus(); await page.keyboard.press('Escape');
  await expect(ruler).toBeHidden();
  expect(await saveProject(page)).toEqual(built);
  await page.locator('[data-tool="edge"]').click();
  await canvas.click({ position: { x: 600, y: 500 } });
  await page.locator('[data-tool="select"]').click();
  await expect(ruler).toBeHidden();
  expect(await saveProject(page)).toEqual(built);
  expect(errors).toEqual([]);
});

test('A toggles axis snapping from the viewport before edge creation', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#viewport').focus();
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('a');
  await expect(page.locator('#axis-snap-btn')).toHaveAttribute('aria-pressed', 'false');
});

test('Shift temporarily enables axis snapping while using the edge tool', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await page.locator('[data-tool="edge"]').click();
  const snapButton = page.locator('#axis-snap-btn');
  await expect(snapButton).toContainText('Shift');
  await expect(snapButton).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.down('Shift');
  await expect(snapButton).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.up('Shift');
  await expect(snapButton).toHaveAttribute('aria-pressed', 'false');
});

test('sidebars resize, collapse with scoped Tab shortcut, and keep editor controls on the right', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#viewport')).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('#catalog-count')).toContainText('332 / 598');
  await expect(page.locator('#left-sidebar')).toBeVisible();
  await expect(page.locator('#right-sidebar')).toBeHidden();
  await expect(page.locator('#left-tab-catalog')).toHaveAttribute('aria-selected', 'true');
  const catalogBounds = await page.locator('#catalog-panel').boundingBox(); const sidebarBounds = await page.locator('#left-sidebar').boundingBox();
  expect(catalogBounds.height).toBeLessThan(sidebarBounds.height);
  await expect.poll(() => page.locator('#component-list').evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  expect((await page.locator('#component-list').boundingBox()).height).toBeGreaterThan(sidebarBounds.height * .6);
  expect(await page.locator('#component-list').evaluate(element => { element.scrollTop = 120; return element.scrollTop > 0 && getComputedStyle(element).overflowY === 'scroll'; })).toBe(true);
  expect(await page.locator('#grid-settings').evaluate(element => element.closest('#right-sidebar')?.id)).toBe('right-sidebar');
  expect(await page.locator('#inspector-content').evaluate(element => element.closest('#right-sidebar')?.id)).toBe('right-sidebar');

  const left = page.locator('#left-sidebar'); const resizer = page.locator('#left-sidebar-resizer');
  const before = await left.boundingBox(); const separator = await resizer.boundingBox();
  await page.mouse.move(separator.x + separator.width / 2, separator.y + 80);
  await page.mouse.down(); await page.mouse.move(separator.x + 108, separator.y + 80); await page.mouse.up();
  const widened = await left.boundingBox();
  expect(widened.width).toBeGreaterThan(before.width + 80); expect(widened.width).toBeLessThanOrEqual(720);
  await resizer.focus(); await page.keyboard.press('ArrowLeft');
  expect((await left.boundingBox()).width).toBeLessThan(widened.width);

  await page.locator('#left-sidebar-toggle').click();
  await expect(left).toBeHidden(); await expect(resizer).toBeHidden();
  await expect(page.locator('#left-sidebar-toggle')).toHaveAttribute('aria-expanded', 'false');
  await page.locator('#viewport').focus(); await page.keyboard.press('Tab');
  await expect(left).toBeVisible(); await expect(page.locator('#left-sidebar-toggle')).toBeFocused();
  await expect(page.locator('#left-sidebar-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#component-search').focus(); await page.keyboard.press('Tab');
  await expect(page.locator('#category-filter')).toBeFocused();
  await expect(page.locator('#left-sidebar-toggle')).toHaveAttribute('aria-expanded', 'true');

  await openRightSidebar(page);
  await expect(page.locator('#right-sidebar-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#right-tab-editor')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#grid-settings')).toContainText(/1 (格|cell) = 8 cm/); await expect(page.locator('#grid-btn')).toBeVisible();
  const right = page.locator('#right-sidebar'); const rightResizer = page.locator('#right-sidebar-resizer');
  await expect(rightResizer).toBeVisible();
  const rightBefore = await right.boundingBox(); const rightSeparator = await rightResizer.boundingBox();
  await page.mouse.move(rightSeparator.x + rightSeparator.width / 2, rightSeparator.y + 80);
  await page.mouse.down(); await page.mouse.move(rightSeparator.x - 108, rightSeparator.y + 80); await page.mouse.up();
  const rightWidened = await right.boundingBox();
  expect(rightWidened.width).toBeGreaterThan(rightBefore.width + 80); expect(rightWidened.width).toBeLessThanOrEqual(720);
  await rightResizer.focus(); await page.keyboard.press('ArrowRight');
  expect((await right.boundingBox()).width).toBeLessThan(rightWidened.width);
  await page.locator('#right-sidebar-toggle').click();
  await expect(page.locator('#right-sidebar')).toBeHidden(); await expect(rightResizer).toBeHidden();
});
