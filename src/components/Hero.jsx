import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
const heroVideo = `${import.meta.env.BASE_URL}references/Video/condensadores.mp4`
const heroBg = `${import.meta.env.BASE_URL}references/saith9.jpeg`

import { Phone, ShieldCheck, Wrench, Clock } from 'lucide-react'
import './Hero.css'

function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = window.innerHeight * 0.6
      const ratio = Math.min(1, scrollY / maxScroll)
      section.style.setProperty('--scroll-progress', ratio.toFixed(3))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause()
        video.removeAttribute('autoplay')
      } else if (video.paused) {
        video.play().catch(() => {})
      }
    }

    syncPlayback()
    if (reducedMotion.addEventListener) {
      reducedMotion.addEventListener('change', syncPlayback)
      return () => reducedMotion.removeEventListener('change', syncPlayback)
    }
  }, [])

  return (
    <section className="hero" id="inicio" ref={sectionRef}>
      <video
        ref={videoRef}
        className="hero__video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroBg}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero__video-overlay"></div>
      <div className="hero__scroll-overlay"></div>

      <div className="hero__container">
        <div className="hero__text">
          <h1 className="hero__brand">{t('hero.brand')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>

          <h2 className="hero__title">{t('hero.title')}</h2>
          <p className="hero__tagline">{t('hero.tagline')}</p>
          <p className="hero__description">{t('hero.description')}</p>

          <div className="hero__cta-group">
            <a href="tel:+17206804049" className="hero__cta hero__cta--primary">
              <Phone size={18} />
              {t('hero.ctaCall')}
            </a>
          </div>
        </div>
      </div>

      <div className="hero__badges">
        <div className="hero__badge">
          <Wrench size={20} />
          <span>{t('hero.badgeTechnicians')}</span>
        </div>
        <div className="hero__badge">
          <ShieldCheck size={20} />
          <span>{t('hero.badgeQuality')}</span>
        </div>
        <div className="hero__badge">
          <Clock size={20} />
          <span>{t('hero.badge247')}</span>
        </div>
        <div className="hero__badge">
          <ShieldCheck size={20} />
          <span>{t('hero.badgeLicensed')}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
