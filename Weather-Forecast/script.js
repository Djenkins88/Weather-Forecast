//bring over all elements from html
const clearButton = document.getElementById("clear-history");
const windSpeed = document.querySelector("#wind-speed");
const uvIndex = document.getElementById("uv-index");
const currentCity = document.querySelector("#current-city");
const inputValue = document.querySelector(".city-input");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

// list for date
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    hoursIn12HrFormat + ":" + minutes + "" + `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + "," + date + " " + months[month];
}, 1000);

var apiKey = "47af1566274fcb96decc14e0dee64957";
var url =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";

// starting a function once the the search button is clicked that takes the user input and get info about the weather.
var searchButtonEl = document.querySelector("#search-button");
searchButtonEl.addEventListener("click", function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=` +
      inputValue.value +
      "&appid=47af1566274fcb96decc14e0dee64957&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      function checkInput() {
        if (response.cod === "404") {
          alert("must enter a value");
        } else return;
      }
      console.log(data);
      var currentCityValue = data["name"];
      var currentTemperatureValue = data["main"]["temp"];
      var currentHumidityValue = data["main"]["humidity"];
      var windSpeedValue = data["wind"]["speed"];

      currentCity.innerHTML = currentCityValue;
      temperature.innerHTML = currentTemperatureValue + "&#176F";
      humidity.innerHTML = currentHumidityValue + "%";
      windSpeed.innerHTML = windSpeedValue + "MPH";

      localStorage.setItem("inputValue", JSON.stringify(inputValue));
      console.log(inputValue.value);
    });
});

//running a function the 7 day forecast.
var searchButtonEl = document.querySelector("#search-button");
searchButtonEl.addEventListener("click", function () {
  getWeatherData();
  function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
      console.log(success);

      let { latitude, longitude } = success.coords;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=47af1566274fcb96decc14e0dee64957&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          var uvIndexValue = data["current"]["uvi"];
          uvIndex.innerHTML = uvIndexValue;

          console.log(data);
          showWeatherData(data);
        });
    });
  }
});

function showWeatherData(data) {
  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + 'N' + data.lon+'E'
  let otherDayforcast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
      <div class="others">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <div class="temp">Temp  ${day.temp.day}</div>
          <div class="wind-speed">Wind-speed ${day.wind_speed}</div>
          <div class="humidty">Humidity ${day.humidity}</div>
      </div>`
      
    } else {
      otherDayforcast += `
        <div class="weather-forecast-item">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
                <div class="temp">Temp: ${day.temp.day}</div>
                <div class="wind-speed">Windspeed:  ${day.wind_speed}</div>
                <div class="humidty">Humidity: ${day.humidity}</div>
            </div>`;
    }
  });

  weatherForecastEl.innerHTML = otherDayforcast;
}
