import * as THREE from 'three';
import { isCurvedPlate, splitCurvedPlate, surfaceSplitRegions } from './surface-split.js';
import { missingPlateBoundaries } from './plate-boundary-coverage.js';
import { plateSurfaceVertices } from './construction-view.js';
import { mergeTwoPlaneSurface, nativeSurfacePreviewVertices } from './two-plane-surface.js';
import { t, applyTranslations } from '../i18n.js';

const SPLIT_SUMMARY = '{cuts} 条分割线 · {plates} 个面片 · 不新增梁';

export function createSurfaceSplitTool({ host, scene, canvas, getCamera, getTopology, getPlateVisual, commit, status }) {
  const panel = document.createElement('section');
  panel.id = 'surface-split-toolbar'; panel.className = 'context-toolbar surface-split-toolbar'; panel.hidden = true;
  panel.innerHTML = '<strong data-i18n="曲面分片"></strong><span class="context-help" data-i18n="点击曲面，再依次点击两个边界节点连接；右键旋转查看。"></span><label><span data-i18n="起点"></span><select id="surface-split-from"></select></label><label><span data-i18n="终点"></span><select id="surface-split-to"></select></label><button id="surface-split-add" data-i18n="连接节点"></button><button id="surface-split-back" data-i18n="撤回分割线"></button><button id="surface-split-apply" data-i18n="应用分片"></button><button id="surface-split-cancel" data-i18n="取消"></button><span id="surface-split-summary" role="status"></span><span class="context-help" data-surface-help></span><span class="context-help" data-window-frame-note></span>';
  host.append(panel); applyTranslations(panel);
  const modeLabel = document.createElement('label');
  modeLabel.innerHTML = '<span data-i18n="生成方式"></span><select id="surface-output-mode"><option value="split" data-i18n="独立分片"></option><option value="single" data-i18n="单面（最多双平面）"></option></select>';
  panel.querySelector('#surface-split-apply').before(modeLabel);
  const mode = modeLabel.querySelector('select');
  const pathControls = document.createElement('span');
  pathControls.className = 'surface-path-controls';
  pathControls.innerHTML = '<label><span data-i18n="途经节点"></span><select id="surface-split-via"></select></label><button id="surface-split-via-add" data-i18n="添加途经点"></button><button id="surface-split-via-clear" data-i18n="清空途经点"></button><span id="surface-split-path" role="status"></span>';
  panel.querySelector('#surface-split-add').before(pathControls);
  const via = panel.querySelector('#surface-split-via');
  const viaAdd = panel.querySelector('#surface-split-via-add');
  const viaClear = panel.querySelector('#surface-split-via-clear');
  const loadNote = document.createElement('span'); loadNote.dataset.surfaceLoadNote = ''; loadNote.className = 'context-help'; panel.append(loadNote);
  const from = panel.querySelector('#surface-split-from'); const to = panel.querySelector('#surface-split-to');
  const add = panel.querySelector('#surface-split-add'); const back = panel.querySelector('#surface-split-back');
  const apply = panel.querySelector('#surface-split-apply'); const summary = panel.querySelector('#surface-split-summary');
  const overlay = new THREE.Group(); overlay.name = 'surface-split-preview'; scene.add(overlay);
  let active = false; let source = null; let plate = null; let cuts = []; let first = null; let waypoints = [];
  let mergeIds = null;
  const availableNodes = () => source.nodes.filter(node => !node.hidden && (!plate.gridId || !node.gridId || node.gridId === plate.gridId));
  let originalVisuals = [];
  const restoreOriginals = () => { for (const [visual, visible] of originalVisuals) visual.visible = visible; };
  const clearOverlay = () => {
    for (const object of [...overlay.children]) { overlay.remove(object); object.geometry.dispose(); object.material.dispose(); }
  };
  const close = () => {
    restoreOriginals(); originalVisuals = [];
    active = false; source = null; plate = null; cuts = []; first = null; waypoints = [];
    panel.hidden = true; clearOverlay(); from.replaceChildren(); to.replaceChildren(); via.replaceChildren();
    mergeIds = null;
  };
  const line = (a, b, color) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
    const object = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, depthTest: false, depthWrite: false }));
    object.renderOrder = 100; overlay.add(object);
  };
  const draw = () => {
    apply.dataset.i18n = mode.value === 'single' ? '应用单面' : '应用分片';
    panel.querySelector('strong').dataset.i18n = mode.value === 'single' ? '双平面单面' : '曲面分片';
    clearOverlay(); applyTranslations(panel);
    panel.querySelector('[data-surface-help]').textContent = t(mode.value === 'single' ? '连接折线两端，再以一个原生面生成双平面曲面；外边界必须已有梁，可撤销。' : '应用后生成共享边界的面片，保留已有梁，可撤销。');
    const frameNote = panel.querySelector('[data-window-frame-note]');
    frameNote.hidden = plate?.type !== 'window';
    frameNote.textContent = t(mode.value === 'single' ? '预览为游戏内缩后的玻璃及外框；折角和外框保留，实机效果待验证。' : '游戏会为每个窗面生成窗框；分片仍有框线，预览未显示窗框。');
    for (const control of [from.parentElement, to.parentElement, pathControls, add, back]) control.hidden = !!mergeIds;
    mode.disabled = !!mergeIds;
    add.disabled = !plate; back.disabled = !cuts.length; apply.disabled = !cuts.length;
    from.disabled = !plate; to.disabled = !plate;
    via.disabled = !plate; viaAdd.disabled = !plate; viaClear.disabled = !waypoints.length;
    panel.querySelector('#surface-split-path').textContent = waypoints.length ? waypoints.join(' → ') : t('可选已有空间节点作为途经点，按起点→途经点→终点连接');
    loadNote.textContent = '';
    if (!plate) { summary.textContent = t('请选择曲面或已开启规避限制的面板或窗'); return; }
    restoreOriginals();
    const positions = new Map(source.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
    for (const { id } of availableNodes()) {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(.045, 10, 8), new THREE.MeshBasicMaterial({ color: id === first ? 0xffaa00 : 0x218bff, depthTest: false, depthWrite: false }));
      marker.position.copy(positions.get(id)); marker.renderOrder = 101; marker.userData.surfaceNodeId = id; overlay.add(marker);
    }
    if (!mergeIds) plate.nodeIds.forEach((id, i) => line(positions.get(id), positions.get(plate.nodeIds[(i + 1) % plate.nodeIds.length]), 0x218bff));
    for (const path of cuts) for (let i = 0; i < path.length - 1; i++) line(positions.get(path[i]), positions.get(path[i + 1]), 0xffaa00);
    if (cuts.length || mode.value === 'single') {
      let result;
      try {
        result = cuts.length ? splitCurvedPlate(source, plate.id, cuts) : { topology: source, plateIds: mergeIds || [plate.id] };
        if (mode.value === 'single') result = mergeTwoPlaneSurface(result.topology, result.plateIds);
      }
      catch (error) {
        apply.disabled = true;
        restoreOriginals();
        summary.textContent = t('请继续连接节点，将复杂区域分成可构建的面片') + ' · ' + t(error.message);
        return;
      }
      apply.disabled = false;
      for (const [visual] of originalVisuals) visual.visible = false;
      if (result.prediction) {
        if (mergeIds) {
          const boundary = result.topology.plates.find(value => value.id === result.plateIds[0]).nodeIds;
          boundary.forEach((id, i) => line(positions.get(id), positions.get(boundary[(i + 1) % boundary.length]), 0x218bff));
        }
        const addPreview = (vertices, color, opacity) => {
          const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
          const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity, depthWrite: false }));
          mesh.renderOrder = 90; overlay.add(mesh);
        };
        addPreview(nativeSurfacePreviewVertices(result.prediction), 0x70b5e8, .6);
        if (plate.type === 'window') addPreview(nativeSurfacePreviewVertices(result.prediction, { frame: true }), 0x555555, .9);
        summary.textContent = t('1 个原生面 · {planes} 个平面 · 不新增梁', { planes: result.prediction.geometry.planes.groups.length });
        loadNote.textContent = t('边界梁完整；内部连线仅用于单面的扇形三角，不生成分界梁或内部窗框');
        return;
      }
      for (const piece of result.topology.plates.filter(value => result.plateIds.includes(value.id))) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(plateSurfaceVertices(piece.nodeIds, positions, piece), 3));
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x70b5e8, side: THREE.DoubleSide, transparent: true, opacity: .6, depthWrite: false }));
        mesh.renderOrder = 90; overlay.add(mesh);
      }
      summary.textContent = t(SPLIT_SUMMARY, { cuts: cuts.length, plates: result.plateIds.length });
      const missing = missingPlateBoundaries({ ...result.topology, plates: result.topology.plates.filter(value => result.plateIds.includes(value.id)) });
      if (missing.length) loadNote.textContent = t('当前 {count} 个面片缺少边界梁：可保留编辑，但游戏会丢弃，原生导出将阻止保存', { count: missing.length });
    } else summary.textContent = t('依次连接两侧对应的折点');
  };
  const selectPlate = value => {
    if (!value || (!value.surfaceLimitBypass && !isCurvedPlate(value, source.nodes))) { status('请选择曲面或已开启规避限制的面板或窗'); return; }
    plate = value; cuts = []; first = null;
    const visuals = (mergeIds || [plate.id]).map(getPlateVisual).filter(Boolean);
    originalVisuals = visuals.map(visual => [visual, visual.visible]);
    for (const select of [from, to, via]) {
      select.replaceChildren();
      const ids = [...plate.nodeIds, ...availableNodes().map(node => node.id).filter(id => !plate.nodeIds.includes(id))];
      ids.forEach((id, i) => { const option = document.createElement('option'); option.value = id; option.textContent = `${i + 1} · ${id}`; select.append(option); });
    }
    to.selectedIndex = Math.min(2, plate.nodeIds.length - 1); draw();
  };
  const appendCut = (a, b) => {
    try {
      const nextCuts = [...cuts, [a, ...waypoints, b]];
      surfaceSplitRegions(plate, source.nodes, nextCuts);
      cuts = nextCuts; first = null; waypoints = []; draw();
    } catch (error) { summary.textContent = t(error.message); }
  };
  add.onclick = () => { if (plate) appendCut(from.value, to.value); };
  viaAdd.onclick = () => { if (plate && !waypoints.includes(via.value)) { waypoints.push(via.value); draw(); } };
  viaClear.onclick = () => { waypoints = []; draw(); };
  back.onclick = () => { cuts.pop(); first = null; draw(); };
  mode.onchange = draw;
  panel.querySelector('#surface-split-cancel').onclick = close;
  apply.onclick = () => {
    if (source !== getTopology()) { close(); return; }
    try {
      let result = cuts.length ? splitCurvedPlate(source, plate.id, cuts) : { topology: source, plateIds: mergeIds || [plate.id] };
      if (mode.value === 'single') result = mergeTwoPlaneSurface(result.topology, result.plateIds);
      commit(result.topology, mode.value === 'single' ? '已应用双平面单面' : '已应用曲面分片', result); close();
    }
    catch (error) { summary.textContent = t(error.message); }
  };
  return {
    get active() { return active; }, close,
    refresh() { if (active) { if (source !== getTopology()) close(); else draw(); } },
    begin(plateId = null, outputMode = 'split') {
      close(); source = getTopology(); active = true; panel.hidden = false;
      mode.value = outputMode;
      if (plateId) selectPlate(source.plates.find(value => value.id === plateId)); else draw();
    },
    beginMerge(plateIds) {
      close(); source = getTopology(); active = true; panel.hidden = false; mergeIds = [...plateIds]; mode.value = 'single';
      selectPlate(source.plates.find(value => value.id === plateIds[0]));
    },
    click(event, hit) {
      if (!active) return false;
      if (source !== getTopology()) { close(); return true; }
      if (!plate) { selectPlate(source.plates.find(value => value.id === hit?.object.userData.plateId)); return true; }
      const rect = canvas.getBoundingClientRect(); const camera = getCamera(); let nearest = null; let distance = 20;
      for (const marker of overlay.children.filter(object => object.userData.surfaceNodeId)) {
        const p = marker.position.clone().project(camera);
        if (p.z < -1 || p.z > 1) continue;
        const d = Math.hypot(rect.x + (p.x + 1) * rect.width / 2 - event.clientX, rect.y + (1 - p.y) * rect.height / 2 - event.clientY);
        if (d < distance) { nearest = marker.userData.surfaceNodeId; distance = d; }
      }
      if (nearest) {
        if (!first) { first = nearest; from.value = nearest; draw(); }
        else { to.value = nearest; appendCut(first, nearest); }
      }
      return true;
    },
  };
}
