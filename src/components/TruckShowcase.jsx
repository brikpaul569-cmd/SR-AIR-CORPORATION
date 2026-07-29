import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Globe, MapPin, QrCode } from 'lucide-react';
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
            src="/references/sinfondo2.png"
            alt={t('truckShowcase.imgAlt')}
            className="truck-showcase__image"
          />
          <span className="truck-showcase__badge truck-showcase__badge--emergency">
            {t('truckShowcase.emergencyBadge')}
          </span>
        </div>

        <div className="truck-showcase__info-panel">
          <div className="truck-showcase__brand">
            <div className="truck-showcase__logo">{t('truckShowcase.logo')}</div>
            <div>
              <h3>{t('truckShowcase.brandTitle')} <span>{t('truckShowcase.brandTitleAccent')}</span></h3>
              <p>{t('truckShowcase.brandSubtitle')}</p>
            </div>
          </div>

          <div className="truck-showcase__president">
            <span>{t('truckShowcase.presidentName')}</span> | {t('truckShowcase.presidentLabel')}
          </div>

          <div className="truck-showcase__contact-grid">
            <a href="tel:+17206804049" className="truck-showcase__contact-item">
              <Phone size={18} />
              <span>(720) 680-4049</span>
            </a>
            <a href="mailto:srair.contracting@gmail.com" className="truck-showcase__contact-item">
              <Mail size={18} />
              <span>srair.contracting@gmail.com</span>
            </a>
            <a href="https://sraircorp.com" target="_blank" rel="noreferrer" className="truck-showcase__contact-item">
              <Globe size={18} />
              <span>sraircorp.com</span>
            </a>
            <div className="truck-showcase__contact-item">
              <MapPin size={18} />
              <span>Longmont, Colorado</span>
            </div>
          </div>

          <div className="truck-showcase__qr">
            <QrCode size={40} />
            <span>{t('truckShowcase.qrLabel')}<br />{t('truckShowcase.qrSubLabel')}</span>
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
