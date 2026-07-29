import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react'
import './WeatherBadge.css'

const CONDITION_ICONS = {
  clear: Sun,
  clouds: Cloud,
  rain: CloudRain,
  snow: Snowflake,
}

const TOGGLE_OPTIONS = ['clear', 'clouds', 'rain', 'snow']

function WeatherBadge({ condition, temp, city, onOverride }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const Icon = CONDITION_ICONS[condition] || Sun

  const CONDITION_LABELS = {
    clear: t('weather.clear'),
    clouds: t('weather.clouds'),
    rain: t('weather.rain'),
    snow: t('weather.snow'),
  }

  return (
    <div className="weather-badge">
      <button
        className="weather-badge__main"
        onClick={() => setExpanded(!expanded)}
        title={t('weather.info')}
      >
        <Icon size={14} />
        {temp !== null && <span className="weather-badge__temp">{temp}°C</span>}
        <span className="weather-badge__city">{city}</span>
      </button>

      {expanded && (
        <div className="weather-badge__dropdown">
          <span className="weather-badge__label">{t('weather.simulate')}</span>
          <div className="weather-badge__options">
            {TOGGLE_OPTIONS.map((opt) => {
              const OptIcon = CONDITION_ICONS[opt]
              return (
                <button
                  key={opt}
                  className={`weather-badge__option ${condition === opt ? 'weather-badge__option--active' : ''}`}
                  onClick={() => {
                    onOverride(opt)
                    setExpanded(false)
                  }}
                >
                  <OptIcon size={12} />
                  {CONDITION_LABELS[opt]}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherBadge
