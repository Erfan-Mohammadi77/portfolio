import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Avatar from '../components/Avatar'
import EmptyState from '../components/EmptyState'
import { stats } from '../data/stats'
import { stack } from '../data/stack'
import { testimonials } from '../data/testimonials'
import Magnetic from '../components/Magnetic'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'

export default function Home() {
  const { lang, t } = useLanguage()

  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy fade-up" style={{ animationDelay: '0ms' }}>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1>{t('hero.name')}</h1>
            <p className="role">{t('hero.role')}</p>
            <p className="tagline">{t('hero.tagline')}</p>
            <div className="hero-actions">
              <Magnetic>
                <Link className="btn btn-primary" to={`/${lang}/projects`}>
                  {t('hero.cta1')}
                </Link>
              </Magnetic>
              <Magnetic>
                <Link className="btn btn-ghost" to={`/${lang}/contact`}>
                  {t('hero.cta2')}
                </Link>
              </Magnetic>
            </div>
          </div>
          <div className="hero-avatar fade-up" style={{ animationDelay: '120ms' }}>
            <Avatar size={250} />
          </div>
        </div>
      </section>

      <Marquee items={t('marquee.items')} />

      <Reveal as="section" className="container section">
        <span className="section-tag">{t('intro.tag')}</span>
        <div className="intro">
          <h2>{t('intro.title')}</h2>
          <p>{t('intro.body')}</p>
          <Link className="btn btn-ghost" to={`/${lang}/about`}>
            {t('intro.cta')}
          </Link>
        </div>
      </Reveal>

      <Reveal as="section" className="container section">
        <span className="section-tag">{t('stats.tag')}</span>
        <div className="section-head">
          <h2>{t('stats.title')}</h2>
        </div>
        {stats.length === 0 ? (
          <EmptyState title={t('stats.emptyTitle')} body={t('stats.emptyBody')} />
        ) : (
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.value + (s.label?.[lang] ?? '')}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label?.[lang]}</span>
              </div>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal as="section" className="container section">
        <span className="section-tag">{t('stack.tag')}</span>
        <div className="section-head">
          <h2>{t('stack.title')}</h2>
        </div>
        {stack.length === 0 ? (
          <EmptyState title={t('stack.emptyTitle')} body={t('stack.emptyBody')} />
        ) : (
          <div className="stack-list">
            {stack.map((item) => (
              <span className="stack-chip" key={item.name}>
                {item.name}
              </span>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal as="section" className="container section">
        <span className="section-tag">{t('testimonials.tag')}</span>
        <div className="section-head">
          <h2>{t('testimonials.title')}</h2>
        </div>
        {testimonials.length === 0 ? (
          <EmptyState title={t('testimonials.emptyTitle')} body={t('testimonials.emptyBody')} />
        ) : (
          <div className="grid">
            {testimonials.map((tst) => (
              <blockquote className="card testimonial" key={tst.author}>
                <p>&ldquo;{tst.quote?.[lang]}&rdquo;</p>
                <footer>
                  <strong>{tst.author}</strong>
                  {tst.role ? <span> — {tst.role}</span> : null}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </Reveal>
    </>
  )
}
