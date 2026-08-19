import { useTranslation } from 'react-i18next'
import './AboutUs.css'

function AboutUs() {
  const { t } = useTranslation()

  return (
    <section className="about" id="nosotros">
      <div className="about__diagonal-top"></div>
      <div className="about__container">
        <div className="about__content">
          <h2 className="about__title">{t('about.title')}</h2>
          <div className="about__title-accent"></div>
          <p className="about__text">{t('about.desc1')}</p>
          <p className="about__text">{t('about.desc2')}</p>
            <div className="about__values">
            <div className="about__value">
              <span className="about__value-icon">◆</span>
              <div>
                <h4 className="about__value-title">{t('about.valueCertified')}</h4>
                <p className="about__value-desc">{t('about.valueCertifiedDesc')}</p>
              </div>
            </div>
            <div className="about__value">
              <span className="about__value-icon">◆</span>
              <div>
                <h4 className="about__value-title">{t('about.valueExperience')}</h4>
                <p className="about__value-desc">{t('about.valueExperienceDesc')}</p>
              </div>
            </div>
            <div className="about__value">
              <span className="about__value-icon">◆</span>
              <div>
                <h4 className="about__value-title">{t('about.valueSpecialists')}</h4>
                <p className="about__value-desc">{t('about.valueSpecialistsDesc')}</p>
              </div>
            </div>
            <div className="about__value">
              <span className="about__value-icon">◆</span>
              <div>
                <h4 className="about__value-title">{t('about.valueColorado')}</h4>
                <p className="about__value-desc">{t('about.valueColoradoDesc')}</p>
              </div>
            </div>
          </div>
          <a href="#contacto" className="about__cta">{t('about.cta')}</a>
        </div>
        <div className="about__image">
          <div className="about__image-placeholder">
            <span className="about__image-text">{t('about.imageText')}</span>
            <span className="about__image-subtext">{t('about.imageSubtext')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
