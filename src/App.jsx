import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { supportedLangs, defaultLang } from './i18n/translations'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Tutorials from './pages/Tutorials'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import CustomCursor from './components/CustomCursor'
import GrainOverlay from './components/GrainOverlay'
import { useLocation } from 'react-router-dom'

function LangGate() {
  const { lang } = useParams()
  if (!supportedLangs.includes(lang)) {
    return <Navigate to={`/${defaultLang}`} replace />
  }
  return <LangLayout />
}

function LangLayout() {
  return (
    <LanguageProvider>
      <SyncHtmlAttrs />
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <PageTransition />
    </LanguageProvider>
    
  )
}

function SyncHtmlAttrs() {
  const { lang, dir } = useLanguage()
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])
  return null
}

function PageTransition() {
  const location = useLocation()
  return (
    <>
      <main key={location.pathname} className="page-transition">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />
      <Route path="/:lang" element={<LangGate />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="tutorials" element={<Tutorials />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${defaultLang}`} replace />} />
    </Routes>
  )
}
