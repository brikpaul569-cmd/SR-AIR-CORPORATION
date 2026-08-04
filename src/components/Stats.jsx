import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './Stats.css'

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [inView, target])

  return <span className="stats__number">{count}{suffix}</span>
}

function Stats() {
  const { t } = useTranslation()
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    { value: 10, suffix: '+', label: t('stats.yearsExperience') },
    { value: 500, suffix: '+', label: t('stats.projectsCompleted') },
    { value: 1000, suffix: '+', label: t('stats.satisfiedClients') },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => { if (current) observer.unobserve(current) }
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats__container">
        {stats.map((stat, index) => (
          <div className="stats__item" key={index}>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
        <div className="stats__item stats__item--static">
          <span className="stats__number">24/7</span>
          <span className="stats__label">{t('stats.emergencyService')}</span>
        </div>
      </div>
    </section>
  )
}

export default Stats
