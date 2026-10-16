$images = @{
    'thumb_3d.jpg' = 'https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/04-3d-render.jpg'
    'thumb_hud.jpg' = 'https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/22-hud.jpg'
    'thumb_synth.jpg' = 'https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/10-synthwave.jpg'
    'thumb_glass.jpg' = 'https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/12-aurora-glass.jpg'
    'thumb_liquid.jpg' = 'https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/07-liquid.jpg'
    'thumb_bauhaus.jpg' = 'https://raw.githubusercontent.com/Vincentwei1021/mg-styles-15/main/videos/09-bauhaus.jpg'
    'unsplash_chrome.jpg' = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80'
    'unsplash_prism.jpg' = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1920&q=80'
    'unsplash_cyber.jpg' = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80'
    'unsplash_geometry.jpg' = 'https://images.unsplash.com/photo-1633493106115-612543884814?auto=format&fit=crop&w=1920&q=80'
}

foreach ($name in $images.Keys) {
    $url = $images[$name]
    Write-Host "Fetching $name..."
    curl.exe -s -L $url -o "assets\images\$name"
}
Write-Host "All images downloaded."
