import subprocess
import os

base_dir = r"d:\Dev Domain\~Projects\Offset"
audio_dir = os.path.join(base_dir, "assets", "audio")

synth_mp3 = os.path.join(audio_dir, "synth_track.mp3")
hud_mp3 = os.path.join(audio_dir, "hud_track.mp3")
out_mp3 = os.path.join(audio_dir, "master_audio_15s.mp3")

# We loop synth_track and overlay hud_track
filter_complex = (
    # Synth track looped to 15s
    "[0:a]aloop=loop=-1:size=2*48000,atrim=0:15,asetpts=PTS-STARTPTS,volume=0.9[synth];"
    # HUD telemetry audio delayed to 4.5s
    "[1:a]atrim=0:8,asetpts=PTS-STARTPTS,adelay=4500|4500,volume=0.5[hud];"
    # Mix
    "[synth][hud]amix=inputs=2:duration=first:dropout_transition=2[mixed];"
    "[mixed]atrim=0:15,asetpts=PTS-STARTPTS,afade=t=out:st=14.4:d=0.6[outa]"
)

cmd = f'ffmpeg -y -i "{synth_mp3}" -i "{hud_mp3}" -filter_complex "{filter_complex}" -map "[outa]" -c:a libmp3lame -b:a 256k "{out_mp3}"'
print("Rendering master audio...")
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
if res.returncode != 0:
    print("Error:", res.stderr)
else:
    print("Master audio rendered successfully at:", out_mp3)
