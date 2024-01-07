import './current-weather.css'
import React from 'react'

const CurrentWeather = () => {
  return (
        <div className='weather'>
          <div className='top'>
            <p className='city'>Nainital</p>
            <p className='weather-description'>sunny</p>
          </div>
          <img alt='weather' className='weather-icon' src=''/>
        </div>
  )
}

export default CurrentWeather
