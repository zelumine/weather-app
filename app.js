const key = '39b2960a873461b5190f79a9a24fb051'; 
const url = './cities-fr.json';
let cityID;
let weatherUrl;
let cityOptions;
let selectedCity;
let previousIconID;
let todaysDate = new Date();
let todaysYear = todaysDate.getFullYear();
let todaysMonth = todaysDate.getMonth();
let todaysDay = todaysDate.getDate();

const selectList = document.getElementById('select-cities');
const cityName = document.querySelector('#city-title');
const currentWeather = document.querySelector('#current-weather');
const currentTemp = document.querySelector('#current-temp');
const nextDaysWeather = document.querySelector('#next-days');

// Got help from https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn(`There was a problem. Status code: ${response.status}`);  
        return;  
      }

      response.json().then(function(data) { 
        let option;
    
    	  for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].nm;
          option.value = data[i].nm;
          option.dataset.cityId = data[i].id;
      	  selectList.appendChild(option);
        }    
        selectedCity = document.getElementsByTagName('option')[0];
        selectedCity.setAttribute('selected', true);

        cityOptions = Array.from(document.getElementsByTagName('option'));
        getCurrentWeather(selectedCity.dataset.cityId);
      });  
    }  
  )  
  .catch(function(err) {  
    console.error(`Fetch error: ${err}`);  
  });


function getCity() {
  cityOptions.forEach((city) => {
    if(selectedCity === city.value) {
      currentWeather.classList.remove(`wi-icon-${previousIconID}`);
      getCurrentWeather(city.dataset.cityId);
    }
  })
}

function convertTemp(temp) {
  return (temp - 273.15).toFixed(1);    //Convert from Kelvin to Celsius
}

function getCurrentWeather(cityID) {
  weatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${key}`

  fetch(weatherUrl)
    .then(function (response) {
      if (response.status !== 200) {  
        console.warn(`There was a problem. Status code: ${response.status}`);  
        return;  
      }

      response.json().then(function (weatherData) {
        console.log(weatherData);
        cityName.innerHTML = weatherData.name;
        currentWeather.classList.add(`wi-icon-${weatherData.weather[0].id}`);
        currentTemp.innerHTML = `${convertTemp(weatherData.main.temp)} °C`;
        previousIconID = weatherData.weather[0].id;
      });
    });
}

selectList.addEventListener('change', (e) => {
  selectedCity = e.target.value;
  console.log(selectedCity);
  getCity();
});

