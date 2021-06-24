
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

//feature: puts city entered into search bar as the h1 header on
//on Check Weather button click
function displayWeatherConditionInCelsius(response) {
document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemper").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = response.data.wind.speed;
  document.querySelector("#degreeUnits").innerHTML = `°C`;
  document.querySelector("#windUnits").innerHTML = `m/s`;
    let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector("#currentWeatherDescription").innerHTML =
    response.data.weather[0].description;
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
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = response.data.wind.speed;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
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
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = response.data.wind.speed;
  document.querySelector("#degreeUnits").innerHTML = `°F`;
  document.querySelector("#windUnits").innerHTML = `mph`;
    let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)

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
let citySearched = "";
search("New York");