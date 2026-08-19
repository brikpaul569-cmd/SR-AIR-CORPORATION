import { useState, useEffect, useCallback } from 'react'

const DEFAULT_LOCATION = { lat: 40.1672, lon: -105.1019 } // Longmont, CO
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || ''
const REFRESH_INTERVAL = 10 * 60 * 1000 // 10 minutes

const WEATHER_MAP = {
  Clear: 'clear',
  Clouds: 'clouds',
  Rain: 'rain',
  Drizzle: 'rain',
  Snow: 'snow',
  Thunderstorm: 'rain',
  Mist: 'clouds',
  Fog: 'clouds',
  Haze: 'clouds',
}

const THEME_BY_WEATHER = {
  clear: {
    tint: 'rgba(30, 20, 5, 0.75)',
    tintLight: 'rgba(255, 230, 150, 0.18)',
    accent: '#ffc107',
  },
  clouds: {
    tint: 'rgba(20, 22, 30, 0.82)',
    tintLight: 'rgba(160, 170, 190, 0.22)',
    accent: '#a0a0a0',
  },
  rain: {
    tint: 'rgba(8, 14, 35, 0.88)',
    tintLight: 'rgba(80, 120, 180, 0.15)',
    accent: '#60a5fa',
  },
  snow: {
    tint: 'rgba(15, 22, 40, 0.85)',
    tintLight: 'rgba(180, 210, 240, 0.18)',
    accent: '#67e8f9',
  },
}

function useWeather(manualOverride = null) {
  const [weather, setWeather] = useState({
    condition: 'clear',
    temp: null,
    city: 'Longmont, CO',
    icon: '',
    loading: true,
    error: null,
  })

  const fetchWeather = useCallback(async (lat, lon) => {
    if (!API_KEY) {
      setWeather(prev => ({ ...prev, loading: false }))
      return
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      )
      if (!res.ok) throw new Error('Weather fetch failed')
      const data = await res.json()

      const mainCondition = data.weather[0].main
      const condition = WEATHER_MAP[mainCondition] || 'clear'

      setWeather({
        condition,
        temp: Math.round(data.main.temp),
        city: data.name || 'Longmont, CO',
        icon: data.weather[0].icon,
        loading: false,
        error: null,
      })
    } catch (err) {
      setWeather(prev => ({ ...prev, loading: false, error: err.message }))
    }
  }, [])

  useEffect(() => {
    if (manualOverride) {
      setWeather(prev => ({ ...prev, condition: manualOverride, loading: false }))
      return
    }

    let lat, lon

    const doFetch = (latitude, longitude) => {
      lat = latitude
      lon = longitude
      fetchWeather(lat, lon)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => doFetch(pos.coords.latitude, pos.coords.longitude),
        () => doFetch(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon)
      )
    } else {
      doFetch(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon)
    }

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      if (lat && lon) fetchWeather(lat, lon)
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [manualOverride, fetchWeather])

  return {
    ...weather,
    theme: THEME_BY_WEATHER[weather.condition] || THEME_BY_WEATHER.clear,
  }
}

export default useWeather
