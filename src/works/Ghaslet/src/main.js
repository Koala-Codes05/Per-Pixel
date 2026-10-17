import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';
import { SAUCES, byId, PAIRINGS, REEL, IG } from './data.js';
import * as art from './art.js';
import { initShop } from './shop.js';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Physics2DPlugin, DrawSVGPlugin);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const mobile = () => innerWidth <= 860;

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
scrollTo(0, 0);

/* ============ render art + content ============ */
const heat = (n) => `<div class="heat" role="img" aria-label="Heat ${n} of 3"><span class="label">Heat</span>${[1, 2, 3].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`;
const NAME_COLOR = { classic: '#FFC21A', smokey: '#FFF4E0', spicy: '#FFF4E0' };
const CARD_FG = { classic: '#FFF4E0', smokey: '#140F0C', spicy: '#140F0C' };
const CARD_BURST = { classic: '#FFC21A', smokey: '#FF6A13', spicy: '#FFC21A' };

function render() {
  $('#filters').innerHTML = art.FILTERS;
  $('[data-logo]').innerHTML = art.logoCan();
  $('.loader-can').innerHTML = art.logoCan('lc-ghost') + `<div class="lc-fill">${art.logoCan()}</div>`;
  $$('[data-bottle]').forEach((el) => (el.innerHTML = art.bottle(byId[el.dataset.bottle])));
  $$('[data-mini]').forEach((el) => (el.innerHTML = art.bottle(byId[el.dataset.mini])));
  $$('[data-face]').forEach((el) => (el.innerHTML = art.face(byId[el.dataset.face])));
  $$('[data-doodle]').forEach((el) => (el.innerHTML = art.doodle(el.dataset.doodle, el.dataset.vb)));
  $$('[data-burst]').forEach((el) => (el.innerHTML = art.burst(el.dataset.burst, +el.dataset.n, +el.dataset.seed)));
  $$('[data-ring]').forEach((el) => (el.innerHTML = art.ringBadge(el.dataset.ring, '#FFC21A', '#140F0C', `<g transform="scale(.66)">${art.mascot(byId.classic)}</g>`)));
  $$('[data-drips]').forEach((el) => (el.innerHTML = art.drips(el.dataset.drips)));
  $('[data-tlight]').innerHTML = art.trafficLight();
  $$('[data-ig]').forEach((a) => { a.href = IG; a.target = '_blank'; a.rel = 'noopener'; });

  $('[data-range-info]').innerHTML = SAUCES.map((s, i) => `
    <article class="ri" data-i="${i}" ${i ? 'inert' : ''}>
      <p class="ri-tag hand">${s.tag}</p>
      <h3 class="ri-name type-sticker">${s.name}</h3>
      <ul class="ri-chips">${s.flavour.map((f) => `<li>${f}</li>`).join('')}</ul>
      <p class="ri-notes">${s.notes}</p>
      ${heat(s.heat)}
      <div class="ri-buy"><span class="price">₹${s.price}</span><button class="btn btn-yolk" type="button" data-add="${s.id}"><span>Add ${s.name.replace('The ', '')} to bag</span></button></div>
    </article>`).join('');

  $('[data-reel]').innerHTML = REEL.map(([src, cap, date], i) => `
    <figure class="frame" style="--r:${[-4, 3, -2, 5, -3, 2][i]}deg">
      <span class="tape-bit"></span>
      <div class="frame-img"><img src="${import.meta.env.BASE_URL}assets/${src}" alt="Ghaslet flash photo: ${cap}" loading="lazy" decoding="async" /><span class="frame-flash"></span></div>
      <span class="stamp">'${date}</span>
      <figcaption>${cap}</figcaption>
    </figure>`).join('');

  $('[data-menu]').innerHTML = PAIRINGS.map(([dish, id, hint]) => {
    const s = byId[id];
    return `<li class="menu-row" data-sauce="${id}" style="--c:${s.label};--fg:${CARD_FG[id]}"><div class="mr"><span class="mr-dish">${dish}</span><span class="mr-lead"></span><span class="mr-sauce"><b><i></i>${s.name}</b><span class="hand">${hint}</span></span></div></li>`;
  }).join('');
  $('.menu-float').innerHTML = SAUCES.map((s) => `<div class="mf-b" data-sauce="${s.id}">${art.bottle(s)}</div>`).join('');

  $('[data-shop]').innerHTML = SAUCES.map((s, i) => `
    <article class="card" data-sauce="${s.id}" style="--c:${s.label};--fg:${CARD_FG[s.id]}">
      <div class="card-top"><p class="card-tag hand">${s.tag}</p><span class="label">Heat ${s.heat}/3</span></div>
      <div class="card-stage" data-cursor="shake">${art.burst(CARD_BURST[s.id], 16, 20 + i)}${art.bottle(s)}</div>
      <h3 class="card-name type-sticker" style="color:${NAME_COLOR[s.id]}">${s.name}</h3>
      <p class="card-notes">${s.notes}</p>
      ${heat(s.heat)}
      <div class="card-buy">
        <span class="price">₹${s.price}</span>
        <div class="qty"><button type="button" data-q="-1" aria-label="One fewer ${s.name}">−</button><output aria-live="polite">1</output><button type="button" data-q="1" aria-label="One more ${s.name}">+</button></div>
        <button class="btn btn-ink" type="button" data-add="${s.id}"><span>Add to bag</span></button>
      </div>
    </article>`).join('');

  $('.foot-word').innerHTML = [...'GHASLET'].map((c) => `<span>${c}</span>`).join('');
}
render();

/* ============ smooth scroll ============ */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const { toast } = initShop({ lenis, reduce });

/* ============ nav hide on scroll ============ */
const nav = $('.nav');
let lastY = 0;
const onScroll = (y) => { nav.classList.toggle('is-hidden', y > lastY && y > innerHeight * 0.6 && !$('#bag').classList.contains('is-open')); lastY = y; };
lenis ? lenis.on('scroll', (l) => onScroll(l.scroll)) : addEventListener('scroll', () => onScroll(scrollY), { passive: true });

/* ============ line boil on doodles ============ */
if (!reduce) {
  const turb = $('#boil feTurbulence'); let seed = 1;
  setInterval(() => { seed = (seed % 4) + 1; turb.setAttribute('seed', seed); }, 120);
}

/* ============ custom cursor label ============ */
if (fine) {
  const cur = $('.cursor'), label = $('.cursor-label');
  const qx = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' }), qy = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => { qx(e.clientX); qy(e.clientY); }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor]');
    cur.classList.toggle('is-on', !!t);
    if (t) label.textContent = t.dataset.cursor;
  });
}

/* ============ eyes follow the pointer ============ */
if (fine && !reduce) {
  let px = innerWidth / 2, py = innerHeight / 2, ticking = false;
  const eyes = $$('.eye').map((g) => ({ g, p: g.querySelector('.pupil') }));
  const look = () => {
    ticking = false;
    for (const { g, p } of eyes) {
      const r = g.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight || !r.width) continue;
      const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 300) * 4.2;
      gsap.to(p, { x: (dx / d) * k, y: (dy / d) * k, duration: 0.3, overwrite: true });
    }
  };
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; if (!ticking) { ticking = true; requestAnimationFrame(look); } }, { passive: true });
}

/* ============ shake a bottle: sauce droplets ============ */
function squirt(host) {
  const svg = host.querySelector('.bottle'); if (!svg) return;
  const s = byId[svg.dataset.sauce];
  gsap.fromTo(svg, { x: 0 }, { keyframes: { x: [-12, 12, -10, 10, -6, 6, 0] }, duration: 0.45, ease: 'none', overwrite: 'auto' });
  if (reduce) return;
  const r = svg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * 0.06;
  for (let i = 0; i < 16; i++) {
    const d = document.createElement('i'), size = gsap.utils.random(8, 22);
    Object.assign(d.style, { position: 'fixed', left: `${cx}px`, top: `${cy}px`, width: `${size}px`, height: `${size * 1.15}px`, margin: `${-size / 2}px 0 0 ${-size / 2}px`, background: s.liquid[1], border: '2px solid #140F0C', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', zIndex: 94, pointerEvents: 'none' });
    document.body.append(d);
    gsap.to(d, { duration: gsap.utils.random(0.9, 1.4), physics2D: { velocity: gsap.utils.random(420, 900), angle: gsap.utils.random(-160, -20), gravity: 1700 }, rotation: gsap.utils.random(-360, 360), onComplete: () => d.remove() });
    gsap.to(d, { opacity: 0, duration: 0.3, delay: 0.8 });
  }
}
document.addEventListener('click', (e) => { const h = e.target.closest('.hb, .rb, .card-stage'); if (h) squirt(h); });

/* ============ helpers ============ */
function splitWords(el) {
  [...el.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(' ');
        const w = document.createElement('span'); w.className = 'w'; w.textContent = part; frag.append(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) n.classList.add('w');
  });
  return $$('.w', el);
}

function popChars(el) {
  const split = SplitText.create(el, { type: 'words,chars', charsClass: 'char' });
  gsap.from(split.chars, {
    yPercent: 70, rotation: () => gsap.utils.random(-28, 28), scale: 0.5, opacity: 0,
    duration: 0.9, ease: 'back.out(2.2)', stagger: 0.028,
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
}

const wiggle = (el, amt = 8) => gsap.fromTo(el, { x: 0 }, { keyframes: { x: [-amt, amt, -amt * 0.7, amt * 0.7, -amt * 0.3, 0] }, duration: 0.42, ease: 'none' });

/* ============ hero intro ============ */
function heroIn() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.hero-sun', { scale: 0.3, opacity: 0, duration: 1.8 }, 0)
    .from('.hw', { yPercent: 140, rotation: () => gsap.utils.random(-45, 45), scale: 0.4, duration: 1.3, ease: 'elastic.out(1, .55)', stagger: { each: 0.06, from: 'center' } }, 0)
    .from('.hb-c', { yPercent: 75, rotation: 22, duration: 1.2, ease: 'back.out(1.5)' }, 0.18)
    .from('.hb-l', { yPercent: 95, xPercent: -40, rotation: -40, duration: 1.2, ease: 'back.out(1.3)' }, 0.32)
    .from('.hb-r', { yPercent: 95, xPercent: 40, rotation: 40, duration: 1.2, ease: 'back.out(1.3)' }, 0.38)
    .from('.nav', { yPercent: -140, duration: 1 }, 0.5)
    .from('.sticker', { scale: 2.6, opacity: 0, rotation: (i) => [-60, 50, 35][i], duration: 0.45, ease: 'back.out(2.4)', stagger: 0.14 }, 0.8)
    .add(() => wiggle('.hero-bottles', 7), 1.0)
    .from('.hero-kicker span, .hero-sub, .ctas .btn, .hero-scroll, .peel-hint', { y: 26, opacity: 0, duration: 0.9, stagger: 0.07 }, 0.85)
    .from('.hero-note .hand', { opacity: 0, rotation: -20, duration: 0.6 }, 1.2)
    .from('.hero-note path', { drawSVG: 0, duration: 0.9, ease: 'power2.inOut' }, 1.25)
    .from('.hero-drips .drip', { scaleY: 0, transformOrigin: '50% 0%', duration: 1.4, ease: 'power3.out', stagger: { each: 0.02, from: 'random' } }, 0.6);
  return tl;
}

/* ============ hero idle + interaction ============ */
function heroLife() {
  gsap.to('.hero-sun', { rotation: 360, duration: 110, repeat: -1, ease: 'none' });
  gsap.to('.ring-spin', { rotation: 360, svgOrigin: '100 100', duration: 16, repeat: -1, ease: 'none' });
  $$('.hb .bottle').forEach((b, i) => gsap.to(b, { y: -12, rotation: i % 2 ? -1.6 : 1.6, duration: 2.2 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 }));

  if (fine) {
    const hero = $('.hero');
    const layers = [['.hero-word', -14], ['.hero-bottles', 22], ['.hero-sun', -30]].map(([s, k]) => ({ k, x: gsap.quickTo(s, 'x', { duration: 0.9, ease: 'power3' }), y: gsap.quickTo(s, 'y', { duration: 0.9, ease: 'power3' }) }));
    hero.addEventListener('pointermove', (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      layers.forEach((l) => { l.x(nx * l.k * 2); l.y(ny * l.k); });
    });
  }

  let z = 10;
  Draggable.create('.sticker', {
    type: 'x,y', inertia: true, bounds: '.hero', edgeResistance: 0.65,
    onPress() { this.target.style.zIndex = ++z; gsap.to(this.target, { scale: 1.1, duration: 0.2, ease: 'power2.out' }); },
    onDrag() { gsap.to(this.target, { rotation: gsap.utils.clamp(-25, 25, this.deltaX * 2.2), duration: 0.3 }); },
    onRelease() { gsap.to(this.target, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(3)' }); },
  });
}

/* ============ scroll scenes ============ */
function scenes() {
  // hero exit
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .fromTo('.hw', { yPercent: 0, rotation: 0 }, { yPercent: (i) => -50 - (i % 3) * 35, rotation: (i) => (i - 3) * 7, ease: 'none' }, 0)
    .fromTo('.hb-c', { yPercent: 0, rotation: 0, scale: 1 }, { yPercent: -10, rotation: 7, scale: 0.92, ease: 'none' }, 0)
    .fromTo('.hb-l', { xPercent: 0, yPercent: 0, rotation: 0 }, { xPercent: -60, yPercent: 18, rotation: -26, ease: 'none' }, 0)
    .fromTo('.hb-r', { xPercent: 0, yPercent: 0, rotation: 0 }, { xPercent: 60, yPercent: 18, rotation: 26, ease: 'none' }, 0)
    .to('.hero-foot, .hero-kicker, .hero-scroll, .peel-hint, .hero-note', { y: -90, opacity: 0, ease: 'none' }, 0)
    .fromTo('.hero-drips .drip', { scaleY: 1 }, { scaleY: () => gsap.utils.random(1.4, 2.4), transformOrigin: '50% 0%', ease: 'none' }, 0);

  // tapes: scroll-velocity marquees
  $$('.tape').forEach((tape, i) => {
    const track = $('.tape-track', tape); const unit = track.innerHTML;
    track.innerHTML = unit.repeat(8);
    const dir = i ? 1 : -1; let pos = 0, boost = 0;
    const setX = gsap.quickSetter(track, 'xPercent');
    gsap.ticker.add((t, dt) => {
      const v = lenis ? lenis.velocity : 0;
      boost += (Math.abs(v) * 0.06 - boost) * 0.1;
      const sign = lenis && lenis.direction < 0 ? -1 : 1;
      pos = gsap.utils.wrap(-50, 0, pos + dir * sign * (0.012 + boost * 0.02) * dt * 0.06 * (reduce ? 0 : 1));
      setX(pos);
    });
  });

  // manifesto
  const words = splitWords($('.mf-text'));
  gsap.to(words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.mf-text', start: 'top 78%', end: 'bottom 50%', scrub: true } });
  gsap.from('.pill', { scale: 0.4, rotation: -30, ease: 'back.out(3)', duration: 0.7, stagger: 0.25, scrollTrigger: { trigger: '.mf-text', start: 'top 60%', once: true } });
  $$('.md').forEach((m, i) => gsap.to(m, { yPercent: -60 - i * 50, rotation: `+=${40 + i * 30}`, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('.manifesto .doodle path, .mf-aside .doodle path').forEach((p) => gsap.from(p, { drawSVG: 0, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('div'), start: 'top 85%', once: true } }));
  gsap.from('.mf-aside .hand', { opacity: 0, rotation: -14, y: 20, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: '.mf-aside', start: 'top 85%', once: true } });

  $$('[data-chars]').forEach(popChars);

  rangeScene();
  reelScene();
  menuScene();
  shopScene();
  footScene();
}

function rangeScene() {
  const rbs = $$('.rb'), ris = $$('.ri'), steps = $$('.range-steps li');
  const burst = $('.range-burst path'), n = SAUCES.length, mv = reduce ? 0 : 1;
  const lampColor = { go: '#22D35E', wait: '#FFC21A', stop: '#FF2D1F' };
  let cur = -1;

  const setLight = (i) => {
    if (i === cur) return; const prev = cur; cur = i;
    const key = SAUCES[i].light;
    $$('.lamp').forEach((l) => gsap.to(l, { attr: { fill: l.dataset.lamp === key ? l.dataset.on : l.dataset.off }, duration: 0.18 }));
    $$('.lamp-glow').forEach((l) => gsap.to(l, { opacity: l.dataset.lamp === key ? 0.9 : 0, duration: 0.25 }));
    $$('.lamp-face').forEach((l) => gsap.to(l, { opacity: l.dataset.lamp === key ? 1 : 0.18, duration: 0.2 }));
    burst.setAttribute('fill', lampColor[key]);
    steps.forEach((s, j) => s.classList.toggle('on', j === i));
    ris.forEach((r, j) => r.toggleAttribute('inert', j !== i));
    if (prev !== -1 && key === 'stop' && mv) { wiggle('.range-stage', 10); wiggle('.range-light', 6); }
  };
  setLight(0);

  if (mv) gsap.to('.range-burst', { rotation: 360, duration: 40, repeat: -1, ease: 'none' });
  $$('.cl').forEach((c, i) => gsap.to(c, { x: i % 2 ? -60 : 60, duration: 7 + i * 2, repeat: -1, yoyo: true, ease: 'sine.inOut' }));

  gsap.set(rbs.slice(1), { xPercent: 70 * mv, yPercent: 10 * mv, rotation: 28 * mv, opacity: 0 });
  gsap.set(ris.slice(1), { autoAlpha: 0, y: 40 * mv });

  const STEP = 1.6;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.range', start: 'top top', end: () => `+=${innerHeight * 2.4}`, pin: '.range-pin', scrub: 0.6,
      snap: { snapTo: 'labelsDirectional', duration: { min: 0.2, max: 0.6 }, delay: 0.05, ease: 'power2.inOut' },
    },
    onUpdate: () => setLight(Math.min(n - 1, Math.max(0, Math.round((tl.time() - 0.05) / STEP)))),
  });
  tl.addLabel('s0', 0);
  for (let i = 1; i < n; i++) {
    const t = (i - 1) * STEP + 0.3;
    tl.to(rbs[i - 1], { xPercent: -80 * mv, yPercent: 12 * mv, rotation: -32 * mv, opacity: 0, duration: 0.8, ease: 'power2.in' }, t)
      .to(rbs[i], { xPercent: 0, yPercent: 0, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, t + 0.45)
      .to(ris[i - 1], { autoAlpha: 0, y: -40 * mv, duration: 0.5, ease: 'power2.in' }, t)
      .to(ris[i], { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, t + 0.65)
      .addLabel(`s${i}`, t + 1.3);
  }
  tl.to({}, { duration: 0.3 });
}

function reelScene() {
  const track = $('.reel-track');
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  const hz = gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.reel', start: 'top top', end: () => `+=${dist()}`, pin: '.reel-pin', scrub: 0.8, invalidateOnRefresh: true },
  });
  $$('.frame').forEach((f) => {
    const img = $('img', f), fl = $('.frame-flash', f);
    if (!reduce) gsap.fromTo(img, { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: f, containerAnimation: hz, start: 'left right', end: 'right left', scrub: true } });
    ScrollTrigger.create({
      trigger: f, containerAnimation: hz, start: 'left 62%', once: true,
      onEnter: () => { gsap.fromTo(fl, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: 'power2.out' }); if (!reduce) gsap.from(f, { scale: 1.06, duration: 0.6, ease: 'expo.out' }); },
    });
  });
  if (lenis) {
    const skew = gsap.quickTo('.reel-frames', 'skewX', { duration: 0.5, ease: 'power3' });
    lenis.on('scroll', (l) => { const r = $('.reel').getBoundingClientRect(); if (r.top <= 0 && r.bottom >= innerHeight) skew(gsap.utils.clamp(-7, 7, -l.velocity * 0.35)); else skew(0); });
  }
}

function menuScene() {
  gsap.from('.menu-row', { y: 50, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '.menu-list', start: 'top 82%', once: true } });
  if (!fine) return;
  const menu = $('.menu'), fl = $('.menu-float'), bs = $$('.mf-b', fl);
  const qx = gsap.quickTo(fl, 'x', { duration: 0.6, ease: 'power3' }), qy = gsap.quickTo(fl, 'y', { duration: 0.6, ease: 'power3' });
  const qr = gsap.quickTo(fl, 'rotation', { duration: 0.6, ease: 'power3' });
  let lx = 0;
  menu.addEventListener('pointermove', (e) => {
    const r = menu.getBoundingClientRect();
    const x = e.clientX - r.left - fl.offsetWidth / 2, y = e.clientY - r.top - fl.offsetHeight * 0.55;
    qx(x + 90); qy(y); qr(gsap.utils.clamp(-30, 30, (e.clientX - lx) * 1.4)); lx = e.clientX;
  });
  $$('.menu-row').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      bs.forEach((b) => (b.style.display = b.dataset.sauce === row.dataset.sauce ? 'block' : 'none'));
      gsap.to(fl, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' });
    });
  });
  $('.menu-list').addEventListener('pointerleave', () => gsap.to(fl, { opacity: 0, scale: 0.7, duration: 0.25 }));
  gsap.set(fl, { scale: 0.7 });
}

function shopScene() {
  gsap.from('.card', { y: 140, rotation: (i) => [-8, 4, 9][i], opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.shop-grid', start: 'top 85%', once: true } });
  if (!reduce) gsap.to('.card-stage .burst', { rotation: 360, duration: 30, repeat: -1, ease: 'none' });
  if (!fine) return;
  $$('.card-stage').forEach((st) => {
    const b = $('.bottle', st);
    const rx = gsap.quickTo(b, 'rotationX', { duration: 0.6, ease: 'power3' }), ry = gsap.quickTo(b, 'rotationY', { duration: 0.6, ease: 'power3' }), rz = gsap.quickTo(b, 'rotation', { duration: 0.6, ease: 'power3' });
    st.addEventListener('pointermove', (e) => {
      const r = st.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      ry(nx * 34); rx(-ny * 14); rz(nx * 8);
    });
    st.addEventListener('pointerleave', () => { rx(0); ry(0); rz(0); });
  });
}

function footScene() {
  const ls = $$('.foot-word span');
  gsap.from(ls, { yPercent: -180, rotation: () => gsap.utils.random(-50, 50), opacity: 0, duration: 1.3, ease: 'bounce.out', stagger: 0.07, scrollTrigger: { trigger: '.foot-word', start: 'top 92%', once: true } });
  const hop = (l, big) => gsap.timeline().to(l, { yPercent: big ? -45 : -18, rotation: gsap.utils.random(-14, 14), duration: big ? 0.3 : 0.2, ease: 'power2.out' }).to(l, { yPercent: 0, rotation: 0, duration: big ? 0.9 : 0.6, ease: 'bounce.out' });
  ls.forEach((l) => { l.addEventListener('pointerenter', () => hop(l)); l.addEventListener('click', () => hop(l, true)); });
}

/* ============ boot ============ */
async function boot() {
  if (reduce) {
    $('.loader').style.display = 'none';
    await document.fonts.ready;
    scenes(); heroLife();
    return;
  }
  lenis.stop();
  const fill = $('.lc-fill'), count = $('.loader-count'), o = { v: 0 };
  const load = gsap.to(o, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(o.v)).padStart(2, '0'); fill.style.clipPath = `inset(${100 - o.v}% 0 0 0)`; } });
  await Promise.all([document.fonts.ready, load.then()]);
  gsap.timeline()
    .to('.loader-can', { scale: 1.18, rotation: -10, duration: 0.22, ease: 'power2.out' })
    .set('.flash', { opacity: 1 })
    .set('.loader', { display: 'none' })
    .to('.flash', { opacity: 0, duration: 0.8, ease: 'power2.out' })
    .add(heroIn().eventCallback('onComplete', () => { scenes(); heroLife(); lenis.start(); ScrollTrigger.refresh(); }), '<');
}
boot();

window.__ghaslet = { toast, gsap, ScrollTrigger, lenis };
