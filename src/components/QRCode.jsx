import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'
import './QRCode.css'

function QRCode({ size = 160, label = true, variant = 'footer' }) {
  const { t } = useTranslation()

  return (
    <div className={`qr qr--${variant}`}>
      <div className="qr__frame">
        <QRCodeSVG
          value="https://sraircorp.com"
          size={size}
          bgColor="transparent"
          fgColor="#ffc107"
          level="H"
          includeMargin={false}
          imageSettings={{
            src: '/favicon.svg',
            x: undefined,
            y: undefined,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          }}
        />
      </div>
      {label && (
        <p className="qr__label">
          {t('qr.scanToVisit')}<br /><strong>{t('qr.domain')}</strong>
        </p>
      )}
    </div>
  )
}

export default QRCode
