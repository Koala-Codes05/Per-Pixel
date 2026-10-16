import subprocess
import os

base_dir = r"d:\Dev Domain\~Projects\Offset"
videos_dir = os.path.join(base_dir, "assets", "videos")
audio_dir = os.path.join(base_dir, "assets", "audio")

# 7 Beat-locked source clips
v1 = os.path.join(videos_dir, "raw_09-bauhaus.mp4")      # Frame 01: Dive through 'O'
v2 = os.path.join(videos_dir, "clip_3d.mp4")             # Frame 02: 3D Craft Landing
v3 = os.path.join(videos_dir, "raw_12-aurora-glass.mp4") # Frame 03: Prisms & Dispersion
v4 = os.path.join(videos_dir, "raw_22-hud.mp4")          # Frame 04: Tactical FUI HUD
v5 = os.path.join(videos_dir, "raw_synth.mp4")           # Frame 05: Synthetic Velocity & Smash
v6 = os.path.join(videos_dir, "raw_07-liquid.mp4")       # Frame 06: Multi-Discipline Typography
v7 = os.path.join(videos_dir, "raw_08-morph.mp4")        # Frame 07: Executive Lockup & Held Frame

master_audio = os.path.join(audio_dir, "master_soundtrack_pro.mp3")
out_video = os.path.join(base_dir, "showreel_15s.mp4")

font_bold = "C\\:/Windows/Fonts/ariblk.ttf"
font_mono = "C\\:/Windows/Fonts/consola.ttf"
font_sans = "C\\:/Windows/Fonts/arial.ttf"

# Durations: exactly on 1.85s bar grid
# Frame 1: 0.00 -> 1.85 (1.85s)
# Frame 2: 1.85 -> 3.70 (1.85s)
# Frame 3: 3.70 -> 5.55 (1.85s)
# Frame 4: 5.55 -> 7.40 (1.85s)
# Frame 5: 7.40 -> 9.25 (1.85s)
# Frame 6: 9.25 -> 11.10 (1.85s)
# Frame 7: 11.10 -> 15.00 (3.90s)
# Total = 15.000s

filter_complex = (
    # Trim and scale each clip to 1920x1080 @ 30fps
    "[0:v]trim=0:1.85,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c1];"
    "[1:v]trim=0:1.85,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c2];"
    "[2:v]trim=0:1.85,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c3];"
    "[3:v]trim=0:1.85,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c4];"
    "[4:v]trim=0:1.85,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c5];"
    "[5:v]trim=0:1.85,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c6];"
    "[6:v]trim=0:3.90,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30[c7];"
    # Concat 7 scenes
    "[c1][c2][c3][c4][c5][c6][c7]concat=n=7:v=1:a=0[base];"
    # Cinematic color grade
    "[base]eq=contrast=1.12:saturation=1.18:brightness=0.01[grade];"
    # Anamorphic Letterbox
    "[grade]drawbox=x=0:y=0:w=1920:h=70:color=black@0.92:t=fill,"
    "drawbox=x=0:y=1010:w=1920:h=70:color=black@0.92:t=fill[letterbox];"
    # Director HUD Top Bar
    "[letterbox]"
    "drawbox=x=80:y=28:w=14:h=14:color=0xFF007A@0.9:t=fill:enable='lt(mod(t,1),0.6)',"
    "drawtext=fontfile='" + font_mono + "':text='REC':x=105:y=26:fontsize=17:fontcolor=white@0.9:enable='lt(mod(t,1),0.6)',"
    "drawtext=fontfile='" + font_mono + "':text='ANAKIN // MMXXVII DIRECTORIAL SHOWREEL // 129.7 BPM // CAM_01':x=160:y=27:fontsize=14:fontcolor=white@0.75,"
    "drawtext=fontfile='" + font_mono + "':timecode='00\\:00\\:00\\:00':r=30:x=1680:y=27:fontsize=17:fontcolor=0x5724FF:box=1:boxcolor=black@0.6:boxborderw=4[hud_top];"
    # Lower Thirds
    "[hud_top]"
    "drawtext=fontfile='" + font_mono + "':text='[ 01 THE DIVE ] SINKING INTO OCTANE CAUSTICS':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,0,1.85)',"
    "drawtext=fontfile='" + font_mono + "':text='[ 02 3D CRAFT ] PROCEDURAL OCTANE & PROCEDURAL CGI':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,1.85,3.70)',"
    "drawtext=fontfile='" + font_mono + "':text='[ 03 PRISMS ] CHROMATIC DISPERSION & MULTI-PLANE Z-DEPTH':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,3.70,5.55)',"
    "drawtext=fontfile='" + font_mono + "':text='[ 04 FUI HUD ] TACTICAL MILITARY TELEMETRY & 3D COIN FLIP':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,5.55,7.40)',"
    "drawtext=fontfile='" + font_mono + "':text='[ 05 VELOCITY ] 140 BPM STROBE & SINGULARITY COLLAPSE':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,7.40,9.25)',"
    "drawtext=fontfile='" + font_mono + "':text='[ 06 TYPOGRAPHY ] RE-HIT PULL-BACK & MULTI-VIDEO TYPOGRAPHY':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,9.25,11.10)',"
    "drawtext=fontfile='" + font_mono + "':text='[ 07 RESUME ] LEAD MOTION DESIGNER // HELLO@ANAKIN.DESIGN':x=80:y=1032:fontsize=15:fontcolor=white@0.85:enable='between(t,11.10,15.00)',"
    "drawtext=fontfile='" + font_mono + "':text='OFFSET 2027 · MASTER REEL':x=1600:y=1032:fontsize=14:fontcolor=0xEDFF66@0.9[hud_base];"
    # Kinetic Typography Across Frames
    "[hud_base]"
    # Frame 01 Hero Callout
    "drawtext=fontfile='" + font_bold + "':text='THE REEL':x=120:y=380:fontsize=130:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=16:enable='between(t,0.2,1.7)',"
    "drawtext=fontfile='" + font_sans + "':text='FOR EVERY VISION':x=130:y=520:fontsize=44:fontcolor=0x5724FF:box=1:boxcolor=black@0.65:boxborderw=10:enable='between(t,0.3,1.7)',"
    # Frame 02 Hero Callout
    "drawtext=fontfile='" + font_bold + "':text='3D CRAFT':x=140:y=420:fontsize=110:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=16:enable='between(t,2.0,3.5)',"
    "drawtext=fontfile='" + font_mono + "':text='CAUSTICS & PROCEDURAL CGI':x=145:y=545:fontsize=28:fontcolor=0x4FB7DD:box=1:boxcolor=black@0.65:boxborderw=8:enable='between(t,2.1,3.5)',"
    # Frame 03 Hero Callout
    "drawtext=fontfile='" + font_bold + "':text='CHROMATIC':x=140:y=420:fontsize=110:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=16:enable='between(t,3.85,5.35)',"
    "drawtext=fontfile='" + font_mono + "':text='PRISMATIC DISPERSION':x=145:y=545:fontsize=28:fontcolor=0x00E5FF:box=1:boxcolor=black@0.65:boxborderw=8:enable='between(t,3.95,5.35)',"
    # Frame 04 Hero Callout
    "drawtext=fontfile='" + font_bold + "':text='TACTICAL FUI':x=140:y=420:fontsize=110:fontcolor=0xFFE600:box=1:boxcolor=black@0.65:boxborderw=16:enable='between(t,5.70,7.20)',"
    "drawtext=fontfile='" + font_mono + "':text='SYSTEM ARCHITECTURE // TELEMETRY':x=145:y=545:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=8:enable='between(t,5.80,7.20)',"
    # Frame 05 Hero Callout
    "drawtext=fontfile='" + font_bold + "':text='SYNTHETIC':x=140:y=420:fontsize=110:fontcolor=0xFF007A:box=1:boxcolor=black@0.65:boxborderw=16:enable='between(t,7.55,9.05)',"
    "drawtext=fontfile='" + font_mono + "':text='140 BPM VELOCITY':x=145:y=545:fontsize=28:fontcolor=0x4FB7DD:box=1:boxcolor=black@0.65:boxborderw=8:enable='between(t,7.65,9.05)',"
    # Frame 06 Hero Callout (Multi-Video Typo Reveal)
    "drawtext=fontfile='" + font_bold + "':text='A N A K I N':x='(w-text_w)/2':y=400:fontsize=160:fontcolor=white:box=1:boxcolor=black@0.7:boxborderw=20:enable='between(t,9.40,10.90)',"
    "drawtext=fontfile='" + font_mono + "':text='ONE DIRECTOR. EVERY DISCIPLINE.':x='(w-text_w)/2':y=580:fontsize=26:fontcolor=0x5724FF:box=1:boxcolor=black@0.6:boxborderw=8:enable='between(t,9.60,10.90)',"
    # Frame 07 Hero Resume Slate
    "drawbox=x=360:y=180:w=1200:h=720:color=black@0.88:t=fill:enable='between(t,11.20,14.90)',"
    "drawbox=x=360:y=180:w=1200:h=720:color=0x5724FF@0.9:t=2:enable='between(t,11.20,14.90)',"
    "drawtext=fontfile='" + font_bold + "':text='ANAKIN':x='(w-text_w)/2':y=230:fontsize=96:fontcolor=white:enable='between(t,11.30,14.90)',"
    "drawtext=fontfile='" + font_sans + "':text='LEAD MOTION DESIGNER & CREATIVE DIRECTOR':x='(w-text_w)/2':y=345:fontsize=28:fontcolor=0xEDFF66:enable='between(t,11.40,14.90)',"
    "drawbox=x=500:y=395:w=920:h=1:color=white@0.3:t=fill:enable='between(t,11.40,14.90)',"
    "drawtext=fontfile='" + font_mono + "':text='SPECIALTIES\\:  3D MOTION // TACTICAL FUI // KINETIC TYPOGRAPHY':x='(w-text_w)/2':y=430:fontsize=20:fontcolor=white@0.9:enable='between(t,11.50,14.90)',"
    "drawtext=fontfile='" + font_mono + "':text='SOFTWARE\\:     CINEMA 4D · OCTANE · AFTER EFFECTS · HOUDINI · BLENDER':x='(w-text_w)/2':y=475:fontsize=20:fontcolor=white@0.9:enable='between(t,11.60,14.90)',"
    "drawtext=fontfile='" + font_mono + "':text='COMMISSIONS\\:  AVAILABLE Q3-Q4 // DIRECTORIAL ROSTER':x='(w-text_w)/2':y=520:fontsize=20:fontcolor=white@0.9:enable='between(t,11.70,14.90)',"
    "drawbox=x=500:y=565:w=920:h=1:color=white@0.3:t=fill:enable='between(t,11.70,14.90)',"
    "drawtext=fontfile='" + font_mono + "':text='PORTFOLIO & INQUIRIES\\:  HELLO@ANAKIN.DESIGN':x='(w-text_w)/2':y=605:fontsize=22:fontcolor=0x4FB7DD:enable='between(t,11.80,14.90)',"
    "drawbox=x=750:y=655:w=420:h=46:color=0xEDFF66:t=fill:enable='between(t,11.90,14.90)',"
    "drawtext=fontfile='" + font_mono + "':text='[ OPEN FOR COMMISSIONS ]':x='(w-text_w)/2':y=668:fontsize=19:fontcolor=black:enable='between(t,11.90,14.90)'[outv]"
)

cmd = (
    f'ffmpeg -y '
    f'-i "{v1}" '
    f'-i "{v2}" '
    f'-i "{v3}" '
    f'-i "{v4}" '
    f'-i "{v5}" '
    f'-i "{v6}" '
    f'-i "{v7}" '
    f'-i "{master_audio}" '
    f'-filter_complex "{filter_complex}" '
    f'-map "[outv]" '
    f'-map 7:a '
    f'-c:v libx264 -preset fast -crf 17 -pix_fmt yuv420p '
    f'-c:a aac -b:a 320k '
    f'-shortest '
    f'"{out_video}"'
)

print("Rendering broadcast 15.000s master showreel MP4 video...")
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
if res.returncode != 0:
    print("Error:", res.stderr)
else:
    print("Master video exported successfully to:", out_video)
