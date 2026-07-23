import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext.jsx';

gsap.registerPlugin(ScrollTrigger);

const SCENES = {
  'p-store': <div className="project-scene scene-grid"></div>,
  'p-ai': <div className="project-scene scene-neural"></div>,
  'p-sec': (
    <div className="project-scene scene-matrix">
      <span style={{ left: '10%', animationDelay: '0s' }}>01001</span>
      <span style={{ left: '30%', animationDelay: '.6s' }}>10110</span>
      <span style={{ left: '55%', animationDelay: '1.1s' }}>00101</span>
      <span style={{ left: '75%', animationDelay: '.3s' }}>11010</span>
    </div>
  ),
};

export default function Projects({ activeSkill }) {
  const { t } = useLang();

  useEffect(() => {
    const items = gsap.utils.toArray('.project');
    const triggers = items.map((item) =>
      gsap.from(item, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 88%' },
      })
    );
    return () => triggers.forEach((tw) => tw.scrollTrigger && tw.scrollTrigger.kill());
  }, [t]);

  return (
    <section id="projects">
      <div className="eyebrow">{t.projects.eyebrow}</div>
      <h2 className="section-title">{t.projects.title}</h2>
      {t.projects.items.map((p) => {
        const dimmed = activeSkill && !p.stack.includes(activeSkill);
        return (
          <div className="project" key={p.id} style={{ opacity: dimmed ? 0.35 : 1 }} data-cursor="open">
            {SCENES[p.id]}
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
        );
      })}
    </section>
  );
}
