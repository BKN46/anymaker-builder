param(
  [Parameter(Mandatory = $true)]
  [string]$GameExe,
  [Parameter(Mandatory = $true)]
  [string]$AnalysisWorkspace,
  [int]$MaxDecompileFunctions = 360,
  [int]$AnalysisTimeoutPerFile = 900,
  [string]$MaxMemory = '12G',
  [switch]$FullAnalysis,
  [switch]$LightAnalysis
)

$ErrorActionPreference = 'Stop'
$game = Get-Item -LiteralPath $GameExe
if ($game.Name -ne 'game.exe') { throw "Expected Anymaker game.exe, received: $($game.Name)" }
$workspace = Get-Item -LiteralPath $AnalysisWorkspace
$runner = Join-Path $workspace.FullName 'scripts\Invoke-GhidraAnalysis.ps1'
if (-not (Test-Path -LiteralPath $runner)) { throw "Ghidra analysis runner not found: $runner" }

$arguments = @(
  '-GameDir', $game.DirectoryName,
  '-TargetNames', $game.Name,
  '-MaxDecompileFunctions', [string]$MaxDecompileFunctions,
  '-AnalysisTimeoutPerFile', [string]$AnalysisTimeoutPerFile,
  '-MaxMemory', $MaxMemory
)
if ($FullAnalysis) { $arguments += '-FullAnalysis' }
if ($LightAnalysis) { $arguments += '-LightAnalysis' }

& $runner @arguments
if ($LASTEXITCODE -ne 0) { throw "Ghidra analysis failed with exit code $LASTEXITCODE" }
