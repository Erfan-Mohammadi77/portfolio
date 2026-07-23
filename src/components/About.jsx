import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLang();

  useEffect(() => {
    const items = gsap.utils.toArray('.t-item');
    const triggers = items.map((item) =>
      gsap.from(item, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 85%' },
      })
    );
    return () => triggers.forEach((tw) => tw.scrollTrigger && tw.scrollTrigger.kill());
  }, [t]);

  return (
    <section id="about">
      <div className="eyebrow">{t.about.eyebrow}</div>
      <h2 className="section-title">{t.about.title}</h2>
      <div className="timeline">
        {t.about.items.map((item, i) => (
          <div className="t-item" data-index={String(i + 1).padStart(2, '0')} key={i}>
            <time>{item.time}</time>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
