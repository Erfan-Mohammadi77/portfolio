import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const links = [
  { key: 'home', to: '' },
  { key: 'about', to: 'about' },
  { key: 'projects', to: 'projects' },
  { key: 'skills', to: 'skills' },
  { key: 'tutorials', to: 'tutorials' },
  { key: 'contact', to: 'contact' },
]

export default function Navbar() {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to={`/${lang}`} className="nav-brand" onClick={() => setOpen(false)}>
          erfan<span>.dev</span>
        </NavLink>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map((l) => (
            <li key={l.key}>
              <NavLink
                to={`/${lang}${l.to ? `/${l.to}` : ''}`}
                end={l.to === ''}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {t(`nav.${l.key}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <LanguageSwitcher />
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
