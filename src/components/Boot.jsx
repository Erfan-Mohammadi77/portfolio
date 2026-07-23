import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Boot({ onDone }) {
  const { t } = useLang();
  const [lines, setLines] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    let i = 0;
    let timer;
    const step = () => {
      if (i >= t.boot.length) {
        timer = setTimeout(() => {
          setFading(true);
          setTimeout(() => { setHidden(true); if (!doneRef.current) { doneRef.current = true; onDone(); } }, 800);
        }, 500);
        return;
      }
      setLines((prev) => [...prev, t.boot[i]]);
      i++;
      timer = setTimeout(step, i === t.boot.length ? 550 : 420);
    };
    timer = setTimeout(step, 300);
    return () => clearTimeout(timer);
  }, [t]);

  if (hidden) return null;

  return (
    <div id="boot" style={{ opacity: fading ? 0 : 1, transition: 'opacity .8s ease' }}>
      <div id="boot-lines">
        {lines.map((line, idx) => (
          <div key={idx}>
            {line}
            {idx === lines.length - 1 && idx === t.boot.length - 1 && <span className="cursor-blink"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
