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
      style={{ '--weather-tint': weather.theme.tint }}
    >
      <WeatherEffects condition={weather.condition} />
      <Navbar
        onContactOpen={openContact}
        weather={weather}
        onWeatherOverride={setWeatherOverride}
      />
      <main>
        <Hero onContactOpen={openContact} />
        <Services />
        <TruckShowcase />
        <AboutUs />
        <Stats />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={closeContact} />
    </div>
  )
}

export default App
