import './WeatherEffects.css'

function WeatherEffects({ condition }) {
  if (condition === 'clear') {
    return <div className="weather-effects weather-effects--sun" />
  }

  if (condition === 'clouds') {
    return (
      <div className="weather-effects weather-effects--clouds">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="weather-effects__cloud"
            style={{
              top: `${5 + Math.random() * 40}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${18 + Math.random() * 14}s`,
              opacity: 0.15 + Math.random() * 0.2,
              transform: `scale(${0.6 + Math.random() * 0.8})`,
            }}
          />
        ))}
      </div>
    )
  }

  if (condition === 'rain') {
    return (
      <div className="weather-effects weather-effects--rain">
        <div className="weather-effects__lightning"></div>
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="weather-effects__drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.4 + Math.random() * 0.4}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>
    )
  }

  if (condition === 'snow') {
    return (
      <div className="weather-effects weather-effects--snow">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="weather-effects__flake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${10 + Math.random() * 14}px`,
              opacity: 0.5 + Math.random() * 0.4,
            }}
          >
            {['❄', '❅', '❆', '•'][i % 4]}
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default WeatherEffects
