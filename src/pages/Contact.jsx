import { useLanguage } from '../i18n/LanguageContext'

// Fill these in with your real details.
const CONTACT_LINKS = [
  { label: 'Email', href: 'mailto:you@example.com', value: 'you@example.com' },
  { label: 'GitHub', href: 'https://github.com/Erfan-Mohammadi77', value: 'github.com/Erfan-Mohammadi77' },
  // { label: 'LinkedIn', href: 'https://linkedin.com/in/...', value: 'linkedin.com/in/...' },
  // { label: 'Telegram', href: 'https://t.me/...', value: '@...' },
]

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section className="container section">
      <div className="section-head">
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.body')}</p>
      </div>

      <div className="contact-grid">
        <div className="card">
          <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
            {t('contact.formNote')}
          </p>
          <ul className="contact-list">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <strong style={{ color: 'var(--text)' }}>{link.label}: </strong>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
