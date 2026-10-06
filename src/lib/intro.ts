export const INTRO_STORAGE_KEY = "pp-intro-done";
export const INTRO_END_EVENT = "pp:intro-end";
export const INTRO_TIMEOUT_MS = 6500;

export const INTRO_BOOTSTRAP = `(() => {
  const root = document.documentElement;
  let seen = false;
  try { seen = sessionStorage.getItem('${INTRO_STORAGE_KEY}') === '1'; } catch {}
  if (seen) return;
  root.classList.add('pp-intro-pending');
  const selector = 'header, main, footer';
  const markers = ['data-pp-intro-inert', 'data-pp-intro-was-inert', 'data-pp-intro-aria-hidden'];
  const applyInert = () => {
    if (!root.classList.contains('pp-intro-pending')) return;
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.hasAttribute('data-pp-intro-inert')) {
        element.setAttribute('data-pp-intro-inert', '');
        if (element.hasAttribute('inert')) element.setAttribute('data-pp-intro-was-inert', '');
        const ariaHidden = element.getAttribute('aria-hidden');
        if (ariaHidden !== null) element.setAttribute('data-pp-intro-aria-hidden', ariaHidden);
      }
      element.setAttribute('inert', '');
      element.setAttribute('aria-hidden', 'true');
    });
  };
  const releaseInert = () => {
    document.querySelectorAll('[data-pp-intro-inert]').forEach((element) => {
      if (element.hasAttribute('data-pp-intro-was-inert')) element.setAttribute('inert', '');
      else element.removeAttribute('inert');
      const ariaHidden = element.getAttribute('data-pp-intro-aria-hidden');
      if (ariaHidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', ariaHidden);
      markers.forEach((marker) => element.removeAttribute(marker));
    });
  };
  const cleanup = () => {
    clearTimeout(timeout);
    document.removeEventListener('keydown', onKey, true);
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('DOMContentLoaded', applyInert);
    window.removeEventListener('${INTRO_END_EVENT}', cleanup);
  };
  const finish = () => {
    root.classList.remove('pp-intro-pending');
    releaseInert();
    try { sessionStorage.setItem('${INTRO_STORAGE_KEY}', '1'); } catch {}
    window.dispatchEvent(new Event('${INTRO_END_EVENT}'));
  };
  const onKey = (event) => {
    if (event.key === 'Escape') finish();
    if (event.key === 'Tab') {
      event.preventDefault();
      document.querySelector('[data-skip-intro]')?.focus({preventScroll: true});
    }
  };
  const onClick = (event) => {
    if (event.target instanceof Element && event.target.closest('[data-skip-intro]')) finish();
  };
  const timeout = setTimeout(finish, ${INTRO_TIMEOUT_MS});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyInert, {once: true});
  else applyInert();
  document.addEventListener('keydown', onKey, true);
  document.addEventListener('click', onClick, true);
  window.addEventListener('${INTRO_END_EVENT}', cleanup);
})()`;

export function endIntro() {
  document.documentElement.classList.remove("pp-intro-pending");
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {}
  window.dispatchEvent(new Event(INTRO_END_EVENT));
}
