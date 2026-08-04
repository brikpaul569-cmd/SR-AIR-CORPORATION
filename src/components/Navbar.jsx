import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Sun, Moon } from 'lucide-react'
import WeatherBadge from './WeatherBadge'
import './Navbar.css'

function Navbar({ weather, onWeatherOverride, theme, onToggleTheme }) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.getElementById(targetId)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#inicio" className="navbar__logo" onClick={(e) => handleNavClick(e, 'inicio')}>
          <img
            src={`${import.meta.env.BASE_URL}references/${theme === 'dark' ? 'sr-logo.png' : 'sr-logo-dark.png'}`}
            alt={t('nav.logoAlt')}
            className="navbar__logo-img"
          />
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>{t('nav.home')}</a>
          <a href="#servicios" onClick={(e) => handleNavClick(e, 'servicios')}>{t('nav.services')}</a>
          <a href="#nosotros" onClick={(e) => handleNavClick(e, 'nosotros')}>{t('nav.about')}</a>
          <a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>{t('nav.contact')}</a>
        </nav>

        <div className="navbar__actions">
          <WeatherBadge
            condition={weather.condition}
            temp={weather.temp}
            city={weather.city}
            onOverride={onWeatherOverride}
          />
        </div>

        <button
          className="navbar__theme"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? t('nav.toggleThemeLight') : t('nav.toggleThemeDark')}
          title={theme === 'dark' ? t('nav.toggleThemeLight') : t('nav.toggleThemeDark')}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          className="navbar__lang"
          onClick={() => i18n.changeLanguage(i18n.language?.startsWith('es') ? 'en' : 'es')}
          aria-label={t('nav.toggleLang')}
          title={i18n.language?.startsWith('es') ? 'Switch to English' : 'Cambiar a Español'}
        >
          <Globe size={16} />
          <span>{i18n.language?.startsWith('es') ? 'ES' : 'EN'}</span>
        </button>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t('nav.toggleMenu')}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
