import { toEditorDocument } from '../editor/model.js';
import { validatePlate } from '../editor/topology.js';
import { missingPlateBoundaries } from '../editor/plate-boundary-coverage.js';
import { assertTwoPlanePrediction, predictNativeSurface } from '../editor/two-plane-surface.js';

// Keep representable native curved surfaces so an exported curve can be
// reopened and split. The permission is inferred from geometry, never a
// private game field. Malformed boundaries still fail before scene mutation.
export function prepareNativeImport(model, options = {}) {
  const document = toEditorDocument(model, options);
  const removedPlateIds = [];
  const curvedPlateIds = [];
  if (document.topology) document.topology.plates = document.topology.plates.map(plate => {
    try {
      validatePlate(plate.nodeIds, document.topology.nodes, plate.normalOffset);
      return plate;
    } catch (error) {
      if (error.code !== 'nonplanar-plate') throw error;
      validatePlate(plate.nodeIds, document.topology.nodes, plate.normalOffset, { allowNonPlanar: true });
      curvedPlateIds.push(plate.id);
      const curved = { ...plate, surfaceLimitBypass: true };
      const candidate = { ...curved, surfaceFanAnchor: plate.nodeIds.at(-1) };
      try {
        if (missingPlateBoundaries({ ...document.topology, plates: [candidate] }).length) return curved;
        assertTwoPlanePrediction(predictNativeSurface(candidate, document.topology));
        return candidate;
      } catch { return curved; }
    }
  });
  return { document, removedPlateIds, curvedPlateIds, nativeLoadDiagnostics: missingPlateBoundaries(document.topology || {}) };
}
