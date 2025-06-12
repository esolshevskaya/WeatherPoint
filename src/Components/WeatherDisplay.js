import React from 'react';
import './WeatherDisplay.css';
import { mapWeatherToImage } from '../utils/mapWeatherToImage';
import { formatLocalTime } from '../utils/FormatLocalTime';

const WeatherDisplay = ({ weatherData }) => {
    if (!weatherData) return null;

    const {
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
        weather,
        timezone,
    } = weatherData;

    const weatherMain = weather[0].main;
    const weatherDescription = weather[0].description;

    const nowUnix = Math.floor(Date.now() / 1000);
    const weatherImage = mapWeatherToImage(weatherMain, nowUnix, timezone);

    const { time, date } = formatLocalTime(nowUnix, timezone);
    const sunriseTime = formatLocalTime(sunrise, timezone).time;
    const sunsetTime = formatLocalTime(sunset, timezone).time;

    return (
        <div className="weather-container">
            <div className="weather-meta">
                <div className="time">{time}</div>
                <div className="date">{date}</div>
            </div>

            <div className="weather-main-row">
                <h2 className="temperature">{temp.toFixed(1)}°C</h2>
<img src={process.env.PUBLIC_URL + `/assets/${weatherImage}`} alt={weatherDescription} className="weather-icon-large" />

            </div>

            <div className="feels-like">
                <p>Ощущается как: {feels_like.toFixed(1)}°C</p>
            </div>

            <div className="weather-details">
                <div className="detail-row">
                    <img src="/assets/icons/humidity.png" alt="Влажность" className="icon"/>
                    <span>Влажность: {humidity}%</span>
                </div>
                <div className="detail-row">
                    <img src="/assets/icons/wind.png" alt="Ветер" className="icon"/>
                    <span>Ветер: {speed}м/с</span>
                </div>
                <div className="detail-row-sun">
                    <img src="/assets/icons/sunrise.png" alt="Восход" className="icon-sun"/>
                    <span>Восход: {sunriseTime}</span>
                </div>
                <div className="detail-row-sun">
                    <img src="/assets/icons/sunset.png" alt="Закат" className="icon-sun"/>
                    <span>Закат: {sunsetTime}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
