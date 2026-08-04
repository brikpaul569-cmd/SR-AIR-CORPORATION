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
            <a href="https://facebook.com/sraircorp" target="_blank" rel="noopener noreferrer" className="footer__social--facebook" aria-label={t('footer.facebook')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/sraircorp" target="_blank" rel="noopener noreferrer" className="footer__social--instagram" aria-label={t('footer.instagram')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://tiktok.com/@sraircorp" target="_blank" rel="noopener noreferrer" className="footer__social--tiktok" aria-label={t('footer.tiktok')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
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
          <div className="footer__cta-group">
            <button className="footer__round-btn" onClick={onContactOpen} aria-label={t('footer.cta')} title={t('footer.cta')}>
              <Phone size={24} />
            </button>

            <a href="https://wa.me/17206804049" target="_blank" rel="noopener noreferrer"
               className="footer__round-btn footer__round-btn--whatsapp"
               aria-label={t('footer.whatsapp')} title={t('footer.whatsapp')}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
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
