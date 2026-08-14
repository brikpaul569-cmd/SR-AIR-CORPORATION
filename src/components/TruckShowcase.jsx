import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import truckImg from '../../references/black.png';
import './TruckShowcase.css';

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

        <div className="truck-showcase__card">
          <div className="truck-showcase__card-content">
            <div className="truck-showcase__card-brand">
              <h3 className="truck-showcase__card-company">SR AIR CORPORATION</h3>
              <p className="truck-showcase__card-tagline">COMERCIAL • INDUSTRIAL • RESIDENCIAL HVAC</p>
            </div>

            <div className="truck-showcase__card-divider"></div>

            <p className="truck-showcase__card-name">
              <span className="truck-showcase__card-name-highlight">Saith S. Rojas</span> | Presidente
            </p>

            <div className="truck-showcase__card-contact">
              <div className="truck-showcase__card-contact-item">
                <Phone size={14} />
                <span>(720) 680-4049</span>
              </div>
              {/* PLACEHOLDER — replace with the client's second number when provided */}
              <div className="truck-showcase__card-contact-item">
                <Phone size={14} />
                <span>(123) 123-1234</span>
              </div>
              <div className="truck-showcase__card-contact-item">
                <Mail size={14} />
                <span>srair.contracting@gmail.com</span>
              </div>
              <div className="truck-showcase__card-contact-item">
                <Globe size={14} />
                <span>sraircorp.com</span>
              </div>
              <div className="truck-showcase__card-contact-item">
                <MapPin size={14} />
                <span>Longmont, Colorado</span>
              </div>
            </div>
          </div>
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
