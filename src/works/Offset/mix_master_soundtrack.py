import subprocess
import os

base_dir = r"d:\Dev Domain\~Projects\Offset"
audio_dir = os.path.join(base_dir, "assets", "audio")
sfx_dir = os.path.join(base_dir, "assets", "sfx")

music = os.path.join(audio_dir, "night_terrors_15s.mp3")
out_master = os.path.join(audio_dir, "master_soundtrack_pro.mp3")

# SFX files
sfx_whoosh_in = os.path.join(sfx_dir, "whoosh_in_1490.wav")
sfx_whoosh_out = os.path.join(sfx_dir, "whoosh_out_2017.wav")
sfx_whip = os.path.join(sfx_dir, "whip_1464.wav")
sfx_coin = os.path.join(sfx_dir, "coin_flip_2038.wav")
sfx_glitch = os.path.join(sfx_dir, "glitch_hit_1031.wav")
sfx_roll = os.path.join(sfx_dir, "roll_whoosh_168.wav")
sfx_pop1 = os.path.join(sfx_dir, "ui_pop_2356.wav")
sfx_pop2 = os.path.join(sfx_dir, "ui_pop_2358.wav")

# adelay takes milliseconds (L|R)
# 1.45s = 1450ms (Dive into world 1)
# 3.25s = 3250ms (Rolling dive into world 2)
# 5.25s = 5250ms (Whip pan)
# 6.85s = 6850ms (Coin flip)
# 7.35s = 7350ms (Chromatic smash)
# 9.05s = 9050ms (Re-hit pull-back)
# 11.25s = 11250ms (Logo pop)
# 12.90s = 12900ms (CTA press)

filter_complex = (
    # 0: Music
    "[0:a]volume=0.95[music];"
    # 1: Whoosh In at 1450ms (Dive into world 1)
    "[1:a]adelay=1450|1450,volume=2.6[sfx1];"
    # 2: Whoosh Out at 3250ms (Rolling dive into world 2)
    "[2:a]adelay=3250|3250,volume=2.4[sfx2];"
    # 3: Whip at 5250ms (Whip pan)
    "[3:a]adelay=5250|5250,volume=2.9[sfx3];"
    # 4: Coin flip at 6850ms (Coin flip)
    "[4:a]adelay=6850|6850,volume=2.2[sfx4];"
    # 5: Glitch hit at 7350ms (Chromatic smash)
    "[5:a]adelay=7350|7350,volume=3.2[sfx5];"
    # 6: Roll whoosh at 9050ms (Re-hit pull-back)
    "[6:a]adelay=9050|9050,volume=2.8[sfx6];"
    # 7: UI pop 1 at 11250ms (Logo bloom)
    "[7:a]adelay=11250|11250,volume=2.4[sfx7];"
    # 8: UI pop 2 at 12900ms (CTA press)
    "[8:a]adelay=12900|12900,volume=2.6[sfx8];"
    # Mix all 9 inputs without automatic 1/N volume attenuation (normalize=0)
    "[music][sfx1][sfx2][sfx3][sfx4][sfx5][sfx6][sfx7][sfx8]amix=inputs=9:duration=first:dropout_transition=0:normalize=0[mixed];"
    # Apply broadcast limiter & 15.000s clamp
    "[mixed]alimiter=limit=0.98:attack=5:release=50,atrim=0:15.0,asetpts=PTS-STARTPTS,afade=t=out:st=14.5:d=0.5[outa]"
)

cmd = (
    f'ffmpeg -y '
    f'-i "{music}" '
    f'-i "{sfx_whoosh_in}" '
    f'-i "{sfx_whoosh_out}" '
    f'-i "{sfx_whip}" '
    f'-i "{sfx_coin}" '
    f'-i "{sfx_glitch}" '
    f'-i "{sfx_roll}" '
    f'-i "{sfx_pop1}" '
    f'-i "{sfx_pop2}" '
    f'-filter_complex "{filter_complex}" '
    f'-map "[outa]" '
    f'-c:a libmp3lame -b:a 320k '
    f'"{out_master}"'
)

print("Mixing master soundtrack with professional Foley SFX...")
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
if res.returncode != 0:
    print("Error:", res.stderr)
else:
    print("Master soundtrack generated successfully at:", out_master)

