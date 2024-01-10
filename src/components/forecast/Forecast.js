import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";
import React from "react";
const hours = [
'00','03','06','09','12','15','18','21'
];
function convertTo12Hour(hour) {
  const date = new Date(`2000-01-01T${hour}:00:00`);
  const options = { hour: 'numeric', minute: '2-digit' };
  const hour12 = date.getHours() % 12 || 12;

  return date.toLocaleTimeString('en-US', { ...options, hour: '2-digit' }).replace(/^(\d{1,2}):(\d{2}) (\w{2})$/, (_, h, m, period) => `${hour12}:${m} ${period}`);
}
const Forecast = ({ data }) => {
 const currentDate = new Date();
  const currentHour = currentDate.getHours().toString().padStart(2, '0');

  const stringHours = hours.map(hour => hour.toString());
  const forecastday = stringHours
    .slice(stringHours.indexOf(currentHour), stringHours.length)
    .concat(stringHours.slice(0, stringHours.indexOf(currentHour)));

  const convertedHours = forecastday.map(convertTo12Hour);
    // console.log(forecastday)
  return (
    <>
                <div className="para-row top">
            <span className="para-label">Details</span>
          </div>
      <Accordion allowZeroExpanded style={{animationFillMode: 'forwards'}}>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{convertedHours[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C/
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="daily-det-grid">
                    <div className="daily-det-grid-item">
                        <label>Pressure</label>
                        <label>{item.main.pressure}hPa</label>
                    </div>
                    <div className="daily-det-grid-item">
                        <label>Humidity</label>
                        <label>{item.main.humidity}%</label>
                    </div>
                    <div className="daily-det-grid-item">
                        <label>Clouds</label>
                        <label>{item.clouds.all}%</label>
                    </div>
                    <div className="daily-det-grid-item">
                        <label>Wind Speed</label>
                        <label>{item.wind.speed}m/s</label>
                    </div>
                    <div className="daily-det-grid-item">
                        <label>Sea Level</label>
                        <label>{item.main.sea_level}m</label>
                    </div>
                    <div className="daily-det-grid-item">
                        <label>Feels Like</label>
                        <label>{Math.round(item.main.feels_like)}°C</label>
                    </div>
                </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
        <AccordionItem></AccordionItem>
      </Accordion>
    </>
  );
};

export default Forecast;
