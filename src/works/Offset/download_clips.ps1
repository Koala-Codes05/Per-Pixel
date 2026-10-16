$files = @('22-hud.mp4', '12-aurora-glass.mp4', '07-liquid.mp4', '09-bauhaus.mp4', '08-morph.mp4')
foreach ($f in $files) {
    Write-Host "Downloading $f..."
    curl.exe -s -L "https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/$f" -o "assets\videos\raw_$f"
}
Write-Host "Completed downloads."
