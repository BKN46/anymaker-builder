param(
  [Parameter(Mandatory = $true)]
  [string]$GameGcl,
  [Parameter(Mandatory = $true)]
  [string]$AnalysisWorkspace,
  [ValidateSet(
    'vehicle_edge_util.add_static_geometry',
    'client_scene.vehicle_edge.debug_render_geometry',
    'vehicle_util.grid_origin_dir.get_transform',
    'client_scene.vehicle_clipboard_data.load_clipboard_render_data',
    'server_scene.vehicle_component.connect_multibody',
    'server_scene.vehicle_component.hinge_knuckle.connect_multibody',
    'server_scene.vehicle_component.tow_bar.connect_multibody',
    'server_scene.vehicle_component.tow_hitch.connect_multibody',
    'server_scene.vehicle.add_component',
    'server_scene.save_data.vehicle_container.create_data_from_vehicles'
  )]
  [string]$KnownFunction = 'client_scene.vehicle_edge.debug_render_geometry'
)

$ErrorActionPreference = 'Stop'
$gcl = Get-Item -LiteralPath $GameGcl
if ($gcl.Name -ne 'game.gcl') { throw "Expected game.gcl, received: $($gcl.Name)" }
$workspace = Get-Item -LiteralPath $AnalysisWorkspace
$ghidra = (Get-Content -LiteralPath (Join-Path $workspace.FullName 'config\analysis_config.json') -Raw | ConvertFrom-Json).ghidra_dir
$headless = Join-Path $ghidra 'support\analyzeHeadless.bat'
if (-not (Test-Path -LiteralPath $headless)) { throw "Ghidra headless launcher not found: $headless" }

# Each entry is verified against the current game.gcl: code begins after the
# function signature and its {code-size, allocation-size} header.
$targets = @{
  'vehicle_edge_util.add_static_geometry' = @{ Offset = '0x121D177'; Length = '0x280' }
  # This debug function exposes the edge's nonzero-axis topology and the
  # generated quad/triangle faces; it is the most useful visual reference.
  'client_scene.vehicle_edge.debug_render_geometry' = @{ Offset = '0x121C0BC'; Length = '0xF0A0' }
  # These ranges are read from the current game.gcl function records: the
  # signature is followed by its {code-size, allocation-size} header.
  'vehicle_util.grid_origin_dir.get_transform' = @{ Offset = '0x126C738'; Length = '0x78' }
  'client_scene.vehicle_clipboard_data.load_clipboard_render_data' = @{ Offset = '0xF61984'; Length = '0x420' }
  'server_scene.vehicle_component.connect_multibody' = @{ Offset = '0x257E571'; Length = '0x490' }
  'server_scene.vehicle_component.hinge_knuckle.connect_multibody' = @{ Offset = '0x343B94E'; Length = '0x88' }
  'server_scene.vehicle_component.tow_bar.connect_multibody' = @{ Offset = '0x36BE25D'; Length = '0x788' }
  'server_scene.vehicle_component.tow_hitch.connect_multibody' = @{ Offset = '0x36C7AE9'; Length = '0x788' }
  'server_scene.vehicle.add_component' = @{ Offset = '0x256D47C'; Length = '0xDC8' }
  'server_scene.save_data.vehicle_container.create_data_from_vehicles' = @{ Offset = '0x30FBA62'; Length = '0x40' }
}
$target = $targets[$KnownFunction]
if ($null -eq $target) { throw "Unknown GCL function: $KnownFunction" }

$runId = Get-Date -Format 'yyyyMMdd_HHmmss'
$outDir = Join-Path $workspace.FullName "artifacts\anymaker-gcl\$runId"
$projectRoot = Join-Path $workspace.FullName 'artifacts\anymaker-gcl\projects'
New-Item -ItemType Directory -Force -Path $outDir, $projectRoot | Out-Null
$scriptDir = $PSScriptRoot

& $headless $projectRoot "AnymakerGcl_$runId" `
  -import $gcl.FullName -overwrite -noanalysis `
  -processor 'x86:LE:64:default' -cspec windows `
  -scriptPath $scriptDir `
  -postScript ExportAnymakerGclFunction.java $outDir $KnownFunction $target.Offset $target.Length
if ($LASTEXITCODE -ne 0) { throw "GCL analysis failed with exit code $LASTEXITCODE" }

Write-Output (Join-Path $outDir ($KnownFunction + '.c'))
