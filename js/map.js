'use strict';

let currentPos = null;
let map = L.map('mapid');

navigator.geolocation.getCurrentPosition(getPosAndSurroundings, error);

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