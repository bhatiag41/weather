import  CurrentWeather  from './components/search/current-weather/CurrentWeather';
import './App.css';
import Search from './components/search/search';
import { useState } from 'react';

function App() {
  const [currentWeather,setCurrentWeather]=useState(null)
  const [forecast,setforecast]=useState(null)
  const handleOnSearchChange = (searchData)=>{
  const [lat,lon]= searchData.value.split(" ");

  const CurrentWeatherFetch= fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e672e000839281b415d889d2a4fc94ee&units=metric`)
  const ForecastFetch= fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e672e000839281b415d889d2a4fc94ee&units=metric`)
 Promise.all([CurrentWeatherFetch,ForecastFetch])
 .then(async(response)=>{
  const weatherResponse=await response[0].json();
  const forecastResponse=await response[1].json();
  setCurrentWeather({city:searchData.label,...weatherResponse})
  setforecast({city:searchData.label,...forecastResponse})
 })
.catch((err=>console.log(err)));
}
console.log(currentWeather);
console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}  />}
    </div>
  );
}

export default App;
