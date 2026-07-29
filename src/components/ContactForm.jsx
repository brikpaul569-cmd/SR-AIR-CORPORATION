import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from './QRCode'
import './ContactForm.css'

function ContactForm({ isOpen, onClose }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) setSubmitted(false)
  }, [isOpen])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label={t('contact.closeModal')}>&times;</button>

        {submitted ? (
          <div className="modal__success">
            <div className="modal__success-icon">✓</div>
            <h2 className="modal__title">{t('contact.thankYou')}</h2>
            <p className="modal__subtitle">{t('contact.successMessage')}</p>
            <QRCode size={160} variant="modal" />
            <p className="modal__success-text">{t('contact.visitWebsite')}</p>
            <a href="https://sraircorp.com" target="_blank" rel="noreferrer" className="modal__success-link">
              sraircorp.com
            </a>
            <button className="modal__submit" onClick={onClose} style={{ marginTop: '1.5rem' }}>
              {t('contact.close')}
            </button>
          </div>
        ) : (
          <>
            <div className="modal__header">
              <h2 className="modal__title">{t('contact.title')}</h2>
              <p className="modal__subtitle">{t('contact.subtitle')}</p>
            </div>
            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="modal__row">
                <div className="modal__field">
                  <label htmlFor="name">{t('contact.fullName')}</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.fullNamePlaceholder')} required />
                </div>
                <div className="modal__field">
                  <label htmlFor="email">{t('contact.email')}</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('contact.emailPlaceholder')} required />
                </div>
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label htmlFor="phone">{t('contact.phone')}</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.phonePlaceholder')} />
                </div>
                <div className="modal__field">
                  <label htmlFor="service">{t('contact.serviceLabel')}</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                    <option value="">{t('contact.servicePlaceholder')}</option>
                    <option value="commercial">{t('contact.serviceCommercial')}</option>
                    <option value="residential">{t('contact.serviceResidential')}</option>
                    <option value="rooftop">{t('contact.serviceRooftop')}</option>
                    <option value="refrigeration">{t('contact.serviceRefrigeration')}</option>
                    <option value="vrf">{t('contact.serviceVrf')}</option>
                    <option value="chillers">{t('contact.serviceChillers')}</option>
                    <option value="heatpump">{t('contact.serviceHeatPump')}</option>
                    <option value="maintenance">{t('contact.serviceMaintenance')}</option>
                    <option value="emergency">{t('contact.serviceEmergency')}</option>
                  </select>
                </div>
              </div>
              <div className="modal__field">
                <label htmlFor="message">{t('contact.message')}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.messagePlaceholder')} rows="4"></textarea>
              </div>
              <button type="submit" className="modal__submit">{t('contact.submit')}</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ContactForm
