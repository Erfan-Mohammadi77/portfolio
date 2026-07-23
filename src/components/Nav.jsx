import { useLang } from '../context/LanguageContext.jsx';

export default function Nav() {
  const { t, lang, toggle } = useLang();
  return (
    <nav>
      <a href="#hero" style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>erfan()</a>
      <div className="links">
        <a href="#about">{t.nav.about}</a>
        <a href="#skills">{t.nav.skills}</a>
        <a href="#projects">{t.nav.projects}</a>
        <a href="#contact">{t.nav.contact}</a>
        <button className="lang-toggle" onClick={toggle}>{lang === 'en' ? 'فارسی' : 'EN'}</button>
      </div>
    </nav>
  );
}
