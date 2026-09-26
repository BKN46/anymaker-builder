# Anymaker Builder

Anymaker Builder is a desktop-first, browser-based vehicle-building prototype for Anymaker. It is built with Vite, Three.js, and native JavaScript modules, and is designed to run as a self-contained static site, including on GitHub Pages.

The project combines an editable vehicle scene, a published component catalog, structural topology tools, and ongoing research into Anymaker's native data formats. It is a research prototype, not an official editor.

## Current status

The editor currently provides:

- A searchable published component catalog with lazy-loaded Mesh assets.
- Component placement, selection, transform controls, copy, mirror, grid split/merge, hiding, history, and local recovery.
- Integer-grid construction tools for nodes, edges, panels, glass panels, and six connection families.
- Edge previews, axis snapping, node and edge interaction aids, panel construction from closed edge loops, and diagnostic painting.
- Import of paired native `.data` / `.meta` vehicle files for inspection and editing.
- Export of a paired native JSON `.data` / `.meta` representation, plus a clearly non-game-compatible debug XML export.
- English UI by default, with a persisted Chinese language option.
- A local GLB/OBJ/STL model tool under Resources & validation, with filtered outer shells, 13 simplification levels (30–250 target vertices, focused on 70–250), quad-first panels, optional X/Y/Z symmetry, uniform scale, footprint preview, and undoable beam/panel generation. See [model import](doc/07_MODEL_IMPORT.md) for supported geometry and limits.

The published asset set and its source metadata are checked by repository scripts. Component geometry is rendered with neutral diagnostic materials; game materials, camera matching, lighting, dynamic assembly, and visual parity have not been verified.

## Important limitations

Do not treat the current native export as game-compatible. The field mapping is based on observed samples and preserves supported data where possible, but exported vehicles have not been validated by loading them in the game.

Likewise, successful Mesh parsing, import, export, or a passing build does not demonstrate a 1:1 match with Anymaker's rendering or construction rules. The project deliberately keeps these research boundaries explicit.

## Coordinate system and construction

Manual editor operations use a fixed world grid:

```text
1 block = 8 cm = 0.08 world units
```

Component origins, manually created nodes, edge endpoints, panel boundaries, and transform translations are quantized to integer world blocks. Scale remains dimensionless. Native vehicle imports may retain fractional projected positions where required by their decoded rigid transforms.

Edge endpoints are represented by world-axis-aligned block cubes. Edge geometry uses their projected silhouette, including diagonal cases. When a panel is created, it records the camera-facing direction and connects actual vertices of the corresponding node-cube faces; it does not fabricate a plane-wide mitered expansion. These are editor diagnostics informed by observed behavior and screenshots, not a claim that the original game mesh algorithm has been reproduced.

## Getting started

Use Node.js `^20.19.0` or `>=22.12.0` and the committed npm lockfile.

```powershell
npm ci
npm run dev
```

Open the URL printed by Vite in a desktop browser with WebGL support.

## Validation commands

Run commands from the repository root.

| Command | Purpose |
| --- | --- |
| `npm test` | Run the Node unit test suite. |
| `npm run build` | Build the static site into `docs/`. |
| `npm run check` | Run unit tests and a production build. |
| `npm run test:browser:editor` | Run editor workflow tests in Chromium. |
| `npm run test:browser:preferences` | Run preferences and recovery workflow tests. |
| `npm run test:browser` | Run the complete Playwright suite. |
| `npm run check:assets` | Validate published catalog, bindings, Mesh files, and hashes. |
| `npm run check:full` | Run unit, asset, browser, and production-build checks. |

Install Chromium once before running browser tests if necessary:

```powershell
npx playwright install chromium
```

## Repository layout

| Path | Responsibility |
| --- | --- |
| `src/main.js` | Application composition, Three.js scene, editor tools, and DOM coordination. |
| `src/editor/` | Grid rules, project model, topology, interactions, persistence, and view helpers. |
| `src/assets/` | Mesh parsing, published asset loading, geometry operations, and disposal helpers. |
| `src/native/` | Native `.data` / `.meta` parsing and experimental domain mapping/export. |
| `src/catalog/` | Component catalog indexes and metadata loading. |
| `public/data/` | Published component indexes, definitions, and bindings. |
| `public/assets/` | Published Mesh manifest and compressed Mesh assets. |
| `tests/` | Node unit tests, fixtures, and Playwright workflows. |
| `test-vehicle/` | Native vehicle samples used as format-research inputs. |
| `scripts/` | Offline extraction, conversion, analysis, and asset-audit tooling. |
| `doc/` | Architecture, format research, design notes, and auditable evidence. |

## Assets and local inputs

Normal browser use must not require an Anymaker installation, ROM, executable, or local Mesh selection. The site loads published definitions, bindings, and compressed Mesh assets on demand.

Local `.mesh` selection exists only for development and asset auditing. Native vehicle import requires a same-named `.data` and `.meta` pair and is performed entirely in the browser. Treat these files as untrusted input.

When local game resources are available and the task requires them, the offline scripts can regenerate catalog or asset outputs:

```powershell
node scripts/extract-catalog.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
node scripts/build-published-assets.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
node scripts/audit-assets.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
npm run check:assets
```

Do not commit a game installation, executable, ROM, local extraction cache, or experimental export.

## Documentation

The detailed documentation index is [doc/README.md](doc/README.md).

- [System architecture](doc/01_SYSTEM_ARCHITECTURE.md)
- [Anymaker architecture and research scope](doc/02_ANYMAKER_ARCHITECTURE.md)
- [Project XML and native data formats](doc/03_XML_AND_NATIVE_FORMAT.md)
- [Component and Mesh asset split](doc/04_COMPONENT_MESH_SPLIT.md)
- [Build operations](doc/05_BUILD_OPERATIONS.md)
- [Local reverse-engineering workflow](doc/06_REVERSE_ENGINEERING.md)
- [Asset audit evidence](doc/evidence/asset-audit.json)

The documentation distinguishes verified evidence, current implementation, design goals, and open questions. A checked TODO item or a successful build is not product acceptance.

## Static deployment

`npm run build` writes the deployable site to `docs/`. The Vite base defaults to a relative path for static hosting and can be overridden with `VITE_BASE`, for example when deploying under a repository subpath.

The repository is intended for static hosting. It has no backend, account system, database, runtime proxy, or dependency on a running copy of the game.
