//import "./style.css";



let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
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

//feature: puts city entered into search bar as the h1 header on
//on Check Weather button click

function displayWeatherConditionInCelsius(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemper").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#degreeUnits").innerHTML = `°C`;
}

function searchForCityInCelsius(event) {
  event.preventDefault();
  let apiKey = `0ceb0fe04d38447f14a2f5f039cc2bdf`;
  let cityEntered = document.querySelector("#currentlocation").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}&units=metric`;

  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = cityEntered;
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
}

function searchForCity(event) {
  event.preventDefault();
  let apiKey = `0ceb0fe04d38447f14a2f5f039cc2bdf`;
  let cityEntered = document.querySelector("#currentlocation").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}&units=imperial`;

  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = cityEntered;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchCityButton = document.querySelector("#weatherButton");
searchCityButton.addEventListener("click", searchForCity);
//
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchForCity(city);
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

search("New York");



//Adding weather description - Fahrenheit Button

function displayWeatherDescription(response) {
  document.querySelector("#currentWeatherDescription").innerHTML = response.data.weather[0].description;

}

function searchForCityWeatherDescription(event) {
  event.preventDefault();
  let apiKey = `0ceb0fe04d38447f14a2f5f039cc2bdf`;
  let cityEntered = document.querySelector("#currentlocation").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}`;
console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherDescription);
}

let searchWeatherConditions = document.querySelector("#weatherButton",);
searchWeatherConditions.addEventListener("click", searchForCityWeatherDescription);
