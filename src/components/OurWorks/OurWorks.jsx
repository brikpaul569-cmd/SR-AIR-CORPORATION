import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { Play } from 'lucide-react'
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
function WorksRow({ title, videos, onPlay }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // dragFree: scroll sin snap, ideal para carrusel tipo Netflix
    dragFree: true,
    // containScroll evita espacio vacío al final
    containScroll: 'trimSnaps',
    // padding para que las cards no toquen los bordes
    padding: { left: 16, right: 16 },
    // solo scroll horizontal
    axis: 'x',
  })

  // Flechas de navegación opcionales (habilitadas si hay overflow)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    update()
    emblaApi.on('select', update)
    emblaApi.on('resize', update)
    return () => emblaApi.off('select', update)
  }, [emblaApi])

  return (
    <div className="works-row">
      <h3 className="works-row__title">{title}</h3>

      <div className="works-row__viewport" ref={emblaRef}>
        <div className="works-row__track">
          {videos.map((video) => (
            <button
              key={video.id}
              className="netflix-card works-card"
              onClick={() => onPlay(video.videoId)}
              aria-label={`Reproducir ${video.title}`}
              type="button"
            >
              {/* Imagen placeholder (thumbnail de YouTube) */}
              <div
                className="works-card__thumb"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/hqresdefault.jpg)`,
                }}
              >
                <div className="works-card__play">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
              <div className="works-card__info">
                <span className="works-card__title">{video.title}</span>
                <span className="works-card__meta">
                  {video.category} • {video.duration}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Flechas de navegación (desktop hover) */}
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

  const handlePlay = useCallback((videoId) => {
    setActiveVideoId(videoId)
  }, [])

  const handleClose = useCallback(() => {
    setActiveVideoId(null)
  }, [])

  return (
    <section className="our-works" id="trabajos">
      <div className="our-works__container">
        <h2 className="our-works__title">{t('works.title', 'Nuestros Trabajos')}</h2>
        <p className="our-works__subtitle">
          {t('works.subtitle', 'Proyectos y mantenimiento en acción')}
        </p>

        <div className="our-works__rows">
          {WORKS_SECTIONS.map((section) => (
            <WorksRow
              key={section.id}
              title={section.title}
              videos={section.videos}
              onPlay={handlePlay}
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
