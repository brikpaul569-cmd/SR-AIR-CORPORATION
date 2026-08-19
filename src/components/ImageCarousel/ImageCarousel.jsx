import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './ImageCarousel.css'

/**
 * @typedef {Object} Slide
 * @property {'video' | 'image'} type
 * @property {string} src
 * @property {string} [caption]
 *
 * @param {Object} props
 * @param {Slide[]} props.slides
 * @param {Function} [props.onClose]
 * @param {string} [props.className]
 */
function ImageCarousel({ slides = [], onClose, className = '' }) {
  const { t } = useTranslation()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canGoToPrev())
    setCanNext(emblaApi.canGoToNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect()
    })
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && onClose) onClose()
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, scrollPrev, scrollNext])

  // Lock body scroll
  useEffect(() => {
    if (onClose) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [onClose])

  if (!slides.length) return null

  return (
    <div className={`ic ${className}`} role="region" aria-roledescription="carousel">
      {/* Close button */}
      {onClose && (
        <button
          className="ic__close"
          onClick={onClose}
          aria-label={t('carousel.close')}
          type="button"
        >
          <X size={24} />
        </button>
      )}

      {/* Viewport */}
      <div className="ic__viewport" ref={emblaRef}>
        <div className="ic__track">
          {slides.map((slide, i) => (
            <div
              className="ic__slide"
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={t('carousel.slideOf', { current: i + 1, total: slides.length })}
            >
              {slide.type === 'video' ? (
                <video
                  className="ic__media"
                  src={slide.src}
                  muted
                  loop
                  playsInline
                  preload={i === selectedIndex ? 'auto' : 'metadata'}
                />
              ) : (
                <img
                  className="ic__media"
                  src={slide.src}
                  alt={slide.caption || ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            className="ic__arrow ic__arrow--prev"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label={t('carousel.prev')}
            type="button"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="ic__arrow ic__arrow--next"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label={t('carousel.next')}
            type="button"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="ic__dots" role="tablist">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              className={`ic__dot ${i === selectedIndex ? 'ic__dot--active' : ''}`}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={t('carousel.slideOf', { current: i + 1, total: slides.length })}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
