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
        let hours = new Date().getHours();
        if(hours < 10){
            hours = "0" + hours;
        }
        let minutes = new Date().getMinutes();
        if(minutes < 10){
            minutes = "0" + minutes;
        }

        let backgroundAnimation = document.getElementById('backgroundAnimation');
        let main = document.querySelector('main');
        const orientation = '45deg';
        let colorOne, colorTwo, textColor = '';

        divLoc.innerHTML += `<p>in <strong>${json.name}, ${json.sys.country}</strong> as of ${hours}:${minutes}`;

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
                colorTwo = '#D0E6F2';
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
                colorTwo = '#D0E6F2';
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

        divInfo.innerHTML += `<h2 id="temp">${Math.round(json.main.temp)} °C</h2>
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
        console.log('%c Fetched from Openweathermap: Forecast', 'color: green; font-weight:bold;');
        console.log(json);

        const ul = document.createElement("ul");

        for (let i = 0; i < json.list.length; i++) {

            let li = document.createElement("li");

            switch (json.list[i].weather[0].icon) {
                case '01d': // Clear Sky Day
                    li.innerHTML += `<img src="icons/WeatherClearDay.svg">`;
                    break;
                case '01n': // Clear Sky Night
                    li.innerHTML += `<img src="icons/WeatherClearNight.svg">`;
                    break;
                case '02d': // Few Clouds Day
                    li.innerHTML += `<img src="icons/WeatherFewCloudsDay.svg">`;
                    break;
                case '02n': // Few Clouds Night
                    li.innerHTML += `<img src="icons/WeatherFewCloudsNight.svg">`;
                    break;
                case '03d': // Scattered Clouds (Day + Night)
                    li.innerHTML += `<img src="icons/WeatherScatteredClouds.svg">`;
                    break;
                case '03n':
                    li.innerHTML += `<img src="icons/WeatherScatteredClouds.svg">`;
                    break;
                case '04d': // Broken Clouds (Day + Night) 
                    li.innerHTML += `<img src="icons/WeatherBrokenClouds.svg">`;
                    break;
                case '04n':
                    li.innerHTML += `<img src="icons/WeatherBrokenClouds.svg">`;
                    break;
                case '09d': // Shower Rain (Day + Night)
                    li.innerHTML += `<img src="icons/WeatherShowerRain.svg">`;
                    break;
                case '09n':
                    li.innerHTML += `<img src="icons/WeatherShowerRain.svg">`;
                    break;
                case '10d': // Rain Day
                    li.innerHTML += `<img src="icons/WeatherRainDay.svg">`;
                    break;
                case '10n': // Rain Night
                    li.innerHTML += `<img src="icons/WeatherRainNight.svg">`;
                    break;
                case '11d': // Thunderstorm (Day + Night)
                    li.innerHTML += `<img src="icons/WeatherThunderstorm.svg">`;
                    break;
                case '11n':
                    li.innerHTML += `<img src="icons/WeatherThunderstorm.svg">`;
                    break;
                case '13d': // Snow (Day + Night)
                    li.innerHTML += `<img src="icons/WeatherSnow.svg">`;
                    break;
                case '13n':
                    li.innerHTML += `<img src="icons/WeatherSnow.svg">`;
                    break;
                case '50d': // Mist (Day + Night)
                    li.innerHTML += `<img src="icons/WeatherMist.svg">`;
                    break;
                case '50n':
                    li.innerHTML += `<img src="icons/WeatherMist.svg">`;
                    break;
            }

            let dateTime = json.list[i].dt_txt.split(" ");                  // Splitting the time info
            let date = dateTime[0].split("-");                              // First part is the date which we split again
            let formattedDate = date[2] + "." + date[1] + "." + date[0];    // We reconstruct the date to match our needs (2020-06-17 -> 17.06.2020)
            let time = dateTime[1].slice(0, -3);                            // Second part is the time from which we slice the seconds away

            li.innerHTML += `<h2 id="futTemp">${Math.round(json.list[i].main.temp)} °C</h2>
            <p id="futTime">${time}</p>
            <p id="futDate">${formattedDate}</p>`;

            ul.appendChild(li);
        }

        const divForecast = document.getElementById("forecast");

        divForecast.appendChild(ul);

    }).catch(function (error) {
        console.log('Error: ' + error);
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
