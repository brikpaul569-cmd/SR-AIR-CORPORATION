import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import ServiceIcons from './ServiceIcons'
import ImageCarousel from './ImageCarousel/ImageCarousel'
import './Services.css'

const BASE = import.meta.env.BASE_URL

const SERVICES_DATA = [
  {
    iconKey: 'Heating',
    titleKey: 'services.card.heating',
    descKey: 'services.card.heatingDesc',
    images: [
      { type: 'image', src: `${BASE}references/fan-coils-en-deluxe-az.webp` },
      { type: 'image', src: `${BASE}references/gris.webp` },
    ],
  },
  {
    iconKey: 'CommercialHVAC',
    titleKey: 'services.card.commercialHvac',
    descKey: 'services.card.commercialHvacDesc',
    images: [
      { type: 'image', src: `${BASE}references/Images/tools.webp` },
      { type: 'image', src: `${BASE}references/Images/solcomercial.webp` },
      { type: 'image', src: `${BASE}references/Images/comercial.JPG` },
      { type: 'image', src: `${BASE}references/comercial-delux-phoenix-az.webp` },
      { type: 'image', src: `${BASE}references/comercial-club-house.webp` },
    ],
  },
  {
    iconKey: 'ResidentialHVAC',
    titleKey: 'services.card.residentialHvac',
    descKey: 'services.card.residentialHvacDesc',
    images: [
      { type: 'image', src: `${BASE}references/residencial.webp` },
    ],
  },
  {
    iconKey: 'VRFSystems',
    titleKey: 'services.card.vrfSystems',
    descKey: 'services.card.vrfSystemsDesc',
    images: [
      { type: 'image', src: `${BASE}references/fan-coils-en-deluxe-az.webp` },
      { type: 'image', src: `${BASE}references/comercial-delux-phoenix-az.webp` },
    ],
  },
  {
    iconKey: 'PreventiveMaintenance',
    titleKey: 'services.card.preventiveMaintenance',
    descKey: 'services.card.preventiveMaintenanceDesc',
    images: [
      { type: 'image', src: `${BASE}references/comercial-club-house.webp` },
      { type: 'image', src: `${BASE}references/fan-coils-en-deluxe-az.webp` },
      { type: 'image', src: `${BASE}references/comercial-delux-phoenix-az.webp` },
    ],
  },
  {
    iconKey: 'Emergency247',
    titleKey: 'services.card.emergency247',
    descKey: 'services.card.emergency247Desc',
    images: [
      { type: 'image', src: `${BASE}references/comercial-club-house-phoenix-az.webp` },
      { type: 'image', src: `${BASE}references/club-house-phoenix-az.webp` },
      { type: 'image', src: `${BASE}references/residencial.webp` },
    ],
  },
]

function Services() {
  const { t } = useTranslation()
  const [selectedService, setSelectedService] = useState(null)

  const services = SERVICES_DATA.map((s) => ({
    Icon: ServiceIcons[s.iconKey],
    title: t(s.titleKey),
    description: t(s.descKey),
    images: s.images,
  }))

  const selected = selectedService !== null ? services[selectedService] : null

  return (
    <section className="services" id="servicios">
      <div className="services__container">
        <h2 className="services__title">{t('services.title')}</h2>
        <div className="services__title-accent"></div>
        <p className="services__subtitle">{t('services.subtitle')}</p>
        <div className="services__grid">
          {services.map((service, index) => (
            <div
              className="services__card"
              key={index}
              onClick={() => setSelectedService(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedService(index)}
            >
              <div className="services__card-icon">
                <service.Icon />
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selected && createPortal(
        <div className="services__carousel-overlay">
          <ImageCarousel
            slides={selected.images}
            onClose={() => setSelectedService(null)}
          />
        </div>,
        document.body
      )}
    </section>
  )
}

export default Services
