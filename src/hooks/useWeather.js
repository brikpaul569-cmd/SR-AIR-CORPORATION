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
    tint: 'rgba(20, 15, 5, 0.80)',
    accent: '#ffc107',
  },
  clouds: {
    tint: 'rgba(15, 15, 18, 0.84)',
    accent: '#a0a0a0',
  },
  rain: {
    tint: 'rgba(8, 12, 25, 0.85)',
    accent: '#60a5fa',
  },
  snow: {
    tint: 'rgba(12, 18, 30, 0.83)',
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
