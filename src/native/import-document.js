import { toEditorDocument } from '../editor/model.js';
import { validatePlate } from '../editor/topology.js';

// Native saves may contain warped faces that the editor cannot represent.
// Remove only those faces from the imported copy; keep their nodes, beams,
// other faces and the raw native model intact. Other validation errors fail.
export function prepareNativeImport(model, options = {}) {
  const document = toEditorDocument(model, options);
  const removedPlateIds = [];
  if (document.topology) document.topology.plates = document.topology.plates.filter(plate => {
    try {
      validatePlate(plate.nodeIds, document.topology.nodes, plate.normalOffset);
      return true;
    } catch (error) {
      if (error.code !== 'nonplanar-plate') throw error;
      removedPlateIds.push(plate.id);
      return false;
    }
  });
  return { document, removedPlateIds };
}
