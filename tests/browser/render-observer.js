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
