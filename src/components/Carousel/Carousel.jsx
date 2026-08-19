import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './Carousel.css'

/**
 * @typedef {'testimonial' | 'gallery'} CarouselVariant
 *
 * @typedef {Object} Slide
 * @property {'video' | 'image'} type
 * @property {string} src
 * @property {string} [caption]
 * @property {string} [name]
 * @property {string} [role]
 * @property {string} [ctaLabel]
 * @property {string} [ctaHref]
 *
 * @param {Object} props
 * @param {Slide[]} props.slides - Array of slide objects
 * @param {CarouselVariant} [props.variant='testimonial'] - Carousel variant
 * @param {boolean} [props.autoplay=false] - Enable autoplay
 * @param {number} [props.autoplayInterval=5000] - Autoplay interval in ms
 * @param {string} [props.className] - Additional CSS class
 * @param {Function} [props.onClose] - Close handler (renders close button when provided)
 */
function Carousel({
  slides = [],
  variant = 'testimonial',
  autoplay = false,
  autoplayInterval = 5000,
  className = '',
  onClose,
}) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoplayTimer = useRef(null)
  const containerRef = useRef(null)
  const total = slides.length

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Navigation helpers
  const goTo = useCallback(
    (index) => {
      setCurrent(((index % total) + total) % total)
    },
    [total]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Escape' && onClose) {
        onClose()
      }
    },
    [next, prev, onClose]
  )

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }, [next, prev])

  // Autoplay
  useEffect(() => {
    if (!autoplay || total <= 1 || isHovered || isFocused) {
      clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
      return
    }

    autoplayTimer.current = setInterval(() => {
      if (!reducedMotion) {
        setCurrent((prev) => (prev + 1) % total)
      }
    }, autoplayInterval)

    return () => {
      clearInterval(autoplayTimer.current)
      autoplayTimer.current = null
    }
  }, [autoplay, autoplayInterval, total, isHovered, isFocused, reducedMotion])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(autoplayTimer.current)
    }
  }, [])

  if (!slides.length) return null

  const isTestimonial = variant === 'testimonial'
  const containerClasses = [
    'carousel',
    `carousel--${variant}`,
    reducedMotion ? 'carousel--reduced-motion' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const translateX = reducedMotion ? 0 : -(current * 100)

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={t('carousel.ariaLabel')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bars — testimonial only */}
      {isTestimonial && total > 1 && (
        <div className="carousel__progress" aria-hidden="true">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`carousel__progress-bar ${
                i === current ? 'carousel__progress-bar--active' : ''
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      {/* Close button */}
      {onClose && (
        <button
          className="carousel__close"
          onClick={onClose}
          aria-label={t('carousel.close')}
          type="button"
        >
          <X size={28} />
        </button>
      )}

      {/* Track */}
      <div
        className="carousel__viewport"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="carousel__track"
          style={{
            transform: `translateX(${translateX}%)`,
            transitionDuration: reducedMotion ? '0s' : 'var(--carousel-transition-duration)',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={t('carousel.slideOf', {
                current: i + 1,
                total,
              })}
              aria-hidden={i !== current}
            >
              {/* Media */}
              {slide.type === 'video' ? (
                <video
                  className="carousel__media"
                  src={slide.src}
                  muted
                  loop
                  playsInline
                  preload={i === current ? 'auto' : 'metadata'}
                />
              ) : (
                <img
                  className="carousel__media"
                  src={slide.src}
                  alt={slide.caption || ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              )}

              {/* Testimonial overlay */}
              {isTestimonial && (
                <div className="carousel__overlay" aria-hidden="true" />
              )}

              {/* Caption — testimonial */}
              {isTestimonial && slide.caption && (
                <div className="carousel__caption">
                  <p className="carousel__caption-text">{slide.caption}</p>
                </div>
              )}

              {/* Bottom bar — testimonial */}
              {isTestimonial && (
                <div className="carousel__bar">
                  <div className="carousel__bar-info">
                    {slide.name && (
                      <span className="carousel__bar-name">{slide.name}</span>
                    )}
                    {slide.role && (
                      <span className="carousel__bar-role">{slide.role}</span>
                    )}
                  </div>
                  <div className="carousel__bar-actions">
                    {slide.ctaLabel && (
                      <a
                        href={slide.ctaHref || '#'}
                        className="carousel__bar-cta"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {slide.ctaLabel}
                      </a>
                    )}
                    {total > 1 && (
                      <div className="carousel__arrows">
                        <button
                          className="carousel__arrow"
                          onClick={prev}
                          aria-label={t('carousel.prev')}
                          type="button"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          className="carousel__arrow"
                          onClick={next}
                          aria-label={t('carousel.next')}
                          type="button"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gallery arrows + dots */}
      {!isTestimonial && total > 1 && (
        <>
          <button
            className="carousel__nav carousel__nav--prev"
            onClick={prev}
            aria-label={t('carousel.prev')}
            type="button"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="carousel__nav carousel__nav--next"
            onClick={next}
            aria-label={t('carousel.next')}
            type="button"
          >
            <ChevronRight size={28} />
          </button>

          <div className="carousel__dots" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`carousel__dot ${
                  i === current ? 'carousel__dot--active' : ''
                }`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={t('carousel.slideOf', {
                  current: i + 1,
                  total,
                })}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel

/* ─── Usage example (commented out, not exported) ──────────────────────────
 *
 * const testimonialSlides = [
 *   {
 *     type: 'video',
 *     src: '/references/comercial-delux.mp4',
 *     caption: 'Excelente servicio, superaron nuestras expectativas.',
 *     name: 'Carlos Méndez',
 *     role: 'Gerente de Operaciones',
 *     ctaLabel: 'Ver caso de estudio',
 *     ctaHref: '#caso-1',
 *   },
 *   {
 *     type: 'image',
 *     src: '/references/residencial.webp',
 *     caption: 'Instalación profesional y rápida.',
 *     name: 'María López',
 *     role: 'Propietaria',
 *   },
 * ]
 *
 * const gallerySlides = [
 *   { type: 'image', src: '/references/comercial-club-house.webp', caption: 'Club House HVAC' },
 *   { type: 'image', src: '/references/fan-coils-en-deluxe-az.webp', caption: 'Fan Coils Deluxe' },
 *   { type: 'image', src: '/references/street.jpg' },
 * ]
 *
 * <Carousel
 *   slides={testimonialSlides}
 *   variant="testimonial"
 *   autoplay
 *   autoplayInterval={6000}
 * />
 *
 * <Carousel slides={gallerySlides} variant="gallery" />
 *
 * ────────────────────────────────────────────────────────────────────────── */
