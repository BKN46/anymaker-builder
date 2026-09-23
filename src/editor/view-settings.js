import * as THREE from 'three';

export const VIEW_DIRECTIONS = {
  right: [1, 0, 0], left: [-1, 0, 0], top: [0, 1, .00001], bottom: [0, -1, .00001], front: [0, 0, 1], back: [0, 0, -1], iso: [1, .8, 1],
};

export function orientCamera(camera, controls, view) {
  if (!Object.hasOwn(VIEW_DIRECTIONS, view)) return false;
  const distance = Math.max(.5, camera.position.distanceTo(controls.target));
  camera.up.set(0, 1, 0);
  camera.position.copy(controls.target).addScaledVector(new THREE.Vector3(...VIEW_DIRECTIONS[view]).normalize(), distance);
  camera.lookAt(controls.target);
  controls.update();
  camera.updateMatrixWorld(true);
  return true;
}

export function applyGridStyle(grid, { gridColor, gridOpacity, gridStyle }) {
  const old = grid.material;
  const options = { color: gridColor, transparent: true, opacity: gridOpacity, depthWrite: false, vertexColors: false };
  grid.material = gridStyle === 'dashed'
    ? new THREE.LineDashedMaterial({ ...options, dashSize: .055, gapSize: .045 })
    : new THREE.LineBasicMaterial(options);
  if (gridStyle === 'dashed') grid.computeLineDistances();
  for (const material of Array.isArray(old) ? old : [old]) material.dispose();
}

export function createOrientationIndicator(host, camera, onView, label) {
  const root = document.createElement('section'); root.id = 'orientation-indicator';
  root.setAttribute('aria-label', label('orientation'));
  const sphere = document.createElement('div'); sphere.className = 'orientation-sphere';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 120 120'); svg.setAttribute('aria-hidden', 'true'); sphere.append(svg);
  const endpoints = [
    ['right', '+X', '#cc5258', [1, 0, 0]], ['left', '−X', '#cc5258', [-1, 0, 0]],
    ['top', '+Y', '#45996b', [0, 1, 0]], ['bottom', '−Y', '#45996b', [0, -1, 0]],
    ['front', '+Z', '#4387d4', [0, 0, 1]], ['back', '−Z', '#4387d4', [0, 0, -1]],
  ].map(([view, text, color, direction]) => {
    const line = document.createElementNS(svg.namespaceURI, 'line');
    line.setAttribute('x1', '60'); line.setAttribute('y1', '60'); line.setAttribute('stroke', color); svg.append(line);
    const button = document.createElement('button'); button.dataset.view = view; button.textContent = text; button.style.setProperty('--axis-color', color);
    button.title = label(view); button.setAttribute('aria-label', label(view));
    button.onclick = () => onView(view); sphere.append(button);
    return { view, line, button, direction: new THREE.Vector3(...direction) };
  });
  const footer = document.createElement('div'); footer.className = 'orientation-footer';
  const iso = document.createElement('button'); iso.dataset.view = 'iso'; iso.textContent = label('iso'); iso.onclick = () => onView('iso'); footer.append(iso);
  root.append(sphere, footer); host.append(root);
  const inverse = new THREE.Quaternion(); const point = new THREE.Vector3();
  return {
    root, footer,
    update() {
      inverse.copy(camera.quaternion).invert();
      for (const { line, button, direction } of endpoints) {
        point.copy(direction).applyQuaternion(inverse);
        const x = 60 + point.x * 40; const y = 60 - point.y * 40;
        line.setAttribute('x2', String(x)); line.setAttribute('y2', String(y));
        const offset = Math.hypot(point.x, point.y) < .1 ? (point.z < 0 ? -16 : 16) : 0;
        button.style.left = (x + offset) + 'px'; button.style.top = y + 'px';
        button.style.zIndex = String(Math.round((point.z + 1) * 10));
        button.style.opacity = point.z < -.1 ? '.55' : '1';
        button.style.transform = 'translate(-50%, -50%) scale(' + (point.z < -.1 ? .8 : 1) + ')';
      }
    },
    relabel() {
      root.setAttribute('aria-label', label('orientation'));
      for (const item of endpoints) { item.button.title = label(item.view); item.button.setAttribute('aria-label', label(item.view)); }
      iso.textContent = label('iso');
    },
  };
}
