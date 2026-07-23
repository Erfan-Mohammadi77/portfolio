import { useLanguage } from '../i18n/LanguageContext'
import Reveal from '../components/Reveal'
import EmptyState from '../components/EmptyState'
import SkillIcon from '../components/SkillIcon'
import { skills } from '../data/skills'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section className="container section">
      <div className="section-head">
        <h2>{t('skills.title')}</h2>
        <p>{t('skills.subtitle')}</p>
      </div>

      {skills.length === 0 ? (
        <EmptyState title={t('skills.emptyTitle')} body={t('skills.emptyBody')} />
      ) : (
        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.key} delay={i * 80} className="skill-card">
              <div className="skill-card-head">
                <span className="skill-icon">
                  <SkillIcon name={group.key} />
                </span>
                <h3>{t(`skills.categories.${group.key}.title`)}</h3>
              </div>
              <p className="skill-desc">{t(`skills.categories.${group.key}.description`)}</p>
              <div className="stack-list">
                {group.items.map((item) => (
                  <span className="stack-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}