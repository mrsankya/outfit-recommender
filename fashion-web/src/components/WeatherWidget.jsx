// src/components/WeatherWidget.jsx
import { useState, useEffect, useCallback } from 'react';
import { CloudSun, MapPin, Wind, Thermometer, RefreshCw, Check, Navigation, LocateFixed, Building2 } from 'lucide-react';
import './WeatherWidget.css';

// City presets with exact coordinates
export const CAMPUS_CITIES = [
  { name: 'Jalgaon (Campus)', queryName: 'Jalgaon, Maharashtra', lat: 21.0077, lon: 75.5626, isDefault: true },
  { name: 'Pune', queryName: 'Pune, Maharashtra', lat: 18.5204, lon: 73.8567 },
  { name: 'Mumbai', queryName: 'Mumbai, Maharashtra', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi', queryName: 'Delhi, India', lat: 28.6139, lon: 77.2090 },
];

export default function WeatherWidget({ onApplyWeatherSeason }) {
  const [city, setCity] = useState('Jalgaon');
  const [detectedLocation, setDetectedLocation] = useState('Jalgaon, Maharashtra');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState(null);
  const [detectionSource, setDetectionSource] = useState('campus'); // 'gps' | 'ip' | 'campus' | 'manual'

  // Map WMO weather codes and temperature to Indian seasons & styling
  const deduceSeasonAndVibe = (temp, weathercode) => {
    let season = 'Summer';
    let suggestion = '';

    if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) {
      season = 'Monsoon';
      suggestion = 'Rainy / overcast conditions detected. Recommending quick-dry fabrics, waterproof footwear & breathable lightweight layers.';
    } else if (temp < 20) {
      season = 'Winter';
      suggestion = `Crisp cool temperature (${temp}°C). Recommending woollen layers, jackets, trench coats & insulating knitwear.`;
    } else if (temp >= 20 && temp <= 27) {
      season = 'Spring/Autumn';
      suggestion = `Mild pleasant temperature (${temp}°C). Perfect for light denim, blazers, polos & smart casual layering.`;
    } else {
      season = 'Summer';
      suggestion = `Warm climate (${temp}°C). Recommending lightweight cottons, linen shirts, short kurtas & breathable sandals.`;
    }

    return { season, suggestion };
  };

  // Fetch Open-Meteo weather given latitude & longitude
  const fetchWeatherForCoords = async (latitude, longitude, locationName, source = 'gps') => {
    setLoading(true);
    setError(null);
    try {
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!wRes.ok) throw new Error('Could not fetch live weather data');
      const wData = await wRes.json();
      const current = wData.current_weather;

      const { season, suggestion } = deduceSeasonAndVibe(current.temperature, current.weathercode);

      const weatherObj = {
        city: locationName,
        temp: current.temperature,
        wind: current.windspeed,
        code: current.weathercode,
        season,
        suggestion
      };

      setWeather(weatherObj);
      setDetectedLocation(locationName);
      setCity(locationName.split(',')[0]);
      setDetectionSource(source);
      localStorage.setItem('preferredCity', locationName);

      if (onApplyWeatherSeason) {
        onApplyWeatherSeason(season, weatherObj);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
      setDetecting(false);
    }
  };

  // Load preset city directly
  const loadPresetCity = (preset) => {
    fetchWeatherForCoords(preset.lat, preset.lon, preset.queryName, preset.isDefault ? 'campus' : 'manual');
  };

  // Precise Auto-detection
  const autoDetectLocation = useCallback(async () => {
    setDetecting(true);
    setError(null);

    // Fallback: Check IP or default to Jalgaon campus
    const fallbackToCampusOrIP = async () => {
      try {
        const ipRes = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client');
        if (!ipRes.ok) throw new Error('IP service down');
        const ipData = await ipRes.json();

        // If ISP routes via Nashik NOC or Maharashtra regional hub, correct to Jalgaon Campus!
        if (ipData.city === 'Nashik' || ipData.locality === 'Nashik' || !ipData.city) {
          await fetchWeatherForCoords(21.0077, 75.5626, 'Jalgaon, Maharashtra', 'campus');
          return;
        }

        const lat = ipData.latitude;
        const lon = ipData.longitude;
        const locName = ipData.city || ipData.locality || 'Jalgaon';
        const fullLocation = ipData.principalSubdivision ? `${locName}, ${ipData.principalSubdivision}` : locName;

        await fetchWeatherForCoords(lat, lon, fullLocation, 'ip');
      } catch {
        // Safe default: Jalgaon campus
        await fetchWeatherForCoords(21.0077, 75.5626, 'Jalgaon, Maharashtra', 'campus');
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const revRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const revData = await revRes.json();

            // Check if within North Maharashtra ISP gateway
            let cityName = revData.city || revData.locality || revData.principalSubdivision;
            if (cityName === 'Nashik' && Math.abs(lat - 21.0) < 1.5) {
              cityName = 'Jalgaon';
            }

            const locationLabel = revData.principalSubdivision && cityName !== revData.principalSubdivision
              ? `${cityName}, ${revData.principalSubdivision}`
              : cityName || 'Jalgaon, Maharashtra';

            await fetchWeatherForCoords(lat, lon, locationLabel, 'gps');
          } catch {
            await fetchWeatherForCoords(lat, lon, 'Jalgaon, Maharashtra', 'gps');
          }
        },
        async () => {
          await fallbackToCampusOrIP();
        },
        { timeout: 4000, enableHighAccuracy: true }
      );
    } else {
      await fallbackToCampusOrIP();
    }
  }, []);

  // Fetch weather by manual city search
  const fetchWeatherByCityName = async (targetCity) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(targetCity.trim())}&count=1`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${targetCity}" not found. Try Jalgaon, Pune, Mumbai, Delhi...`);
      }

      const { name, latitude, longitude, admin1, country } = geoData.results[0];
      const displayLabel = admin1 ? `${name}, ${admin1}` : `${name}, ${country || ''}`;

      await fetchWeatherForCoords(latitude, longitude, displayLabel, 'manual');
    } catch (err) {
      setError(err.message || 'Failed to fetch city weather');
      setLoading(false);
      setDetecting(false);
    }
  };

  // Run on mount
  useEffect(() => {
    // If user has saved a preferred city in localStorage, use it
    const saved = localStorage.getItem('preferredCity');
    if (saved && saved.toLowerCase().includes('jalgaon')) {
      fetchWeatherForCoords(21.0077, 75.5626, 'Jalgaon, Maharashtra', 'campus');
    } else {
      autoDetectLocation();
    }
  }, [autoDetectLocation]);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeatherByCityName(city.trim());
  };

  return (
    <div className="weather-widget">
      <div className="ww-header">
        <div className="ww-title">
          <CloudSun size={18} className="ww-icon" />
          <span>Live Weather-Aware Stylist</span>

          {detectionSource === 'campus' && (
            <span className="ww-source-badge campus" title="G H Raisoni College Campus, Jalgaon">
              <Building2 size={11} /> Jalgaon (Campus Exact)
            </span>
          )}
          {detectionSource === 'gps' && (
            <span className="ww-source-badge gps" title="Auto-detected using device GPS">
              <Navigation size={10} /> GPS Auto-Detected
            </span>
          )}
          {detectionSource === 'ip' && (
            <span className="ww-source-badge ip" title="Auto-detected network location">
              <LocateFixed size={10} /> Auto-Detected
            </span>
          )}
        </div>

        <div className="ww-actions">
          {/* Quick city chips */}
          <div className="ww-quick-chips">
            {CAMPUS_CITIES.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`ww-chip ${detectedLocation.startsWith(c.name.split(' ')[0]) ? 'active' : ''}`}
                onClick={() => loadPresetCity(c)}
              >
                {c.isDefault && <Building2 size={11} />}
                {c.name}
              </button>
            ))}
          </div>

          {/* Re-detect button */}
          <button
            type="button"
            onClick={autoDetectLocation}
            className="ww-autodetect-btn"
            disabled={detecting || loading}
            title="Auto-detect exact location"
          >
            <LocateFixed size={13} className={detecting ? 'spin' : ''} />
            <span>{detecting ? 'Detecting...' : 'Re-Detect'}</span>
          </button>

          {/* Manual search */}
          <form onSubmit={handleCitySubmit} className="ww-city-form">
            <MapPin size={13} className="ww-pin" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="ww-city-input"
            />
            <button type="submit" className="ww-submit-btn" disabled={loading || detecting}>
              {loading && !detecting ? <RefreshCw size={12} className="spin" /> : 'Go'}
            </button>
          </form>
        </div>
      </div>

      {error && <div className="ww-error">{error}</div>}

      {weather && !error && (
        <div className="ww-content">
          <div className="ww-metrics">
            <span className="ww-temp"><Thermometer size={16} /> {weather.temp}°C</span>
            <span className="ww-wind"><Wind size={14} /> {weather.wind} km/h wind</span>
            <span className="ww-badge">Season: <strong>{weather.season}</strong></span>
            <span className="ww-location-pill">📍 {weather.city}</span>
          </div>
          <p className="ww-suggestion">
            💡 {weather.suggestion}
          </p>
          <div className="ww-applied-note">
            <Check size={12} /> Live styling adapted for <strong>{weather.city}</strong> ({weather.temp}°C · {weather.season})
          </div>
        </div>
      )}
    </div>
  );
}
