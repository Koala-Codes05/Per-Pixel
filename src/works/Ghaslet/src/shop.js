import gsap from 'gsap';
import { byId, SAUCES } from './data.js';
import { bottle, face } from './art.js';

const $ = (s, r = document) => r.querySelector(s);
const DM = 'https://ig.me/m/ghaslet.in';

export function initShop({ lenis, reduce }) {
  const bag = new Map();
  const drawer = $('#bag'), scrim = $('.bag-scrim'), btn = $('.bag-btn'), list = $('.bag-items');
  const count = $('.bag-count'), total = $('.bag-total b'), empty = $('.bag-empty'), cta = $('.bag-cta'), toastEl = $('.toast');
  let tt;

  const toast = (msg) => {
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  };

  const qtyCtl = (id, q) => `<div class="qty"><button type="button" data-bq="-1" data-id="${id}" aria-label="One fewer ${byId[id].name}">−</button><output>${q}</output><button type="button" data-bq="1" data-id="${id}" aria-label="One more ${byId[id].name}">+</button></div>`;

  function render() {
    const items = [...bag].filter(([, q]) => q > 0);
    const n = items.reduce((a, [, q]) => a + q, 0);
    const sum = items.reduce((a, [id, q]) => a + q * byId[id].price, 0);
    count.textContent = n;
    total.textContent = `₹${sum.toLocaleString('en-IN')}`;
    empty.hidden = n > 0;
    cta.toggleAttribute('aria-disabled', n === 0);
    list.innerHTML = items.map(([id, q]) => {
      const s = byId[id];
      return `<li class="bag-item" style="--c:${s.label}">${face(s)}<div><h3>${s.name}</h3>${qtyCtl(id, q)}</div><b>₹${(q * s.price).toLocaleString('en-IN')}</b></li>`;
    }).join('');
  }

  function fly(from, id) {
    if (reduce || !from) return;
    const a = from.getBoundingClientRect(), b = count.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'fly'; el.innerHTML = bottle(byId[id]);
    document.body.append(el);
    const x0 = a.left + a.width / 2 - 22, y0 = a.top - 40, x1 = b.left + b.width / 2 - 22, y1 = b.top - 20;
    gsap.set(el, { x: x0, y: y0, rotation: -20 });
    gsap.timeline({ onComplete: () => { el.remove(); bump(); } })
      .to(el, { x: x1, duration: .75, ease: 'power1.inOut' }, 0)
      .to(el, { y: Math.min(y0, y1) - 140, duration: .32, ease: 'power2.out' }, 0)
      .to(el, { y: y1, duration: .43, ease: 'power2.in' }, .32)
      .to(el, { rotation: 340, scale: .45, duration: .75, ease: 'power1.in' }, 0);
  }

  const bump = () => gsap.fromTo(btn, { scale: 1.2, rotation: -8 }, { scale: 1, rotation: 0, duration: .9, ease: 'elastic.out(1, .4)' });

  function add(id, n, from) {
    bag.set(id, (bag.get(id) || 0) + n);
    render(); fly(from, id);
    if (reduce) bump();
    toast(`${n} × ${byId[id].name} in the bag`);
  }

  function setOpen(open) {
    drawer.classList.toggle('is-open', open);
    drawer.toggleAttribute('inert', !open);
    drawer.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    if (open) { scrim.hidden = false; requestAnimationFrame(() => scrim.classList.add('is-open')); lenis?.stop(); $('.bag-close').focus(); }
    else { scrim.classList.remove('is-open'); setTimeout(() => { if (!drawer.classList.contains('is-open')) scrim.hidden = true; }, 300); lenis?.start(); btn.focus(); }
  }

  document.addEventListener('click', (e) => {
    const t = e.target;
    const addBtn = t.closest('[data-add]');
    if (addBtn) {
      const out = addBtn.closest('.card')?.querySelector('output');
      add(addBtn.dataset.add, out ? +out.value || +out.textContent : 1, addBtn);
      return;
    }
    const q = t.closest('[data-q]');
    if (q) {
      const out = q.closest('.qty').querySelector('output');
      out.textContent = Math.min(12, Math.max(1, +out.textContent + +q.dataset.q));
      return;
    }
    const bq = t.closest('[data-bq]');
    if (bq) {
      const id = bq.dataset.id;
      bag.set(id, Math.max(0, (bag.get(id) || 0) + +bq.dataset.bq));
      render();
      list.querySelector(`[data-id="${id}"][data-bq="${bq.dataset.bq}"]`)?.focus();
      return;
    }
    if (t.closest('.bag-btn')) return setOpen(!drawer.classList.contains('is-open'));
    if (t.closest('.bag-close') || t === scrim) return setOpen(false);
    if (t.closest('.bag-cta')) {
      e.preventDefault();
      const items = [...bag].filter(([, q]) => q > 0);
      if (!items.length) return toast('Add a bottle first');
      const text = `Hi Ghaslet! I'd like to order: ${items.map(([id, q]) => `${q} × ${byId[id].name}`).join(', ')}.`;
      navigator.clipboard?.writeText(text).catch(() => {});
      toast('Order copied. Paste it in the DM.');
      window.open(DM, '_blank', 'noopener');
    }
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false); });
  cta.href = DM;
  render();
  return { toast, sauces: SAUCES };
}
