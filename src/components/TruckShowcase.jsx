import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, Thermometer, ShieldCheck, Clock } from 'lucide-react';

const truckImg = `${import.meta.env.BASE_URL}references/gris.webp`;
const tarjetaImg = `${import.meta.env.BASE_URL}references/EDICIONFINAL-clean.png`;
import './TruckShowcase.css';

const features = [
  { icon: Zap, titleKey: 'truckShowcase.featInstall.title', descKey: 'truckShowcase.featInstall.desc' },
  { icon: Thermometer, titleKey: 'truckShowcase.featVRF.title', descKey: 'truckShowcase.featVRF.desc' },
  { icon: ShieldCheck, titleKey: 'truckShowcase.featMaintenance.title', descKey: 'truckShowcase.featMaintenance.desc' },
  { icon: Clock, titleKey: 'truckShowcase.featEmergency.title', descKey: 'truckShowcase.featEmergency.desc' },
];

const TruckShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const ratio = 1 - Math.max(0, Math.min(1, rect.top / viewH));
      section.style.setProperty('--scroll-progress', ratio.toFixed(3));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="truck-showcase" id="fleet" ref={sectionRef}>
      <div className="truck-showcase__scroll-overlay"></div>
      <div className="truck-showcase__container">
        
        <div className="truck-showcase__header">
          <span className="truck-showcase__eyebrow">{t('truckShowcase.eyebrow')}</span>
          <h2 className="truck-showcase__title">{t('truckShowcase.title')}</h2>
          <p className="truck-showcase__subtitle">{t('truckShowcase.subtitle')}</p>
        </div>

        <div className="truck-showcase__image-wrapper">
          <img
            src={truckImg}
            alt={t('truckShowcase.imgAlt')}
            className="truck-showcase__image"
          />
          <span className="truck-showcase__badge truck-showcase__badge--emergency">
            {t('truckShowcase.emergencyBadge')}
          </span>
        </div>

        <div className="truck-showcase__features">
          {features.map((f, i) => (
            <div className="truck-showcase__feature" key={i}>
              <f.icon size={28} className="truck-showcase__feature-icon" />
              <p className="truck-showcase__feature-title">{t(f.titleKey)}</p>
              <p className="truck-showcase__feature-desc">{t(f.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="truck-showcase__divider"></div>
        <p className="truck-showcase__tagline" dangerouslySetInnerHTML={{ __html: t('truckShowcase.fleetTagline') }} />

        <div className="truck-showcase__tarjeta">
          <img
            src={tarjetaImg}
            alt="SR Air Corporation — Tarjeta de presentación"
            className="truck-showcase__tarjeta-img"
          />
        </div>

        <div className="truck-showcase__trust-badges">
          <span>{t('truckShowcase.trustLicensed')}</span>
          <span>{t('truckShowcase.trustEmergency')}</span>
          <span>{t('truckShowcase.trustValues')}</span>
        </div>

      </div>
    </section>
  );
};

export default TruckShowcase;
