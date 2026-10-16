import subprocess
import os
import sys

base_dir = r"d:\Dev Domain\~Projects\Offset"
videos_dir = os.path.join(base_dir, "assets", "videos")
audio_dir = os.path.join(base_dir, "assets", "audio")

def run(cmd):
    print("Running:", cmd)
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print("Error:", res.stderr)
        raise RuntimeError(f"Command failed: {cmd}\n{res.stderr}")
    return res.stdout

print("1. Preparing Scene Clips...")

# Scene 1: 0.0 - 2.5s (Ident & Typography) -> from raw_09-bauhaus.mp4
cmd_s1 = f'ffmpeg -y -ss 0.2 -i "{os.path.join(videos_dir, "raw_09-bauhaus.mp4")}" -t 2.5 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene1.mp4")}"'
run(cmd_s1)

# Scene 2: 2.5 - 5.5s (3D CGI Product & Aurora Glass) -> from clip_3d.mp4 (1.5s) + raw_12-aurora-glass.mp4 (1.5s)
cmd_s2_a = f'ffmpeg -y -ss 0.5 -i "{os.path.join(videos_dir, "clip_3d.mp4")}" -t 1.5 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene2_a.mp4")}"'
run(cmd_s2_a)

cmd_s2_b = f'ffmpeg -y -ss 1.0 -i "{os.path.join(videos_dir, "raw_12-aurora-glass.mp4")}" -t 1.5 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene2_b.mp4")}"'
run(cmd_s2_b)

# Combine scene 2
concat_s2 = f'ffmpeg -y -i "{os.path.join(videos_dir, "scene2_a.mp4")}" -i "{os.path.join(videos_dir, "scene2_b.mp4")}" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[v]" -map "[v]" -c:v libx264 -preset fast -crf 18 "{os.path.join(videos_dir, "scene2.mp4")}"'
run(concat_s2)

# Scene 3: 5.5 - 8.5s (Sci-Fi HUD & Telemetry) -> from raw_22-hud.mp4
cmd_s3 = f'ffmpeg -y -ss 1.0 -i "{os.path.join(videos_dir, "raw_22-hud.mp4")}" -t 3.0 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene3.mp4")}"'
run(cmd_s3)

# Scene 4: 8.5 - 11.5s (Synthwave & Liquid Chrome) -> from raw_synth.mp4 (1.5s) + raw_07-liquid.mp4 (1.5s)
cmd_s4_a = f'ffmpeg -y -ss 1.0 -i "{os.path.join(videos_dir, "raw_synth.mp4")}" -t 1.5 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene4_a.mp4")}"'
run(cmd_s4_a)

cmd_s4_b = f'ffmpeg -y -ss 0.8 -i "{os.path.join(videos_dir, "raw_07-liquid.mp4")}" -t 1.5 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene4_b.mp4")}"'
run(cmd_s4_b)

concat_s4 = f'ffmpeg -y -i "{os.path.join(videos_dir, "scene4_a.mp4")}" -i "{os.path.join(videos_dir, "scene4_b.mp4")}" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[v]" -map "[v]" -c:v libx264 -preset fast -crf 18 "{os.path.join(videos_dir, "scene4.mp4")}"'
run(concat_s4)

# Scene 5: 11.5 - 15.0s (Climax / Outro Resume) -> 3.5s
# We can create a dynamic multi-pane / kinetic backdrop from raw_08-morph & dark graphic canvas
cmd_s5 = f'ffmpeg -y -ss 0.5 -i "{os.path.join(videos_dir, "raw_08-morph.mp4")}" -t 3.5 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,eq=brightness=-0.25:contrast=1.3" -c:v libx264 -preset fast -crf 18 -an "{os.path.join(videos_dir, "scene5.mp4")}"'
run(cmd_s5)

print("All scenes generated successfully!")
