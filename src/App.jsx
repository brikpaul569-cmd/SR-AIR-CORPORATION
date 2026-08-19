import { useState, useEffect } from 'react'
import useWeather from './hooks/useWeather'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import TruckShowcase from './components/TruckShowcase'
import AboutUs from './components/AboutUs'
import Stats from './components/Stats'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import WeatherEffects from './components/WeatherEffects'
import './App.css'

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [weatherOverride, setWeatherOverride] = useState(null)
  const openContact = () => setContactOpen(true)
  const closeContact = () => setContactOpen(false)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('srTheme') || 'dark'
      document.documentElement.setAttribute('data-theme', saved)
      return saved
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('srTheme', theme)
    } catch {}
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const weather = useWeather(weatherOverride)

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    if (!reveals.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => reveals.forEach((el) => observer.unobserve(el))
  }, [])

  return (
    <div
      className="app"
      style={{ '--weather-tint': theme === 'light' ? weather.theme.tintLight : weather.theme.tint, '--weather-accent': weather.theme.accent }}
    >
      <WeatherEffects condition={weather.condition} />
      <Navbar
        weather={weather}
        onWeatherOverride={setWeatherOverride}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        <Hero />
        <Services />
        <TruckShowcase />
        <AboutUs />
        <Stats />
      </main>
      <Footer onContactOpen={openContact} />
      <ContactForm isOpen={contactOpen} onClose={closeContact} />
    </div>
  )
}

export default App
