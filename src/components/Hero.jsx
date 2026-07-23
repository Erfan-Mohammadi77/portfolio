import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { useLang } from '../context/LanguageContext.jsx';

const TECHS = ['React', 'Node', 'Docker', 'Python', 'AWS', 'Linux', 'Git', 'TypeScript'];
const NAME = 'Erfan Mohammadi';

export default function Hero({ play }) {
  const { t, lang } = useLang();
  const canvasRef = useRef(null);
  const nameRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // split name into per-letter spans for the reveal animation
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    el.innerHTML = NAME.split(' ').map((w) =>
      `<span class="word">${w.split('').map((ch) => `<span>${ch}</span>`).join('')}</span> `
    ).join('');
  }, []);

  // CSS 3D tech ring
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.innerHTML = '';
    const radius = 160;
    TECHS.forEach((tech, i) => {
      const angle = (360 / TECHS.length) * i;
      const s = document.createElement('span');
      s.textContent = tech;
      s.style.transform = `translate(-50%,-50%) rotateY(${angle}deg) translateZ(${radius}px)`;
      ring.appendChild(s);
    });
  }, []);

  // three.js particle orb
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
    camera.position.z = 5;

    const count = 2200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.7;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
      base.set([x, y, z], i * 3);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x7c5cff, size: 0.022, transparent: true, opacity: 0.85 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let tmx = 0, tmy = 0;
    const onMove = (e) => {
      tmx = e.clientX / innerWidth - 0.5;
      tmy = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMove);

    let t = 0, raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (reduced) { renderer.render(scene, camera); return; }
      t += 0.005;
      points.rotation.y += 0.0018 + tmx * 0.002;
      points.rotation.x += tmy * 0.0015;
      const pos = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
        const wobble = 1 + Math.sin(t + i * 0.05) * 0.02;
        pos[i * 3] = bx * wobble; pos[i * 3 + 1] = by * wobble; pos[i * 3 + 2] = bz * wobble;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, [reduced]);

  // intro timeline once boot finishes
  useEffect(() => {
    if (!play) return;
    canvasRef.current.style.opacity = 1;
    const tl = gsap.timeline();
    tl.to('.hero-kicker', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to('h1#name .word span', { y: '0%', duration: 0.9, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
      .to('.hero-sub', { opacity: 1, duration: 0.7 }, '-=0.5')
      .to('.scroll-cue', { opacity: 1, duration: 0.6 }, '-=0.4');
  }, [play]);

  return (
    <section id="hero">
      <canvas id="orb-canvas" ref={canvasRef}></canvas>
      <div className="ring-wrap">
        <div className="ring" ref={ringRef}></div>
      </div>
      <div id="hero-content">
        <div className="hero-kicker">{t.hero.kicker}</div>
        <h1 id="name" ref={nameRef}></h1>
        <p className="hero-sub">{t.hero.sub}</p>
      </div>
      <div className="scroll-cue"><span className="bar"></span>{t.hero.scroll}</div>
    </section>
  );
}
