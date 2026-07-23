import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const { lang, t } = useLanguage()

  return (
    <div className="container not-found">
      <h1>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
        {t('notFound.body')}
      </p>
      <Link className="btn btn-primary" to={`/${lang}`}>
        {t('notFound.back')}
      </Link>
    </div>
  )
}
