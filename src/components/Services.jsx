import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ServiceIcons from './ServiceIcons'
import Carousel from './Carousel/Carousel'
import './Services.css'

const BASE = import.meta.env.BASE_URL

const SERVICES_DATA = [
  {
    iconKey: 'Heating',
    titleKey: 'services.card.heating',
    descKey: 'services.card.heatingDesc',
    images: [
      { type: 'image', src: `${BASE}references/fan-coils-en-deluxe-az.webp` },
    ],
  },
  {
    iconKey: 'CommercialHVAC',
    titleKey: 'services.card.commercialHvac',
    descKey: 'services.card.commercialHvacDesc',
    images: [
      { type: 'image', src: `${BASE}references/comercial-delux-phoenix-az.webp` },
      { type: 'image', src: `${BASE}references/comercial-club-house.webp` },
      { type: 'image', src: `${BASE}references/comercial-club-house-phoenix-az.webp` },
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
      { type: 'image', src: `${BASE}references/street.jpg` },
      { type: 'image', src: `${BASE}references/gris.webp` },
    ],
  },
  {
    iconKey: 'Emergency247',
    titleKey: 'services.card.emergency247',
    descKey: 'services.card.emergency247Desc',
    images: [
      { type: 'image', src: `${BASE}references/street.jpg` },
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

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

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

      {selected && (
        <div className="services__carousel-overlay">
          <Carousel
            slides={selected.images}
            variant="gallery"
            onClose={() => setSelectedService(null)}
          />
        </div>
      )}
    </section>
  )
}

export default Services
