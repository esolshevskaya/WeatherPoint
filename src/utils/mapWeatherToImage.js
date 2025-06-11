export const mapWeatherToImage = (main, timestamp, timezoneOffset) => {
    const localHour = new Date((timestamp + timezoneOffset) * 1000).getUTCHours();
    const isNight = localHour >= 21 || localHour < 6;

    if (['Mist', 'Smoke', 'Haze', 'Fog'].includes(main)) {
        return isNight ? 'mist-night.png' : 'mist-day.png';
    }

    if (main === 'Clear') {
        return isNight ? 'clear-night.png' : 'clear-day.png';
    }

    switch (main) {
        case 'Clouds':
            return 'cloudy.png';
        case 'Rain':
        case 'Drizzle':
            return 'rain.png';
        case 'Thunderstorm':
            return 'thunderstorm.png';
        case 'Snow':
            return 'snow.png';
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Sand':
        case 'Ash':
        case 'Squall':
        case 'Tornado':
            return 'extreme-weather.png';
        default:
            return 'cloudy.png';
    }
};