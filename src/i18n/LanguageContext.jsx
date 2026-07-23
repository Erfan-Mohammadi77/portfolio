import { createContext, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { translations, supportedLangs, defaultLang } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const { lang: rawLang } = useParams()
  const lang = supportedLangs.includes(rawLang) ? rawLang : defaultLang
  const dict = translations[lang]

  const value = useMemo(() => {
    function t(path) {
      const parts = path.split('.')
      let node = dict
      for (const part of parts) {
        node = node?.[part]
      }
      return node ?? path
    }
    return { lang, dir: dict.dir, t }
  }, [lang, dict])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
