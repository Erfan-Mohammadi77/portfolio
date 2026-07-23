import { useLang } from '../context/LanguageContext.jsx';

const SKILLS = [
  { id: 'react', label: 'React', x: 180, y: 120 },
  { id: 'node', label: 'Node', x: 420, y: 80 },
  { id: 'docker', label: 'Docker', x: 660, y: 130 },
  { id: 'python', label: 'Python', x: 760, y: 320 },
  { id: 'aws', label: 'AWS', x: 560, y: 420 },
  { id: 'linux', label: 'Linux', x: 300, y: 430 },
  { id: 'git', label: 'Git', x: 120, y: 300 },
  { id: 'typescript', label: 'TypeScript', x: 450, y: 260 },
];
const EDGES = [
  ['react', 'node'], ['react', 'typescript'], ['node', 'docker'], ['node', 'aws'],
  ['docker', 'aws'], ['python', 'aws'], ['linux', 'git'], ['linux', 'node'],
  ['git', 'node'], ['typescript', 'node'],
];

export default function Skills({ activeSkill, setActiveSkill }) {
  const { t } = useLang();

  const connected = new Set(activeSkill ? [activeSkill] : []);
  if (activeSkill) {
    EDGES.forEach(([a, b]) => {
      if (a === activeSkill) connected.add(b);
      if (b === activeSkill) connected.add(a);
    });
  }

  return (
    <section id="skills">
      <div className="eyebrow">{t.skills.eyebrow}</div>
      <h2 className="section-title">{t.skills.title}</h2>
      <div id="skills-wrap">
        <svg id="skills-svg" viewBox="0 0 900 520">
          {EDGES.map(([a, b], i) => {
            const s = SKILLS.find((n) => n.id === a);
            const e = SKILLS.find((n) => n.id === b);
            const lit = activeSkill && (a === activeSkill || b === activeSkill);
            return <line key={i} x1={s.x} y1={s.y} x2={e.x} y2={e.y} className={lit ? 'lit' : ''} />;
          })}
          {SKILLS.map((s) => {
            const dim = activeSkill && !connected.has(s.id);
            const active = activeSkill === s.id;
            return (
              <g key={s.id}>
                <circle
                  cx={s.x} cy={s.y} r={26}
                  className={`node${active ? ' active' : ''}${dim ? ' dim' : ''}`}
                  onClick={() => setActiveSkill(active ? null : s.id)}
                  data-cursor="select"
                />
                <text x={s.x} y={s.y + 45} textAnchor="middle" className={`label${dim ? ' dim' : ''}`}>{s.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="skills-hint">{t.skills.hint}</div>
    </section>
  );
}
