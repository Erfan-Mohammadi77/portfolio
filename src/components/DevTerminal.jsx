import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function DevTerminal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState([{ type: 'ok', text: t.dev.engaged }]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[posRef.current]) posRef.current++;
      else posRef.current = key === SEQUENCE[0] ? 1 : 0;
      if (posRef.current === SEQUENCE.length) {
        posRef.current = 0;
        document.documentElement.classList.toggle('dev-mode');
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const runCommand = (raw) => {
    switch (raw) {
      case 'help': return t.dev.help;
      case 'projects': document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); return t.dev.scrollingProjects;
      case 'skills': document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); return t.dev.scrollingSkills;
      case 'contact': document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); return t.dev.scrollingContact;
      case 'whoami': return t.dev.whoami;
      case 'clear': setLog([]); return null;
      default: return t.dev.notFound(raw);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      const raw = value.trim().toLowerCase();
      setLog((prev) => [...prev, { type: 'cmd', text: '$ ' + raw }]);
      setValue('');
      const output = runCommand(raw);
      if (output) setLog((prev) => [...prev, { type: 'ok', text: output }]);
    }
  };

  if (!open) return null;

  return (
    <div id="dev-terminal" className="open">
      <div id="dev-log">
        {log.map((l, i) => <div key={i} className={l.type === 'ok' ? 'ok' : ''}>{l.text}</div>)}
      </div>
      <div className="row">
        <span>$</span>
        <input id="dev-input" ref={inputRef} autoComplete="off" value={value}
          onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} />
      </div>
    </div>
  );
}
