import { useLanguage } from '../i18n/LanguageContext'
import EmptyState from '../components/EmptyState'
import { projects } from '../data/projects'

export default function Projects() {
  const { lang, t } = useLanguage()

  return (
    <section className="container section">
      <div className="section-head">
        <h2>{t('projects.title')}</h2>
        <p>{t('projects.subtitle')}</p>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title={t('projects.emptyTitle')}
          body={t('projects.emptyBody')}
        />
      ) : (
        <div className="grid">
          {projects.map((p) => (
            <article className="card" key={p.slug}>
              <h3>{p.title?.[lang] ?? p.slug}</h3>
              <p>{p.description?.[lang]}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
