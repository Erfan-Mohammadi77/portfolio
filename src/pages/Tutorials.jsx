import { useLanguage } from '../i18n/LanguageContext'
import EmptyState from '../components/EmptyState'
import { tutorials } from '../data/tutorials'

export default function Tutorials() {
  const { lang, t } = useLanguage()

  return (
    <section className="container section">
      <div className="section-head">
        <h2>{t('tutorials.title')}</h2>
        <p>{t('tutorials.subtitle')}</p>
      </div>

      {tutorials.length === 0 ? (
        <EmptyState
          title={t('tutorials.emptyTitle')}
          body={t('tutorials.emptyBody')}
        />
      ) : (
        <div className="grid">
          {tutorials.map((post) => (
            <article className="card" key={post.slug}>
              <h3>{post.title?.[lang] ?? post.slug}</h3>
              <p>{post.summary?.[lang]}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
