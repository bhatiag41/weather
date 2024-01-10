import React, { useState, useEffect } from 'react';
import Search from './components/search/search';
import CurrentWeather from './components/search/current-weather/CurrentWeather'
import Forecast from './components/forecast/Forecast';
import './App.css'

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [city,setCity] = useState('Your Location');

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e672e000839281b415d889d2a4fc94ee&units=metric`);
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e672e000839281b415d889d2a4fc94ee&units=metric`);

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastData });
      setCity(searchData.label);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleOnSearchChange({ label: 'Your Location', value: `${latitude} ${longitude}` });
      },
      (error) => {
        console.error('Error getting location:', error);
        window.alert("Error getting location")
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Initial fetch based on geolocation
    handleRefresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <div  className='cont'>

        <div class="loader">
        <div class="wrapper">
          <div class="circle"></div>
          <div class="line-1"></div>
          <div class="line-2"></div>
          <div class="line-3"></div>
          <div class="line-4"></div>
        </div>
      </div>
        </div>
        ) : (
          <div className='container'>
            <div className='inner'>
          <Search onSearchChange={handleOnSearchChange} />
          <button onClick={handleRefresh} className='btn'>Refresh</button>
            </div>
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
        </div>
      )}
    </div>
  );
};

export default App;