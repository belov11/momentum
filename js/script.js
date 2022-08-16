"use strict";


//Time and clock
function clock() {
    const time = document.querySelector("time");
    const dateNum = document.querySelector("date");
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let sec = date.getSeconds();
    let days = date.getDay();
    let day = date.getDate();
    let mounth = date.getMonth();
    const weekDay = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday",
    }
    for (let key in weekDay) {
        if (key == days) {
            days = weekDay[days];
        }
    }
    const mounthName = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    }
    // convert num of mounth in word
    for (let key in mounthName) {
        if (key == mounth) {
            mounth = mounthName[mounth];
        }
    }
    // func for time which add "0" 
    const createNum = (num) => {
        if (String(num).length > 1) {
            return num;
        } else {
            return "0" + num;
        } 
    }
    hours = createNum(hours);
    mins = createNum(mins);
    sec = createNum(sec);
    
    // change index html for time and date
    time.innerHTML = `${hours}:${mins}:${sec}`;
    dateNum.innerHTML = `${days}, ${day} ${mounth}`
}
const clockTime = setInterval(() => clock(), 500); // update interval 0.5s 

const greeting = () => {
    const greetingName = document.getElementsByClassName("greeting");
    const greetingHours = new Date().getHours();
    // compare hours and output greeting 
    const word = "Good";
    if (greetingHours >= 6 && greetingHours < 12) greetingName[0].textContent = word + " " + "morning";
    if (greetingHours >= 12 && greetingHours < 18) greetingName[0].textContent = word + " " + "afternoon";
    if (greetingHours >= 18 && greetingHours < 24) greetingName[0].textContent = word + " " + "evening";
    if (greetingHours >= 0 && greetingHours < 6) greetingName[0].textContent = word + " " + "night";
}
greeting();

const name = document.getElementsByClassName("name");
name[0].placeholder = 'Enter name :)';

function setLocalStorage() {
    // install variable in local storage    
    localStorage.setItem('name', name[0].value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload',setLocalStorage);

function getLocalStorage() {
    // get variable in local storage
    if(localStorage.getItem('name')) {
        name[0].value = localStorage.getItem('name');
    }
    if(localStorage.getItem("city")) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage);

//slider

let slideItem = Math.floor(Math.random() * 20);
let url = 'https://raw.githubusercontent.com/belov11/stage1-tasks/assets/images/';
let season = document.getElementsByClassName("greeting")[0];
const body = document.body;
const nextSlide = document.querySelector(".slide-next");
const prevSlide = document.querySelector(".slide-prev");

function plusSlide() {
    slideItem = +slideItem + 1;
    showSlides();
}

function minusSlide() {
    slideItem = +slideItem - 1;
    showSlides();
}

nextSlide.addEventListener("click", plusSlide);
prevSlide.addEventListener("click", minusSlide);

window.addEventListener("load", () => {
    showSlides();
})

function showSlides() {
    slideItem > 20 ? slideItem = 1 : slideItem;
    slideItem < 1 ? slideItem = 20 : slideItem;
    1 <= slideItem && slideItem <= 9 ? slideItem = "0" + slideItem : slideItem;
    let link = url + season.textContent.slice(5) + "/" + slideItem + ".webp";
    body.style.background = `url(${link}) center/cover, rgba(0, 0, 0, 0.5)`;
}

// Weather
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
let city = document.querySelector(".city");
city.value = "Minsk"; // kill the func
async function getWeather() {    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=455f1399525de25b11d38f53298307ab&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404") {
       city.placeholder = data.message;
       temp.textContent = "Error. Incorrect name of city";
    }
    if (data.cod === "400") {
        city.placeholder = "Enter city";
        temp.textContent = "";
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temp.textContent = `${Math.round(data.main.temp)} °C ${data.weather[0].description}
    Wind speed ${Math.round(data.wind.speed)} m/s
    Humidity ${Math.round(data.main.humidity)} %`;
    
    
}
function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }
  
  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);

// Quote
async function getQuotes() {
    const quotes = 'json/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const quote = document.querySelector(".quote");
    const author = document.querySelector(".author");
    let quotesNum = Math.floor(Math.random() * (data.length));
    quote.textContent = `${data[quotesNum].text}`;
    author.textContent = `${data[quotesNum].author}`;
}
getQuotes();

//change quote when click on button
const changeQuote = document.querySelector(".change-quote");
changeQuote.addEventListener('click', function() {
    getQuotes();
})

import playList from './playList.js';

let playNum = 0;

const audio = new Audio(playList[playNum].src);

const playButton = document.querySelector('.play.player-icon');
const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const timeline = document.querySelector('.timeline');
const progressMusic = document.querySelector('.timeline__progress');
let timeCurrent = document.querySelector('.time__current');
let timeLength = document.querySelector('.time__length');
let musicName = document.querySelector('.music__name');

playList.forEach((el, index) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${playList[index].title}`
    playListContainer.appendChild(li);
});

const li = document.querySelectorAll('.play-item');

function showPlayList() {
    if (playList.length >= 5) {
        playList.forEach((el, index) => {
            index > 4 ? li[index].style.cssText = `position: absolute; top : -100%` : li;
        })
    } 
}
showPlayList();

function playAudio() {
    playButton.classList.remove("play");
    playButton.classList.add("pause");
    playerImprove(); 
    audio.play();
}

function stopAudio() {
    playButton.classList.remove("pause");
    playButton.classList.add("play");
    audio.pause(); 
}

function nextMusic() {
    li[playNum].style.color = 'white';
    playNum += 1;
    playNum > playList.length - 1 ? playNum = 0 : playNum;
    audio.src = playList[playNum].src;
    stopAudio();
    li[playNum].style.color = '#C5B358';
    setTimeout(playAudio, 500);
}

function prevMusic() {
    li[playNum].style.color = 'white';
    playNum -= 1;
    playNum < 0 ? playNum = playList.length - 1 : playNum;
    audio.src = playList[playNum].src;
    stopAudio();
    li[playNum].style.color = '#C5B358';
    setTimeout(playAudio, 500);
}

playNextButton.addEventListener("click", () => {
    nextMusic();
});

playPrevButton.addEventListener("click", () => {
    prevMusic();
})

playButton.addEventListener("click", () => {
    if (audio.paused) {
        li[playNum].style.color = '#C5B358';
        playAudio();
    } else {
        stopAudio();
    }
}, false);

function playerImprove() {
    timeLength.textContent = getTimeinNum(audio.duration);
    musicName.textContent = playList[playNum].title;
    setInterval(() => {
        progressMusic.style.width = audio.currentTime / audio.duration * 100 + "%";
        timeCurrent.textContent = getTimeinNum(audio.currentTime);
        audio.currentTime === audio.duration ? nextMusic() : "";
    }, 500)
}

timeline.addEventListener("click", e => {
    const progressLineWidth = window.getComputedStyle(timeline).width;
    const transitionToTime = e.offsetX / parseInt(progressLineWidth) * audio.duration;
    audio.currentTime = transitionToTime;
}, false)

audio.addEventListener("loadeddata", () => {
    audio.volume = 0.8;
}, false);



const volumeSlider = document.querySelector('.volume-slider');

const volumeButton = document.querySelector('.volume-button');

volumeButton.addEventListener("click", () => {
    const volumeIcon = document.querySelector('.volume');
    audio.muted =! audio.muted;
    if (audio.muted) {
        volumeIcon.classList.remove('icono-volumeMedium');
        volumeIcon.classList.add('icono-volumeMute');
    }   else {
        volumeIcon.classList.add('icono-volumeMedium');
        volumeIcon.classList.remove('icono-volumeMute');
    }
})

volumeSlider.addEventListener("click", e => {
    const volumeValue = document.querySelector('.volume-value');
    const volumeWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(volumeWidth);
    audio.volume = newVolume;
    volumeValue.style.width = newVolume * 100 + "%";
})

function getTimeinNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60)
        .padStart(2, 0)}`;
    return `${String(hours)
        .padStart(2, 0)}:${minutes}:${String(seconds % 60)
            .padStart(2, 0)}`;
  }
  


