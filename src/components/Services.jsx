import { useTranslation } from 'react-i18next'
import ServiceIcons from './ServiceIcons'
import './Services.css'

function Services() {
  const { t } = useTranslation()

  const services = [
    { Icon: ServiceIcons.Heating, title: t('services.card.heating'), description: t('services.card.heatingDesc') },
    { Icon: ServiceIcons.CommercialHVAC, title: t('services.card.commercialHvac'), description: t('services.card.commercialHvacDesc') },
    { Icon: ServiceIcons.ResidentialHVAC, title: t('services.card.residentialHvac'), description: t('services.card.residentialHvacDesc') },
    { Icon: ServiceIcons.VRFSystems, title: t('services.card.vrfSystems'), description: t('services.card.vrfSystemsDesc') },
    { Icon: ServiceIcons.PreventiveMaintenance, title: t('services.card.preventiveMaintenance'), description: t('services.card.preventiveMaintenanceDesc') },
    { Icon: ServiceIcons.Emergency247, title: t('services.card.emergency247'), description: t('services.card.emergency247Desc') },
  ]

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
