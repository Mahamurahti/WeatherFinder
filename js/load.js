'use strict';

const theme = document.getElementById("theme");
const bg = document.getElementById("backgroundAnimation");
const themeText = document.getElementById("themeText");

theme.addEventListener("click", function(evt){
    if(bg.classList.contains('normal')){
        bg.classList.replace('normal', 'mystic');
        themeText.innerText = "Normalize";

        localStorage.setItem('theme', 'mystic');
    }else{
        bg.classList.replace('mystic', 'normal');
        themeText.innerText = "Mystify";

        localStorage.setItem('theme', 'normal');
    }
});

const inStorage = localStorage.getItem('theme');
if(inStorage){
    bg.classList.add(inStorage);
}else{
    bg.classList.add('normal');
}

if(bg.classList == 'normal'){
    themeText.innerText = "Mystify";
}else{
    themeText.innerText = "Normalize";
}

// Fetching Weather data from Openweathermap: Helsinki
// API key: c50d08ff7a7d0ee1c09a3f597d3e83bc
fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric&lang=en&appid=c50d08ff7a7d0ee1c09a3f597d3e83bc`
).then(function (response) {
    return response.json();
}).then(function (json) {
    console.log('%c Fetched from Openweathermap: Weather', 'color: green; font-weight:bold;');
    console.log(json);

    const divLoc = document.getElementById('location');
    const divImg = document.getElementById('currentWeather');
    const divInfo = document.getElementById('weatherInfo');
    let hours = new Date().getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    let minutes = new Date().getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let backgroundAnimation = document.getElementById('backgroundAnimation');
    let main = document.querySelector('main');
    const orientation = '45deg';
    let colorOne, colorTwo, textColor;

    divLoc.innerHTML += `<p>in <strong>${json.name}, ${json.sys.country}</strong> as of ${hours}:${minutes}`;

    switch (json.weather[0].icon) {
        case '01d': // Clear Sky Day
            divImg.innerHTML += `<img src="icons/WeatherClearDay.svg">`;
            colorOne = '#FFF275';
            colorTwo = '#FF8C42';
            textColor = 'black';
            break;
        case '01n': // Clear Sky Night
            divImg.innerHTML += `<img src="icons/WeatherClearNight.svg">`;
            colorOne = '#000022';
            colorTwo = '#10272E';
            textColor = 'white';
            break;
        case '02d': // Few Clouds Day
            divImg.innerHTML += `<img src="icons/WeatherFewCloudsDay.svg">`;
            colorOne = '#92DCE5';
            colorTwo = '#ECDD7B';
            textColor = 'black';
            break;
        case '02n': // Few Clouds Night
            divImg.innerHTML += `<img src="icons/WeatherFewCloudsNight.svg">`;
            colorOne = '#5B7B7A';
            colorTwo = '#000022';
            textColor = 'white';
            break;
        case '03d': // Scattered Clouds (Day + Night)
            divImg.innerHTML += `<img src="icons/WeatherScatteredClouds.svg">`;
            colorOne = '#ADACB5';
            colorTwo = '#B0D7FF';
            textColor = 'black';
            break;
        case '03n':
            divImg.innerHTML += `<img src="icons/WeatherScatteredClouds.svg">`;
            colorOne = '#2D3142';
            colorTwo = '#1E1A1D';
            textColor = 'white';
            break;
        case '04d': // Broken Clouds (Day + Night) 
            divImg.innerHTML += `<img src="icons/WeatherBrokenClouds.svg">`;
            colorOne = '#FBFAF8';
            colorTwo = '#6E675F';
            textColor = 'black';
            break;
        case '04n':
            divImg.innerHTML += `<img src="icons/WeatherBrokenClouds.svg">`;
            colorOne = '#423E37';
            colorTwo = '#10272E';
            textColor = 'white';
            break;
        case '09d': // Shower Rain (Day + Night)
            divImg.innerHTML += `<img src="icons/WeatherShowerRain.svg">`;
            colorOne = '#031D44';
            colorTwo = '#54DEFD';
            textColor = 'black';
            break;
        case '09n':
            divImg.innerHTML += `<img src="icons/WeatherShowerRain.svg">`;
            colorOne = '#1C3738';
            colorTwo = '#390099';
            textColor = 'white';
            break;
        case '10d': // Rain Day
            divImg.innerHTML += `<img src="icons/WeatherRainDay.svg">`;
            colorOne = '#454ADE';
            colorTwo = '#C0E8F9';
            textColor = 'black';
            break;
        case '10n': // Rain Night
            divImg.innerHTML += `<img src="icons/WeatherRainNight.svg">`;
            colorOne = '#725AC1';
            colorTwo = '#011638';
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
            colorOne = '#B89714';
            colorTwo = '#000000';
            textColor = 'white';
            break;
        case '13d': // Snow (Day + Night)
            divImg.innerHTML += `<img src="icons/WeatherSnow.svg">`;
            colorOne = '#BFEFF2';
            colorTwo = '#FFFFFF';
            textColor = 'black';
            break;
        case '13n':
            divImg.innerHTML += `<img src="icons/WeatherSnow.svg">`;
            colorOne = '#F9F8F8';
            colorTwo = '#000000';
            textColor = 'white';
            break;
        case '50d': // Mist (Day + Night)
            divImg.innerHTML += `<img src="icons/WeatherMist.svg">`;
            colorOne = '#7798AB';
            colorTwo = '#FFD6E0';
            textColor = 'black';
            break;
        case '50n':
            divImg.innerHTML += `<img src="icons/WeatherMist.svg">`;
            colorOne = '#788585';
            colorTwo = '#10272E';
            textColor = 'white';
            break;
    }

    divInfo.innerHTML += `<h2 id="temp">${Math.round(json.main.temp)} °C</h2>
        <h2>${json.weather[0].main} / Humidity:  ${json.main.humidity}%</h2>
        <h2 id="feel">Feels like ${json.main.feels_like} °C</h2>`;

    backgroundAnimation.style.backgroundImage = 'linear-gradient(' + orientation + ', ' + colorOne + ', ' + colorTwo + ')';
    main.style.color = textColor;

}).catch(function (error) {
    console.log('Error: ' + error);
});

// Fetching Forecast data from Openweathermap: Helsinki
// API key: c50d08ff7a7d0ee1c09a3f597d3e83bc
fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Helsinki&units=metric&lang=en&appid=c50d08ff7a7d0ee1c09a3f597d3e83bc`
).then(function (response) {
    return response.json();
}).then(function (json) {
    console.log('%c Fetched from Openweathermap: Forecast', 'color: green; font-weight:bold;');
    console.log(json);

    const ul = document.createElement("ul");
    ul.classList.add('listOfForecast');

    for (let i = 0; i < json.list.length; i++) {

        const li = document.createElement("li");
        li.classList.add("listElement" + i);

        switch (json.list[i].weather[0].icon) {
            case '01d': // Clear Sky Day
                li.innerHTML = `<img src="icons/WeatherClearDay.svg">`;
                break;
            case '01n': // Clear Sky Night
                li.innerHTML = `<img src="icons/WeatherClearNight.svg">`;
                break;
            case '02d': // Few Clouds Day
                li.innerHTML = `<img src="icons/WeatherFewCloudsDay.svg">`;
                break;
            case '02n': // Few Clouds Night
                li.innerHTML = `<img src="icons/WeatherFewCloudsNight.svg">`;
                break;
            case '03d': // Scattered Clouds (Day + Night)
                li.innerHTML = `<img src="icons/WeatherScatteredClouds.svg">`;
                break;
            case '03n':
                li.innerHTML = `<img src="icons/WeatherScatteredClouds.svg">`;
                break;
            case '04d': // Broken Clouds (Day + Night) 
                li.innerHTML = `<img src="icons/WeatherBrokenClouds.svg">`;
                break;
            case '04n':
                li.innerHTML = `<img src="icons/WeatherBrokenClouds.svg">`;
                break;
            case '09d': // Shower Rain (Day + Night)
                li.innerHTML = `<img src="icons/WeatherShowerRain.svg">`;
                break;
            case '09n':
                li.innerHTML = `<img src="icons/WeatherShowerRain.svg">`;
                break;
            case '10d': // Rain Day
                li.innerHTML = `<img src="icons/WeatherRainDay.svg">`;
                break;
            case '10n': // Rain Night
                li.innerHTML = `<img src="icons/WeatherRainNight.svg">`;
                break;
            case '11d': // Thunderstorm (Day + Night)
                li.innerHTML = `<img src="icons/WeatherThunderstorm.svg">`;
                break;
            case '11n':
                li.innerHTML = `<img src="icons/WeatherThunderstorm.svg">`;
                break;
            case '13d': // Snow (Day + Night)
                li.innerHTML = `<img src="icons/WeatherSnow.svg">`;
                break;
            case '13n':
                li.innerHTML = `<img src="icons/WeatherSnow.svg">`;
                break;
            case '50d': // Mist (Day + Night)
                li.innerHTML = `<img src="icons/WeatherMist.svg">`;
                break;
            case '50n':
                li.innerHTML = `<img src="icons/WeatherMist.svg">`;
                break;
        }

        let dateTime = json.list[i].dt_txt.split(" ");                  // Splitting the time info
        let date = dateTime[0].split("-");                              // First part is the date which we split again
        let formattedDate = date[2] + "." + date[1] + "." + date[0];    // We reconstruct the date to match our needs (2020-06-17 -> 17.06.2020)
        let time = dateTime[1].slice(0, -3);                            // Second part is the time from which we slice the seconds away

        li.innerHTML += `<h2 id="futTemp">${Math.round(json.list[i].main.temp)} °C<i> / ${Math.round(json.list[i].main.feels_like)} °C</i></h2>
            <p id="futDesc">${json.list[i].weather[0].description}</p><p id="futTime">${time}</p>
            <p id="futDate">${formattedDate}</p>`;

        ul.appendChild(li);
    }

    const divForecast = document.getElementById("forecast");
    divForecast.appendChild(ul);

}).catch(function (error) {
    console.log('Error: ' + error);
});