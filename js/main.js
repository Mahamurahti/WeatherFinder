'use strict';

let currentLocation = navigator.geolocation.getCurrentPosition(getWeatherData, error);

let forecast = navigator.geolocation.getCurrentPosition(getForecast, error);

function getWeatherData(position) {
    currentLocation = position.coords;
    console.log('%c Current coordinates: [' + currentLocation.latitude + ", " + currentLocation.longitude + "]", "color:orangered; font-weight:bold;");
    // Fetching Weather data from Openweathermap
    // API key: c50d08ff7a7d0ee1c09a3f597d3e83bc
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&lang=en&appid=c50d08ff7a7d0ee1c09a3f597d3e83bc`
        ).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log('%c Fetched from Openweathermap: Weather', 'color: orangered; font-weight:bold;');
            console.log(json);

            const divLoc = document.getElementById('location');
            const divImg = document.getElementById('currentWeather');
            const divInfo = document.getElementById('weatherInfo');
            let today = new Date();

            let backgroundAnimation = document.getElementById('backgroundAnimation');
            let main = document.querySelector('main');
            const orientation = '45deg';
            let colorOne, colorTwo, textColor = '';
            
            divLoc.innerHTML += `<p>in <strong>${json.name}, ${json.sys.country}</strong> as of ${today.getHours()}:${today.getMinutes()}`;
            
            switch (json.weather[0].icon) {
            case '01d': // Clear Sky Day
                divImg.innerHTML += `<img src="icons/WeatherClearDay.svg">`;
                colorOne = '#E9DFB2';
                colorTwo = '#E4E4E0';
                textColor = 'black';
                break;
            case '01n': // Clear Sky Night
                divImg.innerHTML += `<img src="icons/WeatherClearNight.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '02d': // Few Clouds Day
                divImg.innerHTML += `<img src="icons/WeatherFewCloudsDay.svg">`;
                colorOne = '#96CCD9';
                colorTwo = '#98B0B5';
                textColor = 'black';
                break;
            case '02n': // Few Clouds Night
                divImg.innerHTML += `<img src="icons/WeatherFewCloudsNight.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '03d': // Scattered Clouds (Day + Night)
                divImg.innerHTML += `<img src="icons/WeatherScatteredClouds.svg">`;
                colorOne = '#6D7E82';
                colorTwo = '#7FADB8';
                textColor = 'black';
                break;
            case '03n':
                divImg.innerHTML += `<img src="icons/WeatherScatteredClouds.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '04d': // Broken Clouds (Day + Night) 
                divImg.innerHTML += `<img src="icons/WeatherBrokenClouds.svg">`;
                colorOne = '#497B87';
                colorTwo = '#7DAAB5';
                textColor = 'black';
                break;
            case '04n':
                divImg.innerHTML += `<img src="icons/WeatherBrokenClouds.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '09d': // Shower Rain (Day + Night)
                divImg.innerHTML += `<img src="icons/WeatherShowerRain.svg">`;
                colorOne = '#8194A3';
                colorTwo = '#1583D6';
                textColor = 'black';
                break;
            case '09n':
                divImg.innerHTML += `<img src="icons/WeatherShowerRain.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '10d': // Rain Day
                divImg.innerHTML += `<img src="icons/WeatherRainDay.svg">`;
                colorOne = '#4F7AD6';
                colorTwo = '#8E939D';
                textColor = 'black';
                break;
            case '10n': // Rain Night
                divImg.innerHTML += `<img src="icons/WeatherRainNight.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '11d': // Thunderstorm (Day + Night)
                divImg.innerHTML += `<img src="icons/WeatherThunderstorm.svg">`;
                colorOne = '#A19B4D';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '11n':
                divImg.innerHTML += `<img src="icons/WeatherThunderstorm.svg">`;
                colorOne = '#A19B4D';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '13d': // Snow (Day + Night)
                divImg.innerHTML += `<img src="icons/WeatherSnow.svg">`;
                colorOne = '#BFEFF2';
                colorTwo = '#B5E2E6';
                textColor = 'black';
                break;
            case '13n':
                divImg.innerHTML += `<img src="icons/WeatherSnow.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
            case '50d': // Mist (Day + Night)
                divImg.innerHTML += `<img src="icons/WeatherMist.svg">`;
                colorOne = '#CCE0E3';
                colorTwo = '#B9CDD0';
                textColor = 'black';
                break;
            case '50n':
                divImg.innerHTML += `<img src="icons/WeatherMist.svg">`;
                colorOne = '#03141A';
                colorTwo = '#10272E';
                textColor = 'white';
                break;
        }

        divInfo.innerHTML += `<p id="temp">${json.main.temp} °C</p>
        <h2>${json.weather[0].main}</h2>
        <h2 id="feel">Feels like ${json.main.feels_like} °C</h2>`;

        backgroundAnimation.style.backgroundImage = 'linear-gradient(' + orientation + ', ' + colorOne + ', ' + colorTwo + ')';
        main.style.color = textColor;

    }).catch(function (error) {
        console.log('Error: ' + error);
    });
}

function getForecast(position) {
    currentLocation = position.coords;
    // Fetching Weather data from Openweathermap
    // API key: c50d08ff7a7d0ee1c09a3f597d3e83bc
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&lang=en&appid=c50d08ff7a7d0ee1c09a3f597d3e83bc`
        ).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log('%c Fetched from Openweathermap: Forecast', 'color: orangered; font-weight:bold;');
            console.log(json);

            

    }).catch(function (error) {
        console.log('Error: ' + error);
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
