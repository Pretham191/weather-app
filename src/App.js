import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [currentView, setCurrentView] = useState('today');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [city, setCity] = useState('Chennai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Your OpenWeather API key
  const API_KEY = 'feb02e0df1a49ff268a4905dc55f5fe7';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    sidebar: {
      width: '280px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      padding: '30px 20px',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)'
    },
    logo: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '40px',
      letterSpacing: '3px',
      background: 'linear-gradient(45deg, #fff, #a8edea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navMenu: {
      listStyle: 'none'
    },
    navItem: {
      marginBottom: '15px'
    },
    navLink: {
      display: 'block',
      padding: '15px 20px',
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      width: '100%',
      textAlign: 'left'
    },
    navLinkActive: {
      background: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      transform: 'translateX(5px)'
    },
    mainContent: {
      flex: 1,
      padding: '30px',
      overflowY: 'auto'
    },
    searchContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '30px',
      alignItems: 'center'
    },
    searchInput: {
      flex: 1,
      padding: '15px 20px',
      border: 'none',
      borderRadius: '50px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    searchBtn: {
      padding: '15px 25px',
      border: 'none',
      borderRadius: '50px',
      background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    },
    locationBtn: {
      padding: '15px',
      border: 'none',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #48c6ef, #6f86d6)',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    },
    weatherCard: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    currentWeather: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      alignItems: 'center'
    },
    weatherMain: {
      textAlign: 'center'
    },
    locationName: {
      fontSize: '2rem',
      marginBottom: '10px',
      fontWeight: '600'
    },
    temperature: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      background: 'linear-gradient(45deg, #fff, #a8edea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    weatherDescription: {
      fontSize: '1.2rem',
      opacity: 0.9,
      textTransform: 'capitalize'
    },
    weatherDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    },
    detailItem: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '15px',
      borderRadius: '12px',
      textAlign: 'center'
    },
    detailLabel: {
      fontSize: '0.9rem',
      opacity: 0.8,
      marginBottom: '5px'
    },
    detailValue: {
      fontSize: '1.3rem',
      fontWeight: 'bold'
    },
    hourlyForecast: {
      display: 'flex',
      gap: '15px',
      overflowX: 'auto',
      padding: '20px 0'
    },
    hourlyItem: {
      minWidth: '120px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      fontWeight: '600'
    },
    forecastGrid: {
      display: 'grid',
      gap: '15px'
    },
    forecastItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)'
    },
    forecastDay: {
      fontWeight: '600',
      width: '100px'
    },
    forecastTemp: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    },
    tempHigh: {
      fontWeight: 'bold',
      fontSize: '1.2rem'
    },
    tempLow: {
      opacity: 0.7
    },
    airQualityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px'
    },
    aqiCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    },
    aqiValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    aqiLabel: {
      fontSize: '0.9rem',
      opacity: 0.8
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      padding: '40px'
    },
    error: {
      color: '#ff6b6b',
      textAlign: 'center',
      fontSize: '1.1rem',
      padding: '20px',
      background: 'rgba(255, 107, 107, 0.1)',
      borderRadius: '12px',
      marginBottom: '20px'
    }
  };

  // Mock data for demonstration (replace with actual API calls)
  const mockWeatherData = {
    name: city,
    main: {
      temp: 31.41,
      feels_like: 35.2,
      humidity: 62,
      pressure: 1013
    },
    weather: [{
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }],
    wind: {
      speed: 6.59
    },
    visibility: 10000
  };

  const mockForecastData = {
    list: Array.from({ length: 40 }, (_, i) => ({
      dt: 1691654400 + (i * 3600 * 3), // Every 3 hours
      main: { 
        temp: 31.41 - (i * 0.5) + Math.random() * 3,
        temp_min: 25 + Math.random() * 3,
        temp_max: 33 + Math.random() * 3
      },
      weather: [{ 
        main: ['Rain', 'Clouds', 'Clear', 'Thunderstorm'][Math.floor(i / 8) % 4], 
        icon: '10d' 
      }]
    }))
  };

  const mockAirQuality = {
    main: { aqi: 3 },
    components: {
      co: 233.4,
      no: 0.01,
      no2: 13.4,
      o3: 68.9,
      so2: 0.6,
      pm2_5: 8.9,
      pm10: 15.2
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Get current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Weather data not found');
      }
      
      const weatherData = await weatherResponse.json();
      
      // Get forecast data
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not found');
      }
      
      const forecastData = await forecastResponse.json();
      
      // Get air quality data using coordinates from weather data
      const airQualityResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
      );
      
      let airQualityData = null;
      if (airQualityResponse.ok) {
        airQualityData = await airQualityResponse.json();
      }
      
      // Update state with real data
      setWeatherData(weatherData);
      setForecastData(forecastData);
      setAirQualityData(airQualityData);
      setLoading(false);
      
    } catch (err) {
      console.error('API Error:', err);
      setError(`Failed to fetch weather data: ${err.message}`);
      
      // Fall back to mock data for demonstration
      setTimeout(() => {
        setWeatherData(mockWeatherData);
        setForecastData(mockForecastData);
        setAirQualityData(mockAirQuality);
        setLoading(false);
      }, 1000);
    }
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Get city name from coordinates
            const reverseGeoResponse = await fetch(
              `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            
            if (reverseGeoResponse.ok) {
              const data = await reverseGeoResponse.json();
              setCity(data.name);
              setWeatherData(data);
              
              // Get forecast for current location
              const forecastResponse = await fetch(
                `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
              );
              
              if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                setForecastData(forecastData);
              }
              
              // Get air quality for current location
              const airQualityResponse = await fetch(
                `${BASE_URL}/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
              );
              
              if (airQualityResponse.ok) {
                const airQualityData = await airQualityResponse.json();
                setAirQualityData(airQualityData);
              }
            }
          } catch (error) {
            setError('Failed to get weather for your location');
          }
        },
        (error) => {
          setError('Unable to get your location. Please search for a city instead.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long'
    });
  };

  const getAQIStatus = (aqi) => {
    const statuses = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return statuses[aqi - 1] || 'Unknown';
  };

  const renderTodayView = () => (
    <div>
      {weatherData && weatherData.main && weatherData.weather && (
        <div style={styles.weatherCard}>
          <div style={styles.currentWeather}>
            <div style={styles.weatherMain}>
              <h2 style={styles.locationName}>{weatherData.name || 'Unknown Location'}</h2>
              <div style={styles.temperature}>{Math.round(weatherData.main.temp)}°C</div>
              <p style={styles.weatherDescription}>{weatherData.weather[0]?.description || 'No description'}</p>
            </div>
            <div style={styles.weatherDetails}>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Feels like</div>
                <div style={styles.detailValue}>{Math.round(weatherData.main.feels_like || 0)}°C</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Humidity</div>
                <div style={styles.detailValue}>{weatherData.main.humidity || 0}%</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Wind</div>
                <div style={styles.detailValue}>{weatherData.wind?.speed || 0} km/h</div>
              </div>
              <div style={styles.detailItem}>
                <div style={styles.detailLabel}>Pressure</div>
                <div style={styles.detailValue}>{weatherData.main.pressure || 0} hPa</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {forecastData && forecastData.list && (
        <div style={styles.weatherCard}>
          <h3 style={styles.sectionTitle}>Hourly Forecast</h3>
          <div style={styles.hourlyForecast}>
            {forecastData.list.slice(0, 8).map((item, index) => (
              <div key={index} style={styles.hourlyItem}>
                <div>{item.dt ? formatTime(item.dt) : '--:--'}</div>
                <div style={{ fontSize: '1.5rem', margin: '10px 0' }}>
                  {item.main ? Math.round(item.main.temp) : '--'}°
                </div>
                <div style={{ opacity: 0.8 }}>
                  {item.weather && item.weather[0] ? item.weather[0].main : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderForecastView = () => (
    <div>
      {forecastData && forecastData.list && (
        <div style={styles.weatherCard}>
          <h3 style={styles.sectionTitle}>5-Day Forecast</h3>
          <div style={styles.forecastGrid}>
            {Array.from({ length: 5 }, (_, i) => {
              const dayData = forecastData.list[i * 8];
              if (!dayData) return null;
              
              return (
                <div key={i} style={styles.forecastItem}>
                  <div style={styles.forecastDay}>
                    {i === 0 ? 'Today' : formatDate(dayData.dt)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ opacity: 0.8 }}>
                      {dayData.weather && dayData.weather[0] ? dayData.weather[0].main : 'N/A'}
                    </span>
                    <div style={styles.forecastTemp}>
                      <span style={styles.tempHigh}>
                        {dayData.main ? Math.round(dayData.main.temp) : '--'}°
                      </span>
                      <span style={styles.tempLow}>
                        {dayData.main ? Math.round(dayData.main.temp - 5) : '--'}°
                      </span>
                    </div>
                  </div>
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      )}
    </div>
  );

  const renderAirQualityView = () => (
    <div>
      {airQualityData && airQualityData.main && airQualityData.components && (
        <div style={styles.weatherCard}>
          <h3 style={styles.sectionTitle}>Air Quality Index</h3>
          <div style={styles.airQualityGrid}>
            <div style={styles.aqiCard}>
              <div style={styles.aqiValue}>{airQualityData.main.aqi}</div>
              <div style={styles.aqiLabel}>AQI - {getAQIStatus(airQualityData.main.aqi)}</div>
            </div>
            <div style={styles.aqiCard}>
              <div style={styles.aqiValue}>{airQualityData.components.pm2_5?.toFixed(1) || 'N/A'}</div>
              <div style={styles.aqiLabel}>PM2.5 (μg/m³)</div>
            </div>
            <div style={styles.aqiCard}>
              <div style={styles.aqiValue}>{airQualityData.components.pm10?.toFixed(1) || 'N/A'}</div>
              <div style={styles.aqiLabel}>PM10 (μg/m³)</div>
            </div>
            <div style={styles.aqiCard}>
              <div style={styles.aqiValue}>{airQualityData.components.o3?.toFixed(1) || 'N/A'}</div>
              <div style={styles.aqiLabel}>O₃ (μg/m³)</div>
            </div>
            <div style={styles.aqiCard}>
              <div style={styles.aqiValue}>{airQualityData.components.no2?.toFixed(1) || 'N/A'}</div>
              <div style={styles.aqiLabel}>NO₂ (μg/m³)</div>
            </div>
            <div style={styles.aqiCard}>
              <div style={styles.aqiValue}>{airQualityData.components.co?.toFixed(1) || 'N/A'}</div>
              <div style={styles.aqiLabel}>CO (μg/m³)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>CLIMA</div>
        <nav style={styles.navMenu}>
          {[
            { id: 'forecast', label: 'Forecast' },
            { id: 'today', label: 'Today' },
            { id: 'air-quality', label: 'Air Quality' }
          ].map((item) => (
            <div key={item.id} style={styles.navItem}>
              <button
                style={{
                  ...styles.navLink,
                  ...(currentView === item.id ? styles.navLinkActive : {})
                }}
                onClick={() => setCurrentView(item.id)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for cities..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.searchInput}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
          <button style={styles.locationBtn} onClick={getCurrentLocation}>
            📍
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {loading ? (
          <div style={styles.loading}>Loading weather data...</div>
        ) : (
          <>
            {currentView === 'today' && renderTodayView()}
            {currentView === 'forecast' && renderForecastView()}
            {currentView === 'air-quality' && renderAirQualityView()}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;