$path = 'c:\Users\bruno\EducaInvest\public\audios'
$shell = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace($path)

# Find the index for Duration
$durationIndex = -1
for ($i=0; $i -lt 300; $i++) {
    $name = $folder.GetDetailsOf($null, $i)
    if ($name -eq 'Length' -or $name -eq 'Duração' -or $name -eq 'Duration') {
        $durationIndex = $i
        break
    }
}

Write-Host "Duration Index: $durationIndex"

foreach ($file in $folder.Items()) {
    $duration = $folder.GetDetailsOf($file, $durationIndex)
    Write-Host "File: $($file.Name) - Duration: $duration"
}
