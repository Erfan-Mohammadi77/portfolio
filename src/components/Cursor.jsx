import { useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { lang } = useLang();

  useEffect(() => {
    if (lang === 'fa') return; // custom cursor is an LTR-only flourish; skip for RTL/Persian
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };
    window.addEventListener('mousemove', onMove);

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(loop);
    }
    loop();

    // event delegation so newly-mounted targets (skills nodes, etc.) work without re-binding
    const SELECTOR = 'a,.project,#skills-svg circle,.lang-toggle';
    const onOver = (e) => {
      const el = e.target.closest(SELECTOR);
      if (!el) return;
      ring.classList.add('expand');
      ring.textContent = el.dataset.cursor || (el.classList.contains('project') ? 'open' : el.tagName === 'CIRCLE' ? 'select' : 'explore');
    };
    const onOut = (e) => {
      const el = e.target.closest(SELECTOR);
      if (!el) return;
      ring.classList.remove('expand');
      ring.textContent = '';
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [lang]);

  if (lang === 'fa') return null;

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
}
