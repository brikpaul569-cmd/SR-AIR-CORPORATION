import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import blackImg from '../../references/black.png'

import { Phone, ShieldCheck, Wrench, Clock } from 'lucide-react'
import './Hero.css'

function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const [imageVisible, setImageVisible] = useState(false)

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
    const img = imageRef.current
    if (!img) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(img)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" id="inicio" ref={sectionRef}>
      <div className="hero__scroll-overlay"></div>
      <div className="hero__diagonal-line"></div>
      <div className="hero__diagonal-line-2"></div>

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

        <div
          className={`hero__image-wrapper ${imageVisible ? 'hero__image-wrapper--visible' : ''}`}
          ref={imageRef}
        >
          <img
            src={blackImg}
            alt={t('hero.imgAlt')}
            className="hero__image"
          />
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
