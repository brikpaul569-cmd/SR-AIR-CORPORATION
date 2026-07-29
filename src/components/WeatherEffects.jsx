import './WeatherEffects.css'

function WeatherEffects({ condition }) {
  if (condition === 'clear') {
    return (
      <div className="weather-effects weather-effects--sun">
        <div className="weather-effects__glow"></div>
        <div className="weather-effects__rays"></div>
      </div>
    )
  }

  if (condition === 'rain') {
    return (
      <div className="weather-effects weather-effects--rain">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="weather-effects__drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>
    )
  }

  if (condition === 'snow') {
    return (
      <div className="weather-effects weather-effects--snow">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="weather-effects__flake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${6 + Math.random() * 8}px`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>
    )
  }

  return null
}

export default WeatherEffects
