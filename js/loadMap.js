'use strict';

let currentPos = null;
let map = L.map('mapid');
const layer = L.layerGroup().addTo(map);

navigator.geolocation.getCurrentPosition(getPosAndSurroundings, error);

// If the user grants permission, the site will search the weather from the
// nearest weather station to the users coordinates.
function getPosAndSurroundings(pos) {
    currentPos = pos.coords;
    showMap(currentPos);
}

// Showing the map with the actual map from Openstreetmaps and a precipitation layer
// on top of the actual map.
function showMap(pos) {
    map.setView([pos.latitude, pos.longitude], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(layer);

    L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=c50d08ff7a7d0ee1c09a3f597d3e83bc').addTo(layer);
}

// If the user doesn't grant permission to use the users location, then the default view
// of the map will be set (Helsinki).
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    console.log("Displaying map without coordinates. Default location: Helsinki");

    showMap({latitude: 60.1699, longitude:24.9384});
}

// Saving the theme that user has toggled
const theme = document.getElementById("theme");
const bg = document.getElementById("backgroundAnimation");
const themeText = document.getElementById("themeText");

// Setting the theme, if the user has a preferred one.
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

// Checking if the user has a preferred theme.
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
