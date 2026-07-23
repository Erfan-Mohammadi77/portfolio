import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const paragraphs = t('about.body').split('\n\n')

  return (
    <section className="container section">
      <div className="section-head">
        <h2>{t('about.title')}</h2>
      </div>
      <div className="about-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}