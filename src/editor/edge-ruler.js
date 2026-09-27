import * as THREE from 'three';
import { edgeMeasurements } from './construction-view.js';
import { CELL_SIZE_CM, formatCells } from './grid.js';
import { applyTranslations, setText, getLocale } from '../i18n.js';

const colors = { x: '#c94747', y: '#278452', z: '#326bc5' };
const svgNS = 'http://www.w3.org/2000/svg';
const formatCm = cells => String(Math.abs(cells) * CELL_SIZE_CM);

export function createEdgeRuler(viewport, camera) {
  const getCamera = typeof camera === 'function' ? camera : () => camera;
  const root = document.createElement('div'); root.id = 'edge-ruler'; root.hidden = true;
  const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('aria-hidden', 'true');
  const panel = document.createElement('div'); panel.className = 'edge-measurements';
  const heading = document.createElement('strong'); setText(heading, 'XYZ 长度 · 整数格（1 格 = 8 cm）');
  const mode = document.createElement('span'); mode.id = 'edge-ruler-mode';
  panel.append(heading, mode); root.append(svg, panel); viewport.append(root);
  const entries = Object.entries(colors).map(([axis, color]) => {
    const path = document.createElementNS(svgNS, 'path'); path.classList.add('edge-dimension-line');
    const label = document.createElement('span'); label.className = 'edge-dimension-label'; label.setAttribute('aria-hidden', 'true');
    const output = document.createElement('output'); output.dataset.axis = axis;
    output.setAttribute('aria-live', 'off');
    for (const element of [path, label, output]) element.style.setProperty('--axis-color', color);
    svg.append(path); root.append(label); panel.append(output);
    return { path, label, output };
  });
  let measurements = [];
  let measurementKey = '';
  let projectionKey = '';
  function hide() { root.hidden = true; measurements = []; measurementKey = ''; }
  function project(point, width, height) {
    const p = point.clone().project(getCamera());
    if (p.z < -1 || p.z > 1 || ![p.x, p.y, p.z].every(Number.isFinite)) return null;
    return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2 };
  }
  function update() {
    if (root.hidden) return;
    const width = viewport.clientWidth; const height = viewport.clientHeight;
    const key = projectionStamp(getCamera(), width, height) + measurementKey;
    if (key === projectionKey) return;
    projectionKey = key;
    measurements.forEach((measurement, index) => {
      const { path, label } = entries[index];
      const a = project(measurement.from, width, height); const b = project(measurement.to, width, height);
      const visible = a && b && measurement.length > 1e-6 && Math.hypot(b.x - a.x, b.y - a.y) > 8;
      label.hidden = !visible; path.style.display = visible ? '' : 'none';
      if (!visible) return;
      const length = Math.hypot(b.x - a.x, b.y - a.y);
      const dx = -(b.y - a.y) / length * 4; const dy = (b.x - a.x) / length * 4;
      path.setAttribute('d', `M${a.x},${a.y} L${b.x},${b.y} M${a.x - dx},${a.y - dy} L${a.x + dx},${a.y + dy} M${b.x - dx},${b.y - dy} L${b.x + dx},${b.y + dy}`);
      const x = Math.max(4, Math.min(width - label.offsetWidth - 4, (a.x + b.x) / 2 + dx * 2));
      const y = Math.max(4, Math.min(height - label.offsetHeight - 4, (a.y + b.y) / 2 + dy * 2));
      label.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  return {
    show(start, end, axis = null) {
      const key = [start.x, start.y, start.z, end.x, end.y, end.z, axis, getLocale()].join(',');
      if (key === measurementKey && !root.hidden) return;
      measurementKey = key; projectionKey = '';
      measurements = edgeMeasurements(start, end);
      if (!measurements.length) { hide(); return; }
      root.hidden = false; root.dataset.axis = axis || '';
      setText(mode, axis ? '吸附 {axis} 轴' : '自由建梁', { axis: axis?.toUpperCase() });
      measurements.forEach((measurement, index) => {
        const { label, output } = entries[index];
        const params = { axis: measurement.axis.toUpperCase(), cells: formatCells(measurement.cells), centimeters: formatCm(measurement.cells) };
        setText(output, '{axis} {cells} 格（{centimeters} cm）', params);
        output.dataset.cells = String(measurement.cells);
        setText(label, '{axis} {cells} 格', params);
      });
      update();
    },
    update,
    hide,
    relabel() { applyTranslations(root); },
    dispose() { hide(); root.remove(); },
  };
}

function projectionStamp(camera, width, height) {
  return [...camera.position.toArray(), ...camera.quaternion.toArray(), ...camera.projectionMatrix.elements, width, height].join(',');
}

export function createEdgeLengthLabels(viewport, camera) {
  const getCamera = typeof camera === 'function' ? camera : () => camera;
  const root = document.createElement('div'); root.id = 'edge-length-labels'; root.hidden = true;
  viewport.append(root);
  let entries = new Map();
  let pending = null;
  let projectionKey = '';
  const projected = new THREE.Vector3();
  function update() {
    if (root.hidden) return;
    if (pending) {
      const { nodes, edges } = pending; pending = null;
      const byId = new Map(nodes.map(node => [node.id, node.position]));
      const next = new Map();
      for (const edge of edges) {
        const a = byId.get(edge.a); const b = byId.get(edge.b);
        if (!a || !b || edge.hidden) continue;
        const key = [a.x, a.y, a.z, b.x, b.y, b.z].join(',');
        const previous = entries.get(edge.id);
        if (previous?.key === key) { next.set(edge.id, previous); continue; }
        const measurements = edgeMeasurements(a, b);
        if (!measurements.length) continue;
        const label = previous?.label || document.createElement('output'); label.className = 'edge-length-label';
        label.textContent = measurements.map(({ axis, cells }) => axis.toUpperCase() + ' ' + formatCells(cells)).join(' · ');
        label.title = measurements.map(({ axis, cells }) => axis.toUpperCase() + ' ' + formatCells(cells) + ' blocks / ' + formatCm(cells) + ' cm').join(' · ');
        if (!previous) root.append(label);
        next.set(edge.id, { label, key, midpoint: new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z).multiplyScalar(.5) });
      }
      for (const [id, entry] of entries) if (!next.has(id)) entry.label.remove();
      entries = next; projectionKey = '';
    }
    const width = viewport.clientWidth; const height = viewport.clientHeight;
    const activeCamera = getCamera();
    const key = projectionStamp(activeCamera, width, height);
    if (key === projectionKey) return;
    projectionKey = key;
    for (const { label, midpoint } of entries.values()) {
      projected.copy(midpoint).project(activeCamera);
      const visible = projected.z >= -1 && projected.z <= 1 && Math.abs(projected.x) <= 1 && Math.abs(projected.y) <= 1;
      label.hidden = !visible;
      if (visible) label.style.transform = 'translate(' + ((projected.x + 1) * width / 2) + 'px, ' + ((1 - projected.y) * height / 2) + 'px) translate(-50%, -50%)';
    }
  }
  return {
    setEdges(nodes, edges) { pending = { nodes, edges }; update(); },
    setVisible(value) { root.hidden = !value; if (value) update(); },
    update,
    dispose() { entries.clear(); pending = null; root.remove(); },
  };
}
