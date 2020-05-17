'use strict';

let currentLocation = navigator.geolocation.getCurrentPosition(getWeatherData, error);

function getWeatherData(position) {
    currentLocation = position.coords;
    // Fetching Weather data from Openweathermap
    // API key: c50d08ff7a7d0ee1c09a3f597d3e83bc
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&lang=en&appid=c50d08ff7a7d0ee1c09a3f597d3e83bc`).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        const sec = document.getElementById('weather');

        switch (json.weather[0].icon) {
            case '01d': // Clear Sky Day
                sec.innerHTML = `<img src="icons/WeatherClearDay.svg">`;
                break;
            case '01n': // Clear Sky Night
                sec.innerHTML = `<img src="icons/WeatherClearNight.svg">`;
                break;
            case '02d': // Few Clouds Day
                sec.innerHTML = `<img src="icons/WeatherFewCloudsDay.svg">`;
                break;
            case '02n': // Few Clouds Night
                sec.innerHTML = `<img src="icons/WeatherFewCloudsNight.svg">`;
                break;
            case '03d': // Scattered Clouds (Day + Night)
            case '03n':
                sec.innerHTML = `<img src="icons/WeatherScatteredClouds.svg">`;
                break;
            case '04d': // Broken Clouds (Day + Night)
            case '04n':
                sec.innerHTML = `<img src="icons/WeatherBrokenClouds.svg">`;
                break;
            case '09d': // Shower Rain (Day + Night)
            case '09n':
                sec.innerHTML = `<img src="icons/WeatherShowerRain.svg">`;
                break;
            case '10d': // Rain Day
                sec.innerHTML = `<img src="icons/WeatherRainDay.svg">`;
                break;
            case '10n': // Rain Night
                sec.innerHTML = `<img src="icons/WeatherRainNight.svg">`;
                break;
            case '11d': // Thunderstorm (Day + Night)
            case '11n':
                sec.innerHTML = `<img src="icons/WeatherThunderstorm.svg">`;
                break;
            case '13d': // Snow (Day + Night)
            case '13n':
                sec.innerHTML = `<img src="icons/WeatherSnow.svg">`;
                break;
            case '50d': // Mist (Day + Night)
            case '50n':
                sec.innerHTML = `<img src="icons/WeatherMist.svg">`;
                break;
        }

        sec.innerHTML += `<h2>${json.weather[0].main}</h2>
                          <p>${json.weather[0].description}</p>
                          <p id="temp">Temperature: ${json.main.temp} °C</p>`;
    }).catch(function (error) {
        console.log('Error: ' + error);
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

