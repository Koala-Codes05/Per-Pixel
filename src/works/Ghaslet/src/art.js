const I = '#140F0C';
let uid = 0;

export function rng(seed = 7) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- mascot (label character) ---------- */
const BROWS = {
  grin: 'M-32,-21 L-9,-12 M32,-21 L9,-12',
  smirk: 'M-33,-22 Q-21,-31 -8,-21 M32,-18 L9,-12',
  scream: 'M-32,-12 L-10,-23 M32,-12 L10,-23',
};
const eye = (x, squint) => squint
  ? `<path d="M${x - 10},3 Q${x},-6 ${x + 10},3" fill="none" stroke="${I}" stroke-width="4.5" stroke-linecap="round"/>`
  : `<g class="eye"><circle cx="${x}" cy="0" r="10.5" fill="#fff" stroke="${I}" stroke-width="3.5"/><circle class="pupil" cx="${x}" cy="1" r="4.8" fill="${I}"/></g>`;
const MOUTH = {
  grin: `<path d="M-29,17 Q0,52 29,17 Q0,27 -29,17Z" fill="#fff" stroke="${I}" stroke-width="4" stroke-linejoin="round"/><path d="M-15,22 L-13,34 M0,24 L0,39 M15,22 L13,34" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`,
  smirk: `<path d="M-20,26 Q4,40 27,15" fill="none" stroke="${I}" stroke-width="5" stroke-linecap="round"/><path d="M8,32 l3,7 l5,-9" fill="#fff" stroke="${I}" stroke-width="2.5" stroke-linejoin="round"/>`,
  scream: `<ellipse cx="0" cy="27" rx="14" ry="17" fill="${I}"/><ellipse cx="0" cy="36" rx="8.5" ry="6.5" fill="#ff5a6a"/><path d="M47,-34 q7,11 0,16 q-7,-5 0,-16z M-50,-22 q6,9 0,13 q-6,-4 0,-13z" fill="#7fd8ff" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>`,
};

export function mascot(s) {
  const ear = (x) => `<ellipse cx="${x}" cy="6" rx="10" ry="14" fill="${s.skin}" stroke="${I}" stroke-width="4"/>`;
  return `<g class="mascot">${ear(-46)}${ear(46)}
    <ellipse cx="0" cy="0" rx="46" ry="50" fill="${s.skin}" stroke="${I}" stroke-width="5"/>
    <ellipse cx="-16" cy="-31" rx="13" ry="6" fill="#fff" opacity=".55" transform="rotate(-22 -16 -31)"/>
    <circle cx="-31" cy="19" r="7" fill="#E5251B" opacity=".4"/><circle cx="31" cy="19" r="7" fill="#E5251B" opacity=".4"/>
    <path d="${BROWS[s.mood]}" stroke="${I}" stroke-width="7" stroke-linecap="round" fill="none"/>
    ${eye(-19, false)}${eye(19, s.mood === 'smirk')}${MOUTH[s.mood]}</g>`;
}

export const face = (s, cls = '') =>
  `<svg class="face ${cls}" viewBox="-62 -60 124 122" aria-hidden="true">${mascot(s)}</svg>`;

/* ---------- bottle ---------- */
const BODY = 'M74,60 L126,60 L126,118 C126,158 184,176 184,236 L184,522 Q184,550 156,550 L44,550 Q16,550 16,522 L16,236 C16,176 74,158 74,118 Z';

export function bottle(s, cls = '') {
  const n = ++uid, [d, m, l] = s.liquid;
  const ridges = Array.from({ length: 6 }, (_, i) => `<line x1="${77 + i * 9}" y1="14" x2="${77 + i * 9}" y2="50" stroke="#3b332d" stroke-width="3"/>`).join('');
  return `<svg class="bottle ${cls}" viewBox="0 0 200 560" role="img" aria-label="${s.name} hot sauce bottle" data-sauce="${s.id}">
  <defs>
    <linearGradient id="bl${n}" x1="0" x2="1"><stop offset="0" stop-color="${d}"/><stop offset=".26" stop-color="${m}"/><stop offset=".42" stop-color="${l}"/><stop offset=".62" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></linearGradient>
    <clipPath id="bc${n}"><path d="${BODY}"/></clipPath>
  </defs>
  <ellipse class="b-shadow" cx="100" cy="552" rx="92" ry="9" fill="${I}" opacity=".35"/>
  <path d="${BODY}" fill="url(#bl${n})"/>
  <g clip-path="url(#bc${n})">
    <rect x="60" y="60" width="80" height="30" fill="${d}" opacity=".75"/>
    <rect x="29" y="190" width="13" height="330" rx="6.5" fill="#fff" opacity=".42"/>
    <rect x="49" y="212" width="5" height="290" rx="2.5" fill="#fff" opacity=".28"/>
    <rect x="83" y="96" width="7" height="60" rx="3.5" fill="#fff" opacity=".35"/>
    <rect x="152" y="170" width="60" height="400" fill="#000" opacity=".22"/>
  </g>
  <path d="${BODY}" fill="none" stroke="${I}" stroke-width="6" stroke-linejoin="round"/>
  <g class="b-cap">
    <rect x="66" y="6" width="68" height="52" rx="8" fill="#1d1916" stroke="${I}" stroke-width="5"/>${ridges}
    <rect x="61" y="50" width="78" height="14" rx="5" fill="#1d1916" stroke="${I}" stroke-width="5"/>
    <rect x="71" y="12" width="5" height="34" rx="2.5" fill="#fff" opacity=".3"/>
  </g>
  <g class="b-label" transform="rotate(-1.4 100 388)">
    <rect x="21" y="262" width="158" height="250" rx="12" fill="${s.label}" stroke="${I}" stroke-width="5"/>
    <rect x="30" y="271" width="140" height="232" rx="7" fill="none" stroke="${s.accent}" stroke-width="2" stroke-dasharray="5 6" opacity=".6"/>
    <text x="100" y="318" text-anchor="middle" font-family="Bagel Fat One" font-size="38" fill="#fff" stroke="${I}" stroke-width="7" paint-order="stroke" stroke-linejoin="round" textLength="134" lengthAdjust="spacingAndGlyphs" rotate="-7 5 -4 6 -5 4 -6">GHASLET</text>
    <g transform="translate(100 391) scale(.8)">${mascot(s)}</g>
    <text x="42" y="468" font-family="Gochi Hand" font-size="23" fill="${s.accent}" transform="rotate(-9 42 468)">The</text>
    <text x="100" y="497" text-anchor="middle" font-family="Bagel Fat One" font-size="34" fill="${s.accent}" stroke="${I}" stroke-width="6" paint-order="stroke" stroke-linejoin="round" textLength="${Math.min(138, s.word.length * 21)}" lengthAdjust="spacingAndGlyphs">${s.word}</text>
  </g>
</svg>`;
}

/* ---------- logo: jerrycan ---------- */
export const logoCan = (cls = '') => `<svg class="logo-can ${cls}" viewBox="0 0 124 116" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M32,24 L46,12 L106,12 Q114,12 114,20 L114,104 Q114,112 106,112 L22,112 Q14,112 14,104 L14,42 Z"/>
    <path d="M25,31 L9,16 L18,7 L35,22"/>
    <path d="M60,12 L60,4 L108,4 L108,12"/>
    <path d="M70,22 H82 M90,22 H102"/>
  </g>
  <g fill="currentColor" font-family="Bagel Fat One" text-anchor="middle" transform="rotate(-8 64 74)">
    <text x="64" y="70" font-size="25" textLength="82" lengthAdjust="spacingAndGlyphs">GHASLET</text>
    <text x="64" y="97" font-size="19" textLength="76" lengthAdjust="spacingAndGlyphs">HOT SAUCE</text>
  </g></svg>`;

/* ---------- stickers + doodles ---------- */
export function burstPath(n = 14, r1 = 47, r2 = 37, seed = 3) {
  const r = rng(seed); let d = '';
  for (let i = 0; i < n * 2; i++) {
    const rad = (i % 2 ? r2 : r1) + (r() - 0.5) * 3.5, a = (Math.PI * i) / n - Math.PI / 2;
    d += `${i ? 'L' : 'M'}${(50 + Math.cos(a) * rad).toFixed(1)},${(50 + Math.sin(a) * rad).toFixed(1)}`;
  }
  return d + 'Z';
}

export const burst = (fill, n, seed, cls = '') =>
  `<svg class="burst ${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="${burstPath(n, 47, 38, seed)}" fill="${fill}" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/></svg>`;

export function ringBadge(text, fill = '#FFC21A', ink = I, center = '') {
  const id = `ring${++uid}`;
  return `<svg class="ring" viewBox="0 0 200 200" aria-hidden="true">
  <defs><path id="${id}" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"/></defs>
  <circle cx="100" cy="100" r="95" fill="${fill}" stroke="${I}" stroke-width="5"/>
  <circle cx="100" cy="100" r="52" fill="none" stroke="${ink}" stroke-width="2.5" stroke-dasharray="4 6"/>
  <g class="ring-spin"><text font-family="Archivo" font-weight="800" font-size="19" letter-spacing="2.4" fill="${ink}" style="font-stretch:110%"><textPath href="#${id}">${text}</textPath></text></g>
  <g transform="translate(100 100)">${center}</g></svg>`;
}

export const DOODLE = {
  arrow: '<path d="M6,46 C24,10 62,4 78,26 C90,44 64,58 57,40 C50,22 86,8 118,26"/><path d="M104,14 L119,27 L101,36"/>',
  squiggle: '<path d="M3,12 Q13,2 23,12 T43,12 T63,12 T83,12 T103,12 T123,12"/>',
  star: '<path d="M40,6 L49,30 L75,31 L54,46 L62,72 L40,57 L18,72 L26,46 L5,31 L31,30 Z"/>',
  spiral: '<path d="M50,50 m0,0 c4,-4 10,0 8,6 c-3,9 -16,8 -18,-2 c-3,-14 14,-22 25,-14 c14,10 8,32 -10,34 c-22,3 -34,-22 -22,-40"/>',
  zap: '<path d="M10,8 L30,30 M50,2 L50,30 M90,8 L70,30"/>',
  loop: '<path d="M4,40 C30,40 34,8 52,10 C70,12 60,40 44,34 C28,28 60,4 120,26"/>',
  chilli: '<path d="M22,34 C44,22 74,28 94,64 C99,76 91,80 83,72 C64,52 44,48 26,50 C15,50 13,38 22,34Z"/><path d="M22,36 C15,28 13,20 20,13"/>',
  cloud: '<path d="M22,58 Q4,58 8,44 Q6,26 26,28 Q30,10 50,14 Q62,2 76,16 Q98,12 98,34 Q114,38 108,52 Q106,60 92,58 Z"/>',
};
export const doodle = (name, vb, cls = '', sw = 4) =>
  `<svg class="doodle ${cls}" viewBox="${vb}" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" filter="url(#boil)">${DOODLE[name]}</g></svg>`;

/* ---------- sauce drips (section seam) ---------- */
export function drips(color, seed = 11, count = 26) {
  const r = rng(seed); let g = '';
  for (let i = 0; i < count; i++) {
    const x = (i / count) * 1440 + r() * 30, w = 16 + r() * 34, len = 30 + r() * r() * 170;
    g += `<g class="drip" style="transform-origin:${x + w / 2}px 0"><rect x="${x}" y="-2" width="${w}" height="${len}" rx="${w / 2}"/><circle cx="${x + w / 2}" cy="${len - w * 0.38}" r="${w * 0.62}"/></g>`;
  }
  return `<svg class="drips" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMin slice" aria-hidden="true"><g fill="${color}"><rect x="0" y="-10" width="1440" height="26"/>${g}</g></svg>`;
}

/* ---------- traffic light ---------- */
const LAMPS = [
  ['stop', '#FF2D1F', '#4a0e0a', 112, '<path d="M-24,-18 l12,10 m0,-10 l-12,10 M12,-18 l12,10 m0,-10 l-12,10"/><ellipse cx="0" cy="22" rx="13" ry="15"/>'],
  ['wait', '#FFC21A', '#4a3608', 286, '<path d="M-26,-12 h14 M12,-12 h14"/><rect x="-24" y="10" width="48" height="20" rx="4"/><path d="M-12,10 v20 M0,10 v20 M12,10 v20"/>'],
  ['go', '#22D35E', '#0c3a1c', 460, '<circle cx="-17" cy="-12" r="3.5"/><circle cx="17" cy="-12" r="3.5"/><path d="M-22,12 Q0,34 22,12"/>'],
];
export function trafficLight() {
  const lamps = LAMPS.map(([k, on, off, cy, f]) => `
    <path d="M44,${cy - 52} L8,${cy - 40} L8,${cy + 8} L44,${cy + 30}Z M176,${cy - 52} L212,${cy - 40} L212,${cy + 8} L176,${cy + 30}Z" fill="#26221f" stroke="${I}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="110" cy="${cy}" r="66" fill="#0b0908"/>
    <circle class="lamp-glow" data-lamp="${k}" cx="110" cy="${cy}" r="62" fill="${on}" filter="url(#glow)" opacity="0"/>
    <circle class="lamp" data-lamp="${k}" cx="110" cy="${cy}" r="58" fill="${off}" data-on="${on}" data-off="${off}" stroke="${I}" stroke-width="4"/>
    <ellipse cx="88" cy="${cy - 26}" rx="16" ry="8" fill="#fff" opacity=".22" transform="rotate(-30 88 ${cy - 26})"/>
    <g class="lamp-face" data-lamp="${k}" transform="translate(110 ${cy})" fill="none" stroke="${I}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".18">${f}</g>
    <path d="M38,${cy - 18} A72,72 0 0 1 182,${cy - 18} L172,${cy - 4} A62,62 0 0 0 48,${cy - 4}Z" fill="#141110" stroke="${I}" stroke-width="4" stroke-linejoin="round"/>`).join('');
  return `<svg class="tlight" viewBox="0 0 220 590" role="img" aria-label="Traffic light heat scale">
    <rect x="44" y="24" width="132" height="532" rx="40" fill="#2b2622" stroke="${I}" stroke-width="6"/>
    <rect x="58" y="36" width="10" height="500" rx="5" fill="#fff" opacity=".08"/>${lamps}</svg>`;
}

/* ---------- shared filters ---------- */
export const FILTERS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="boil" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="1"/><feDisplacementMap in="SourceGraphic" scale="3.5"/></filter>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16"/></filter>
</svg>`;
