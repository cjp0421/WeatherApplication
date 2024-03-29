//import "./style.css";
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

console.log(days);
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
console.log(months);
let today = document.querySelector("#todaysDate");
let now = new Date();
let currentDate = now.getDate();
let currentYear = now.getFullYear();
let dayOfTheWeek = days[now.getDay()];
let monthOfTheYear = months[now.getMonth()];
let dateToday = `${dayOfTheWeek}, ${monthOfTheYear} ${currentDate}, ${currentYear}`;
today.innerHTML = dateToday;
let hoursNow = now.getHours();
let minutesNow = addZero(now.getMinutes());
let secondsNow = addZero(now.getSeconds());
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let currentTime = `${hoursNow}:${minutesNow}:${secondsNow}`;
let time = document.querySelector("#currentTime");
time.innerHTML = currentTime;
let dateOfToday = document.querySelector("#todaysDate");
console.log(dateOfToday);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
  return days[day];
}

//feature: five day forecast - not currently in other js file
function displayForecast(response) {
  console.log(response.data.daily);
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecastWrap");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-6 col-md-2">
      <div class="card h-100" id="dayOneCardFull">
            <img 
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" 
              class="card-img-top cardImg" alt="daily weather icon"
              id="dayOneCardImg">
          <div class=" card-body">
            <h5 class="card-title dayName" id="dayOneName">${formatDay(
              forecastDay.dt
            )}</h5>
              <p class="card-text"><span id="highTempOne">${Math.round(
                forecastDay.temp.max
              )} °F</span> | <span id="lowTempOne"> ${Math.round(
          forecastDay.temp.min
        )} °F</span></p>
          </div>
        </div>
      </div>
  
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//gets the forecast using two api calls from OpenWeather
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0ceb0fe04d38447f14a2f5f039cc2bdf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//feature: puts city entered into search bar as the h1 header on
//on Check Weather button click
function displayWeatherConditionInCelsius(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemper").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#degreeUnits").innerHTML = `°C`;
  document.querySelector("#windUnits").innerHTML = `m/s`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#currentWeatherDescription").innerHTML =
    response.data.weather[0].description;

  //city coordinates from name search from API already used
  getForecast(response.data.coord);
}

function searchForCityInCelsius(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#currentlocation").value;
  let apiKey = `0ceb0fe04d38447f14a2f5f039cc2bdf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditionInCelsius);
}
let searchCityCelsiusButton = document.querySelector("#celsiusWeatherButton");
searchCityCelsiusButton.addEventListener("click", searchForCityInCelsius);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemper").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#degreeUnits").innerHTML = `°F`;
  document.querySelector("#windUnits").innerHTML = `mph`;
  document.querySelector("#currentWeatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
//
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
//
function searchLocation(position) {
  let apiKey = "0ceb0fe04d38447f14a2f5f039cc2bdf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

function search(city) {
  let apiKey = `0ceb0fe04d38447f14a2f5f039cc2bdf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherConditionInFahrenheit(response) {
  document.querySelector("#currentWeatherDescription").innerHTML =
    response.data.weather[0].description;
  let citySearched = document.querySelector("#currentlocation").value;
  document.querySelector("#city").innerHTML = citySearched;
  document.querySelector("#currentTemper").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#degreeUnits").innerHTML = `°F`;
  document.querySelector("#windUnits").innerHTML = `mph`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchForCityInFahrenheit(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#currentlocation").value;
  let apiKey = `0ceb0fe04d38447f14a2f5f039cc2bdf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherConditionInFahrenheit);
}
let searchWeatherConditionsFahrenheit =
  document.querySelector("#weatherButton");
searchWeatherConditionsFahrenheit.addEventListener(
  "click",
  searchForCityInFahrenheit
);

let citySearched = null;
search("New York");
displayForecast();
