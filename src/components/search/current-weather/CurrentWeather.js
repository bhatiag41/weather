import "./current-weather.css";
import React from "react";

const CurrentWeather = ({data}) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
      </div>
      <div className="bottom">
        <p className="temp">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="para-row">
            <span className="para-label">Details</span>
          </div>
          <div className="para-row">
            <span className="para-label">Feels Like</span>
            <span className="para-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="para-row">
            <span className="para-label">Wind</span>
            <span className="para-value">{Math.round(data.wind.speed)}m/s</span>
          </div>
          <div className="para-row">
            <span className="para-label">Humidity</span>
            <span className="para-value">{Math.round(data.main.humidity)}%</span>
          </div>
          <div className="para-row">
            <span className="para-label">Pressure</span>
            <span className="para-value">{Math.round(data.main.pressure)}hPa</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CurrentWeather;
