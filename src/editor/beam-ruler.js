import * as THREE from 'three';
import { beamMeasurements } from './construction-view.js';
import { CELL_SIZE_CM, formatCells } from './grid.js';
import { applyTranslations, setText } from '../i18n.js';

const colors = { x: '#c94747', y: '#278452', z: '#326bc5' };
const svgNS = 'http://www.w3.org/2000/svg';
const formatCm = cells => String(Math.abs(cells) * CELL_SIZE_CM);

export function createBeamRuler(viewport, camera) {
  const getCamera = typeof camera === 'function' ? camera : () => camera;
  const root = document.createElement('div'); root.id = 'beam-ruler'; root.hidden = true;
  const svg = document.createElementNS(svgNS, 'svg'); svg.setAttribute('aria-hidden', 'true');
  const panel = document.createElement('div'); panel.className = 'beam-measurements';
  const heading = document.createElement('strong'); setText(heading, 'XYZ 长度 · 整数格（1 格 = 8 cm）');
  const mode = document.createElement('span'); mode.id = 'beam-ruler-mode';
  panel.append(heading, mode); root.append(svg, panel); viewport.append(root);
  const entries = Object.entries(colors).map(([axis, color]) => {
    const path = document.createElementNS(svgNS, 'path'); path.classList.add('beam-dimension-line');
    const label = document.createElement('span'); label.className = 'beam-dimension-label'; label.setAttribute('aria-hidden', 'true');
    const output = document.createElement('output'); output.dataset.axis = axis;
    output.setAttribute('aria-live', 'off');
    for (const element of [path, label, output]) element.style.setProperty('--axis-color', color);
    svg.append(path); root.append(label); panel.append(output);
    return { path, label, output };
  });
  let measurements = [];
  function hide() { root.hidden = true; measurements = []; }
  function project(point, width, height) {
    const p = point.clone().project(getCamera());
    if (p.z < -1 || p.z > 1 || ![p.x, p.y, p.z].every(Number.isFinite)) return null;
    return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2 };
  }
  function update() {
    if (root.hidden) return;
    const width = viewport.clientWidth; const height = viewport.clientHeight;
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
      measurements = beamMeasurements(start, end);
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

export function createBeamLengthLabels(viewport, camera) {
  const getCamera = typeof camera === 'function' ? camera : () => camera;
  const root = document.createElement('div'); root.id = 'beam-length-labels'; root.hidden = true;
  viewport.append(root);
  let entries = [];
  function project(point) {
    const value = point.clone().project(getCamera());
    if (value.z < -1 || value.z > 1 || ![value.x, value.y, value.z].every(Number.isFinite)) return null;
    return { x: (value.x + 1) * viewport.clientWidth / 2, y: (1 - value.y) * viewport.clientHeight / 2 };
  }
  function update() {
    if (root.hidden) return;
    for (const { label, midpoint } of entries) {
      const point = project(midpoint);
      label.hidden = !point;
      if (point) label.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
    }
  }
  return {
    setBeams(nodes, edges) {
      const byId = new Map(nodes.map(node => [node.id, node.position]));
      root.replaceChildren();
      entries = edges.flatMap(edge => {
        const a = byId.get(edge.a); const b = byId.get(edge.b);
        if (!a || !b) return [];
        const measurements = beamMeasurements(a, b);
        if (!measurements.length) return [];
        const label = document.createElement('output'); label.className = 'beam-length-label';
        label.textContent = measurements.map(({ axis, cells }) => `${axis.toUpperCase()} ${formatCells(cells)}`).join(' · ');
        label.title = measurements.map(({ axis, cells }) => `${axis.toUpperCase()} ${formatCells(cells)} cells / ${formatCm(cells)} cm`).join(' · ');
        root.append(label);
        return [{ label, midpoint: new THREE.Vector3(a.x, a.y, a.z).add(new THREE.Vector3(b.x, b.y, b.z)).multiplyScalar(.5) }];
      });
      update();
    },
    setVisible(value) { root.hidden = !value; if (value) update(); },
    update,
    dispose() { entries = []; root.remove(); },
  };
}
