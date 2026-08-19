import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import './VideoModal.css'

/**
 * VideoModal
 * ————
 * Overlay fijo que reproduce un video de YouTube Shorts.
 *
 * Soluciones aplicadas (reparadas en carousel anterior):
 *   1. createPortal → document.body: escapa backdrop-filter de ancestros.
 *   2. height: 100dvh: encaja en viewport real (barra de scroll móvil).
 *   3. overflow: hidden: el overlay nunca scrollea.
 *   4. document.body.style.overflow = 'hidden': lock de scroll de la página.
 *   5. Close button en position: fixed: siempre visible en esquina superior derecha.
 *
 * @param {string|null} videoId — YouTube video ID (null = modal cerrado)
 * @param {function} onClose — callback para setear videoId = null
 */
function VideoModal({ videoId, onClose }) {
  // Lock body scroll mientras el modal está abierto
  useEffect(() => {
    if (videoId) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [videoId])

  // Escape para cerrar con Escape
  useEffect(() => {
    if (!videoId) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [videoId, onClose])

  if (!videoId) return null

  // El overlay se renderiza vía portal a document.body
  // para evitar que backdrop-filter de ancestros rompa position: fixed
  return createPortal(
    <div className="video-modal__overlay" role="dialog" aria-modal="true" aria-label="Reproducir video">
      {/* Close button: position fixed, siempre visible en viewport */}
      <button
        className="video-modal__close"
        onClick={onClose}
        aria-label="Cerrar video"
        type="button"
      >
        <X size={24} />
      </button>

      {/* Contenedor responsive: Shorts en móvil, centrado en desktop */}
      <div className="video-modal__container">
        <div className="video-modal__aspect">
          <iframe
            className="video-modal__iframe"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Trabajo SR Air Corporation"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default VideoModal
