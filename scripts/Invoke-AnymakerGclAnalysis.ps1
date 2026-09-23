param(
  [Parameter(Mandatory = $true)]
  [string]$GameGcl,
  [Parameter(Mandatory = $true)]
  [string]$AnalysisWorkspace,
  [ValidateSet('vehicle_edge_util.add_static_geometry', 'client_scene.vehicle_edge.debug_render_geometry')]
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
  'vehicle_edge_util.add_static_geometry' = @{ Offset = '0x1219798'; Length = '0x280' }
  # This debug function exposes the edge's nonzero-axis topology and the
  # generated quad/triangle faces; it is the most useful visual reference.
  'client_scene.vehicle_edge.debug_render_geometry' = @{ Offset = '0x121C0BC'; Length = '0xF0A0' }
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
