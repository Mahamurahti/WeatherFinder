'use strict';

let currentLocation = navigator.geolocation.getCurrentPosition(getPosition, error);

function getPosition(position) {
    currentLocation = position.coords;
    // API key: c50d08ff7a7d0ee1c09a3f597d3e83bc
    // Fetching Weather data from openweathermap
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&lang=en&appid=c50d08ff7a7d0ee1c09a3f597d3e83bc`).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        const sec = document.getElementById('weather');

        if(json.weather[0].main === "Rain"){
            sec.innerHTML = `<img src="icons/Icon_RainDay.png">
                            <h2>${json.weather[0].main}<p><br>${json.weather[0].description}</p></p>
                            <p id="temp">Temperature: ${json.main.temp} °C</p>`;
        }

            /*
        sec.innerHTML = `<img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png">
                            <h2>${json.weather[0].main}<p><br>${json.weather[0].description}</p></p>
                            <p id="temp">Temperature: ${json.main.temp} °C</p>`;
                            */
    }).catch(function (error) {
        console.log('Error: ' + error);
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

