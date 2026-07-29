import { useTranslation } from 'react-i18next';
import { Phone, Mail, Globe, MapPin, ArrowUp } from 'lucide-react';
import QRCode from './QRCode';
import './Footer.css';

const Footer = ({ onContactOpen }) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__top">
          <div className="footer__brand">
            <img src="/references/sr-logo.png" alt={t('footer.logoAlt')} className="footer__brand-logo" />
          </div>

          <div className="footer__contact">
            <a href="tel:+17206804049" className="footer__contact-item">
              <Phone size={18} />
              <span>(720) 680-4049</span>
            </a>
            <a href="mailto:srair.contracting@gmail.com" className="footer__contact-item">
              <Mail size={18} />
              <span>srair.contracting@gmail.com</span>
            </a>
            <a href="https://sraircorp.com" target="_blank" rel="noreferrer" className="footer__contact-item">
              <Globe size={18} />
              <span>sraircorp.com</span>
            </a>
            <div className="footer__contact-item">
              <MapPin size={18} />
              <span>Longmont, Colorado</span>
            </div>
          </div>

          <div className="footer__qr">
            <QRCode size={140} variant="footer" />
          </div>

          <div className="footer__social">
            <a href="#" aria-label={t('footer.facebook')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label={t('footer.instagram')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label={t('footer.linkedin')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__trust-badges">
          <span>{t('footer.trustLicensed')}</span>
          <span>{t('footer.trustEmergency')}</span>
          <span>{t('footer.trustValues')}</span>
          <span>{t('footer.trustServing')}</span>
        </div>

        <div className="footer__cta">
          <button className="footer__cta-btn" onClick={onContactOpen} aria-label={t('footer.cta')} title={t('footer.cta')}>
            <span className="footer__cta-tire-text">
              <Phone size={16} />
            </span>
          </button>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-center">
            <p>{t('footer.copyright', { year })}</p>
            <p className="footer__president">{t('footer.president')}</p>
          </div>
          <button className="footer__back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUp size={20} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
