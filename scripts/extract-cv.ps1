param([Parameter(Mandatory=$true)][string]$Path, [string]$Output = '.cv-work/current.txt')
$ErrorActionPreference = 'Stop'
$source = (Resolve-Path -LiteralPath $Path).Path
$target = [IO.Path]::GetFullPath((Join-Path $PWD $Output))
[IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target)) | Out-Null
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$word.AutomationSecurity = 3
try {
  $document = $word.Documents.Open($source, $false, $true)
  $text = $document.Content.Text.Replace("`r", "`n").Replace([string][char]11, "`n").Replace([string][char]12, "`n").Replace([string][char]1, '')
  [IO.File]::WriteAllText($target, $text, [Text.UTF8Encoding]::new($false))
  $document.Close(0)
} finally { $word.Quit() }
Write-Output "Extracted CV text to $Output. Original document unchanged."
