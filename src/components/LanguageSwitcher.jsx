import { useLocation, useNavigate } from 'react-router-dom'
import { supportedLangs } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { lang } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  function switchTo(nextLang) {
    const segments = location.pathname.split('/')
    segments[1] = nextLang
    navigate(segments.join('/') || `/${nextLang}`)
  }

  return (
    <div className="lang-switcher">
      {supportedLangs.map((l) => (
        <button
          key={l}
          className={l === lang ? 'active' : ''}
          onClick={() => switchTo(l)}
          aria-current={l === lang ? 'true' : undefined}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
