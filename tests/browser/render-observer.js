// Use Three.js' existing devtools events. No test API is shipped by the app.
export async function observeRendering(page) {
  await page.addInitScript(() => {
    const state = { frames: 0, shadowFrames: 0, scene: null, renderer: null, camera: null };
    window.__renderTestState = state;
    window.__THREE_DEVTOOLS__ = new EventTarget();
    window.__THREE_DEVTOOLS__.addEventListener('observe', event => {
      const object = event.detail;
      if (object.isScene && !state.scene) state.scene = object;
      if (object.isWebGLRenderer && !state.renderer) {
        state.renderer = object;
        const render = object.render;
        object.render = function (scene, camera) {
          state.camera = camera; state.frames++;
          if (this.shadowMap.enabled && (this.shadowMap.autoUpdate || this.shadowMap.needsUpdate)) state.shadowFrames++;
          return render.call(this, scene, camera);
        };
      }
    });
  });
}

export async function renderedIdentities(page) {
  return page.evaluate(() => {
    const scene = window.__renderTestState.scene;
    const components = Object.fromEntries(scene.children.filter(object => object.userData.id).map(object => [object.userData.id, object.uuid]));
    const topology = Object.fromEntries(scene.getObjectByName('topology-overlay').children.map(object => {
      const kind = object.userData.topology;
      return [kind + ':' + object.userData[kind + 'Id'], object.uuid];
    }));
    return { components, topology };
  });
}

export async function projectWorldPoint(page, position) {
  return page.evaluate(position => {
    const { camera, renderer } = window.__renderTestState;
    camera.updateWorldMatrix(true, false);
    const point = camera.position.clone().set(position.x, position.y, position.z).project(camera);
    const rect = renderer.domElement.getBoundingClientRect();
    return { x: rect.x + (point.x + 1) * rect.width / 2, y: rect.y + (1 - point.y) * rect.height / 2 };
  }, position);
}

export async function renderedPlacementState(page) {
  return page.evaluate(() => {
    const preview = window.__renderTestState.scene.getObjectByName('component-placement-preview');
    if (!preview) return null;
    preview.updateWorldMatrix(true, true);
    const min = [Infinity, Infinity, Infinity]; const max = [-Infinity, -Infinity, -Infinity];
    const point = preview.position.clone();
    preview.traverse(mesh => {
      if (!mesh.isMesh) return;
      const position = mesh.geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        point.fromBufferAttribute(position, i); mesh.localToWorld(point);
        [point.x, point.y, point.z].forEach((value, axis) => { min[axis] = Math.min(min[axis], value); max[axis] = Math.max(max[axis], value); });
      }
    });
    return { visible: preview.visible, position: preview.position.toArray(), rotation: preview.rotation.toArray().slice(0, 3), min, max };
  });
}

// Read the actual framebuffer as well as materials. Attribute-only assertions
// cannot catch a correctly labelled interface that never appears on screen.
export async function renderedInterfaceSamples(page) {
  return page.evaluate(() => {
    const { scene, renderer, camera } = window.__renderTestState;
    renderer.render(scene, camera);
    const gl = renderer.getContext();
    const width = gl.drawingBufferWidth; const height = gl.drawingBufferHeight;
    const pixels = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    const result = {};
    for (const object of scene.children.filter(object => object.userData.id)) {
      const bounds = [width, height, 0, 0]; const body = []; const interfaces = [];
      object.traverse(child => {
        if (!child.isMesh) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const material of materials) {
          (material.userData.connectionInterface ? interfaces : body).push(material.color.getHexString());
        }
        const position = child.geometry.attributes.position;
        const point = child.position.clone();
        for (let i = 0; i < position.count; i++) {
          point.fromBufferAttribute(position, i); child.localToWorld(point); point.project(camera);
          const x = (point.x + 1) * width / 2; const y = (point.y + 1) * height / 2;
          bounds[0] = Math.min(bounds[0], x); bounds[1] = Math.min(bounds[1], y);
          bounds[2] = Math.max(bounds[2], x); bounds[3] = Math.max(bounds[3], y);
        }
      });
      const counts = { red: 0, blue: 0, teal: 0, yellow: 0 };
      for (let y = Math.max(0, Math.ceil(bounds[1])); y < Math.min(height, Math.floor(bounds[3])); y++) {
        for (let x = Math.max(0, Math.ceil(bounds[0])); x < Math.min(width, Math.floor(bounds[2])); x++) {
          const offset = (y * width + x) * 4;
          const r = pixels[offset]; const g = pixels[offset + 1]; const b = pixels[offset + 2];
          if (r > 65 && r > g * 1.6 && r > b * 1.6) counts.red++;
          if (b > 65 && b > r * 1.5 && b > g * 1.2) counts.blue++;
          if (g > 50 && r < g * .55 && b > g * .7 && b < g * 1.35) counts.teal++;
          if (r > 65 && r > b * 1.6 && g > b * 1.5 && r >= g * .85) counts.yellow++;
        }
      }
      result[object.userData.id] = { body, interfaces, counts };
    }
    return result;
  });
}
