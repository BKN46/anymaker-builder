import * as THREE from 'three';

// Literal identification colours observed on the published interface meshes.
// A part name describes neither a material nor a region: wheel_hub_a_base,
// for example, stores its body AND connectors in 'mechanical_surface_f'.
// Do not interpret every packed colour as literal RGB. In particular #990000
// spans the casing of liquid/torque interfaces and motors, not just a port.
// #136666 is the darker ring on engine/gearbox torque mating faces.
const INTERFACE_RGB = new Set([0xff3131, 0x1860ff, 0x1e9999, 0xffcc31, 0x136666]);
const GAS_RGB = new Set([0x997100, 0xcc9900]);

function isInterfaceVertex(colors, vertex, gasInterface) {
  const offset = vertex * 4;
  const rgb = (colors[offset] << 16) | (colors[offset + 1] << 8) | colors[offset + 2];
  // Gas yellow also occurs on dial faces and buildings. Its use as an
  // interface identifier is only established for these two source assets.
  return INTERFACE_RGB.has(rgb) || (gasInterface && GAS_RGB.has(rgb));
}

// Called once while instantiating an asset, never during hover or rendering.
// A single geometry and at most two draw groups avoid overlapping meshes
// and one material/draw call per coloured triangle.
export function applyConnectionInterfaceColors(geometry, colors, source, bodyMaterial) {
  // Packed game colours are only rendered by the isolated interface group.
  // Keep the casing on its diagnostic material even when a caller reuses a
  // material that previously had vertex colours enabled.
  if (bodyMaterial?.vertexColors) {
    bodyMaterial.vertexColors = false;
    bodyMaterial.needsUpdate = true;
  }
  geometry.setAttribute('gameColorBytes', new THREE.BufferAttribute(colors, 4, true));
  const index = geometry.getIndex();
  if (!index || !source.startsWith('meshes/components/')) return bodyMaterial;
  const gasInterface = source.endsWith('/interface_gas_a.mesh') || source.endsWith('/interface_gas_b.mesh');
  const vertices = new Uint8Array(colors.length / 4);
  for (let vertex = 0; vertex < vertices.length; vertex++) vertices[vertex] = isInterfaceVertex(colors, vertex, gasInterface);
  const marked = new Uint8Array(index.count / 3);
  let interfaceCount = 0;
  for (let offset = 0; offset < index.count; offset += 3) {
    if (vertices[index.getX(offset)] && vertices[index.getX(offset + 1)] && vertices[index.getX(offset + 2)]) {
      marked[offset / 3] = 1;
      interfaceCount += 3;
    }
  }
  if (!interfaceCount) return bodyMaterial;

  const bodyCount = index.count - interfaceCount;
  const indices = new index.array.constructor(index.count);
  const linearColors = new Float32Array(colors.length / 4 * 3).fill(1);
  const color = new THREE.Color();
  let bodyOffset = 0; let interfaceOffset = bodyCount;
  for (let offset = 0; offset < index.count; offset += 3) {
    const isInterface = marked[offset / 3];
    for (let corner = 0; corner < 3; corner++) {
      const vertex = index.getX(offset + corner);
      indices[isInterface ? interfaceOffset++ : bodyOffset++] = vertex;
      if (isInterface) {
        // Three.js vertex colours are linear. Preserve the original packed
        // bytes separately instead of feeding sRGB directly into lighting.
        color.setRGB(colors[vertex * 4] / 255, colors[vertex * 4 + 1] / 255, colors[vertex * 4 + 2] / 255, THREE.SRGBColorSpace);
        color.toArray(linearColors, vertex * 3);
      }
    }
  }
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.setAttribute('color', new THREE.BufferAttribute(linearColors, 3));
  geometry.clearGroups();
  if (bodyCount) geometry.addGroup(0, bodyCount, 0);
  geometry.addGroup(bodyCount, interfaceCount, 1);
  const interfaceMaterial = bodyMaterial.clone();
  interfaceMaterial.color.set('#ffffff');
  interfaceMaterial.vertexColors = true;
  interfaceMaterial.userData.connectionInterface = true;
  return [bodyMaterial, interfaceMaterial];
}
