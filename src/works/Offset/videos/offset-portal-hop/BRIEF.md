---
workflow: general-video
flow: automation
storyboard: yes
message: "ANAKIN // Lead Motion Designer & Creative Director — One Director. Every Discipline."
destination: website-embed + shorts
aspect: 1920x1080 (master) + 1080x1920 (vertical cut)
language: en
audience: Creative Directors, Agencies, Brand Heads, Executive Producers
length: 15s
angle: directorial-showreel
narration: no
---

## Intent

User's brief: "Make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it's your show reel for a resume. Go all out. Use images and videos from internet."

Chosen concept — **Portal Hop**: one unbroken camera flight across 7 beat-locked frames. Sinking through the counter of a giant Zentry "O" into 3D Octane craft, whipping past chromatic prisms, craning onto tactical FUI telemetry, coin-flipping into high-velocity neon grids, collapsing to a point in the musical dropout, and snapping back out to reveal giant multi-video typography on the exact 1.85s beat grid.

## Assets & Fonts

- `assets/fonts/{zentry-regular,general,robert-medium}.woff2` — brand type.
- `assets/videos/{clip_3d.mp4,raw_12-aurora-glass.mp4,raw_22-hud.mp4,raw_synth.mp4,raw_07-liquid.mp4,raw_08-morph.mp4,raw_09-bauhaus.mp4}` — 1080p footage.
- `assets/audio/master_soundtrack_pro.mp3` — Arulo's "Night Terrors", 129.7 BPM, 1.85s bar grid, mixed with 8 uncompressed Foley SFX hits (`whoosh_in_1490`, `whoosh_out_2017`, `whip_1464`, `coin_flip_2038`, `glitch_hit_1031`, `roll_whoosh_168`, `ui_pop_2356`, `ui_pop_2358`).

## Motion Laws

- Dives & landings: `power4.out`
- Accelerating exits: `power3.in`, blur peaks at seam
- Pops & accents: `back.out(1.8)` spring overshoot
- 3D coin flip: `power2.inOut` (rotateY 0°→180°)
