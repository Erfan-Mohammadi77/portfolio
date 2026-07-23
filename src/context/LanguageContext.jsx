import React, { createContext, useContext, useEffect, useState } from 'react';
import { content } from '../i18n/content.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('erfan-lang') || 'en');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('lang-fa', lang === 'fa');
    localStorage.setItem('erfan-lang', lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'en' ? 'fa' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: content[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
