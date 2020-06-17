'use strict';

let currentPos = null;
let map = L.map('mapid');

navigator.geolocation.getCurrentPosition(getPosAndSurroundings, error);

function getPosAndSurroundings(pos) {
    currentPos = pos.coords;
    showMap(currentPos);
}

function showMap(pos) {
    map.setView([pos.latitude, pos.longitude], 5);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=c50d08ff7a7d0ee1c09a3f597d3e83bc').addTo(map);