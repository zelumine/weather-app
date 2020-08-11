const key = '39b2960a873461b5190f79a9a24fb051'; 
const url = './cities-fr.json';

let cityID;
let weatherUrl;
let cityOptions;
let selectedCity;
let previousIconID;
let previousForecastIcon;
let nextDaysDate;
let dtWithoutHour;

let todaysDate = new Date();
let todaysYear = todaysDate.getFullYear();
let todaysMonth = todaysDate.getMonth() +1;
let todaysDay = todaysDate.getDate();
let todaysWeekDay = todaysDate.getDay();

const selectList = document.querySelector('#select-cities');
const cityName = document.querySelector('#city-title');
const date = document.querySelector('#date');
const loader = document.querySelector('.loader');
const weatherCard = document.querySelector('.card');
const currentWeather = document.querySelector('#current-weather');
const currentTemp = document.querySelector('#current-temp');
const forecastWeekDays = Array.from(document.querySelectorAll('.week-days'));
const forecast = Array.from(document.querySelectorAll('.forecast'));
const forecastIcons = Array.from(document.querySelectorAll('.forecast-icon'));
const minTemps = Array.from(document.querySelectorAll('.min-temp'));
const maxTemps = Array.from(document.querySelectorAll('.max-temp'));


if (todaysMonth + 1 < 10) {
  todaysMonth = '0' + todaysMonth;
}

// Got help from https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn(`There was a problem. Status code: ${response.status}`);  
        return;  
      }

      response.json().then(function(data) { 
        populateList(data);
    	   
        selectedCity = document.getElementsByTagName('option')[0];
        selectedCity.setAttribute('selected', true);

        cityOptions = Array.from(document.getElementsByTagName('option'));
        getCurrentWeather(selectedCity.dataset.cityId);
        getForecast(selectedCity.dataset.cityId);
      });  
    }  
  )  
  .catch(function(err) {  
    console.error(`Fetch error: ${err}`);  
  });

function populateList(data) {
  let option;

  for (let i = 0; i < data.length; i++) {
    option = document.createElement('option');
    option.text = data[i].nm;
    option.value = data[i].nm;
    option.dataset.cityId = data[i].id;
    selectList.appendChild(option);
  }   
}

function getCity() {
  cityOptions.forEach((city) => {
    if(selectedCity === city.value) {
      currentWeather.classList.remove(`wi-icon-${previousIconID}`);
      for(let i = 0; i < forecastIcons.length; i++) {
        forecastIcons[i].classList.remove(`wi-icon-${previousForecastIcon}`);
      }
      getCurrentWeather(city.dataset.cityId);
      getForecast(city.dataset.cityId);
    }
  })
}

function getDayOfWeek(n) {
  switch(n) {
    case 0:
      return 'Dim';
      break;
    case 1:
      return 'Lun';
      break;
    case 2:
      return 'Mar';
      break;
    case 3:
      return 'Mer';
      break;
    case 4:
      return 'Jeu';
      break;
    case 5:
      return 'Ven';
      break;
    case 6:
      return 'Sam';
      break;
  }
}

function getCurrentWeather(cityID) {
  weatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${key}`

  fetch(weatherUrl)
    .then(function (response) {
      if (response.status !== 200) {  
        console.warn(`There was a problem. Status code: ${response.status}`);  
        return;  
      }

      response.json().then(function (weatherData) {
        cityName.innerHTML = weatherData.name;
        date.innerHTML = `${todaysDay}/${todaysMonth}/${todaysYear}`;
        previousIconID = weatherData.weather[0].id;
        currentWeather.classList.add(`wi-icon-${previousIconID}`);
        currentTemp.innerHTML = `${weatherData.main.temp.toFixed(1)} °C`;
        currentWeather.title = weatherData.weather[0].main;
        currentWeather.alt = `Météo à ${weatherData.name} : ${weatherData.weather[0].main}`;
      });
    });
}

function getForecast(cityID) {
  weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&appid=${key}`
  fetch(weatherUrl)
  .then(function (response) {
    if (response.status !== 200) {
      loader.style.display = 'none';  
      console.warn(`There was a problem. Status code: ${response.status}`);  
      return;  
    }

    response.json().then(function (weatherData) {
      let extractMinTemps = [];
      let extractMaxTemps = [];
      let extractIcons = [];
      for(let i = 0; i < forecast.length; i++) {
        nextDaysDate = `${todaysYear}-${todaysMonth}-${todaysDay + (i+1)}`;
        for(let j = 0; j < weatherData.list.length; j++) {
          dtWithoutHour = weatherData.list[j].dt_txt.split(' ')[0];
          if(dtWithoutHour === nextDaysDate) {
            extractMinTemps.push(weatherData.list[j].main.temp_min);
            extractMaxTemps.push(weatherData.list[j].main.temp_max);
            extractIcons.push(weatherData.list[j].weather[0].id);
          }
        }
        previousForecastIcon = extractIcons[4];  //Weather at 12pm
        minTemps[i].innerHTML = `Min. : ${extractMinTemps.sort((a, b) => a - b)[0].toFixed(1)} °C`;
        maxTemps[i].innerHTML = `Max. : ${extractMaxTemps.sort((a, b) => b - a)[0].toFixed(1)} °C`;
        extractMinTemps = [];
        extractMaxTemps = [];
        extractIcons = [];
        loader.style.display = 'none';
        forecastWeekDays[i].innerHTML = getDayOfWeek(todaysDate.getDay() + (i + 1));
        forecastIcons[i].classList.add(`wi-icon-${previousForecastIcon}`);
      }      
    });
  });
}

selectList.addEventListener('change', (e) => {
  selectedCity = e.target.value;
  getCity();
  loader.style.display = 'block';
});