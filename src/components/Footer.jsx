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
            <a href="https://facebook.com/sraircorp" target="_blank" rel="noopener noreferrer" aria-label={t('footer.facebook')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/sraircorp" target="_blank" rel="noopener noreferrer" aria-label={t('footer.instagram')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://tiktok.com/@sraircorp" target="_blank" rel="noopener noreferrer" aria-label={t('footer.tiktok')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.4 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.3 0 .59.04.86.12v-3.5a6.37 6.37 0 00-.86-.06A6.34 6.34 0 104.3 17.32a6.34 6.34 0 0010.27-4.96V7.98a8.23 8.23 0 004.76 1.52v-3.4a4.8 4.8 0 01-.74-.41z"/></svg>
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
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-1.099-1.003-1.842-2.274-2.058-2.659-.217-.385-.023-.594.163-.782.166-.166.372-.434.558-.651.185-.217.247-.372.371-.62.124-.248.062-.465-.031-.651-.094-.186-.672-1.628-.922-2.228-.243-.586-.491-.587-.672-.588-.173-.001-.371-.001-.57-.001-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462.864 2.617.985 2.797.12.18 1.542 2.003 3.748 2.73 2.206.727 2.206.485 2.604.455.398-.03 1.287-.523 1.468-1.028.181-.505.181-.941.124-1.586z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.689.878 5.163 2.355 7.156L.637 23.14c-.312.857.508 1.668 1.357 1.34l4.03-1.707A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6c-1.934 0-3.757-.581-5.296-1.575l-.38-.234-3.894 1.65 1.72-3.786-.283-.425A9.553 9.553 0 012.4 12c0-5.303 4.297-9.6 9.6-9.6S21.6 6.697 21.6 12 17.303 21.6 12 21.6z"/>
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
