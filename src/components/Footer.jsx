import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>Erfan Mohammadi © {year}</span>
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  )
}
