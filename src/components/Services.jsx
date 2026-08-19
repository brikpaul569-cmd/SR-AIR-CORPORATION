import { useTranslation } from 'react-i18next'
import ServiceIcons from './ServiceIcons'
import './Services.css'

const SERVICES_DATA = [
  {
    iconKey: 'Heating',
    titleKey: 'services.card.heating',
    descKey: 'services.card.heatingDesc',
  },
  {
    iconKey: 'CommercialHVAC',
    titleKey: 'services.card.commercialHvac',
    descKey: 'services.card.commercialHvacDesc',
  },
  {
    iconKey: 'ResidentialHVAC',
    titleKey: 'services.card.residentialHvac',
    descKey: 'services.card.residentialHvacDesc',
  },
  {
    iconKey: 'VRFSystems',
    titleKey: 'services.card.vrfSystems',
    descKey: 'services.card.vrfSystemsDesc',
  },
  {
    iconKey: 'PreventiveMaintenance',
    titleKey: 'services.card.preventiveMaintenance',
    descKey: 'services.card.preventiveMaintenanceDesc',
  },
  {
    iconKey: 'Emergency247',
    titleKey: 'services.card.emergency247',
    descKey: 'services.card.emergency247Desc',
  },
]

function Services() {
  const { t } = useTranslation()

  const services = SERVICES_DATA.map((s) => ({
    Icon: ServiceIcons[s.iconKey],
    title: t(s.titleKey),
    description: t(s.descKey),
  }))

  return (
    <section className="services" id="servicios">
      <div className="services__container">
        <h2 className="services__title">{t('services.title')}</h2>
        <div className="services__title-accent"></div>
        <p className="services__subtitle">{t('services.subtitle')}</p>
        <div className="services__grid">
          {services.map((service, index) => (
            <div className="services__card" key={index}>
              <div className="services__card-icon">
                <service.Icon />
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
