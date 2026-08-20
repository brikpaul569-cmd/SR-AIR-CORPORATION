import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { Play, ChevronDown, X } from 'lucide-react'
import { WORKS_SECTIONS } from '../../data/worksData'
import VideoModal from './VideoModal'
import './OurWorks.css'

/**
 * WorksRow — Fila horizontal de videos estilo Netflix.
 * Usa embla-carousel con dragFree para scroll fluido en móviles.
 *
 * @param {string} title — nombre de la fila
 * @param {Array} videos — lista de videos {id, title, videoId, duration}
 * @param {function} onPlay — callback(videoId) al hacer click
 */
function WorksRow({ title, videos, onPlay, onDismiss }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    dragFree: true,
    loop: false,
    slidesToScroll: 1,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const update = () => {
      setActiveIndex(emblaApi.selectedScrollSnap())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    update()
    emblaApi.on('select', update)
    emblaApi.on('init', update)
    emblaApi.on('resize', update)
    return () => {
      emblaApi.off('select', update)
      emblaApi.off('init', update)
      emblaApi.off('resize', update)
    }
  }, [emblaApi])

  return (
    <div className="works-row">

      <div className="works-row__viewport" ref={emblaRef}>
        <div className="works-row__track">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`netflix-card works-card ${index === activeIndex ? 'netflix-card--active' : ''}`}
            >
              <button
                className="works-card__dismiss"
                onClick={(e) => { e.stopPropagation(); onDismiss(video.videoId) }}
                aria-label={`Cerrar ${video.title}`}
                type="button"
              >
                <X size={16} />
              </button>
              <button
                className="works-card__play-area"
                onClick={() => onPlay(video.videoId)}
                aria-label={`Reproducir ${video.title}`}
                type="button"
              >
                <div
                  className="works-card__thumb"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg)`,
                  }}
                >
                  <div className="works-card__play">
                    <Play size={28} fill="currentColor" />
                  </div>
                </div>
                <div className="works-card__info">
                  <span className="works-card__meta">
                    {video.category} • {video.duration}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Flechas de navegación — visibles siempre en desktop */}
      {canScrollPrev && (
        <button
          className="works-row__nav works-row__nav--prev"
          onClick={scrollPrev}
          aria-label="Desplazar izquierda"
          type="button"
        >
          ‹
        </button>
      )}
      {canScrollNext && (
        <button
          className="works-row__nav works-row__nav--next"
          onClick={scrollNext}
          aria-label="Desplazar derecha"
          type="button"
        >
          ›
        </button>
      )}
    </div>
  )
}

/**
 * OurWorks — Sección "Nuestros Trabajos".
 * Renderiza una fila por cada WORKS_SECTIONS.
 *
 * Gestión del estado:
 *   activeVideoId — string|null → abre/cierra VideoModal.
 */
function OurWorks() {
  const { t } = useTranslation()
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handlePlay = useCallback((videoId) => {
    setActiveVideoId(videoId)
  }, [])

  const handleClose = useCallback(() => {
    setActiveVideoId(null)
  }, [])

  const handleDismiss = useCallback((videoId) => {
    if (activeVideoId === videoId) {
      setActiveVideoId(null)
    }
  }, [activeVideoId])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <section className="our-works" id="trabajos">
      <div className="our-works__container">
        <div className="our-works__header">
          <h2 className="our-works__title">{t('works.title', 'Nuestros Trabajos')}</h2>
          <p className="our-works__subtitle">
            {t('works.subtitle', 'Proyectos y mantenimiento en acción')}
          </p>
          {/* Botón toggle: colapsa / expande las filas de videos */}
          <button
            className={`our-works__toggle ${isOpen ? 'our-works__toggle--open' : ''}`}
            onClick={toggleOpen}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Ocultar trabajos' : 'Ver trabajos'}
            type="button"
          >
            <span>{isOpen ? 'Ocultar' : 'Ver proyectos'}</span>
            <i
              className={`our-works__toggle-icon ${isOpen ? 'our-works__toggle-icon--open' : ''}`}
              aria-hidden="true"
            >
              <ChevronDown size={20} />
            </i>
          </button>
        </div>

        {/* Rows: colapsable con transición de altura */}
        <div
          className="our-works__rows"
          style={{
            maxHeight: isOpen ? '2000px' : '0',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
        >
          {WORKS_SECTIONS.map((section) => (
            <WorksRow
              key={section.id}
              title={section.title}
              videos={section.videos}
              onPlay={handlePlay}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      </div>

      {/* Modal de video (renderizado vía portal a document.body) */}
      <VideoModal videoId={activeVideoId} onClose={handleClose} />
    </section>
  )
}

export default OurWorks
