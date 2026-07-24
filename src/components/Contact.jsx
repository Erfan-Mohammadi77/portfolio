import { useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext.jsx';

export default function Contact() {
  const { t } = useLang();

  const [log, setLog] = useState([
    { type: 'plain', text: '> contact --email' },
    { type: 'ok', text: t.contact.ready },
  ]);

  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const idRef = useRef(0);

  const push = (entry) =>
    setLog((prev) => [
      ...prev,
      { ...entry, id: idRef.current++ },
    ]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      const msg = value.trim();

      push({
        type: 'cmd',
        text: '> ' + msg,
      });

      setValue('');
      setDisabled(true);

      push({
        type: 'plain',
        text: t.contact.sending,
      });

      setTimeout(() => {
        setLog((prev) => {
          const copy = [...prev];

          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            text: t.contact.sent,
          };

          return copy;
        });

        push({
          type: 'ok',
          text: t.contact.opening,
        });

        window.location.href =
          `mailto:erfan.mohammadi.alv77@gmail.com?subject=Portfolio%20contact&body=${encodeURIComponent(msg)}`;

        setDisabled(false);
      }, 900);
    }
  };

  return (
    <section id="contact">
      <div className="eyebrow">
        {t.contact.eyebrow}
      </div>

      <h2 className="section-title">
        {t.contact.title}
      </h2>

      <div className="terminal">
        <div className="tbar">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div id="term-log">
          {log.map((l, i) => (
            <div
              key={l.id ?? i}
              className={
                l.type === 'ok'
                  ? 'ok'
                  : l.type === 'cmd'
                  ? 'cmd'
                  : ''
              }
            >
              {l.text}
            </div>
          ))}
        </div>

        <div className="term-input-row">
          <span className="prompt">$</span>

          <input
            id="contact-input"
            type="text"
            placeholder={t.contact.placeholder}
            autoComplete="off"
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </section>
  );
}