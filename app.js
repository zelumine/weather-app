const key = '39b2960a873461b5190f79a9a24fb051'; 
const url = './cities-fr.json';
let weatherUrl;
let todaysDate = new Date();

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
      	  selectList.appendChild(option);
        }    
        document.getElementsByTagName('option')[0].setAttribute('selected', 'true');
      });  
    }  
  )  
  .catch(function(err) {  
    console.error(`Fetch error: ${err}`);  
  });

function convertTemp(temp) {
  return (temp - 273.15).toFixed(1);    //Convert from Kelvin to Celsius
}

function getCurrentWeather(cityID) {
  weatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=3038789&appid=${key}`

  fetch(weatherUrl)
    .then(function (response) {
      if (response.status !== 200) {  
        console.warn(`There was a problem. Status code: ${response.status}`);  
        return;  
      }

      response.json().then(function (weatherData) {
        cityName.innerHTML = weatherData.name;
        currentWeather.classList.add(`wi-icon-${weatherData.weather[0].id}`);
        currentTemp.innerHTML = `${convertTemp(weatherData.main.temp)} °C`;
      });
    });
}

getCurrentWeather(524901);

