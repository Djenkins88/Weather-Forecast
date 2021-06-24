var inputValue = document.querySelector(".city-input");
var clearButton = document.getElementById("clear-history");
var currentTemperature = document.getElementById("temperature");
var currentHumidty = document.getElementById("humidity");
var windSpeed = document.getElementById("wind-speed");
var currentUvindex = document.getElementById("uv-index");
var currentCity = document.querySelector("#current-city");
var currentWeather = document.querySelector("#current-weather");

var apiKey = "47af1566274fcb96decc14e0dee64957"
var url = "https://api.openweathermap.org/data/2.5/";

var searchButtonEl = document.querySelector("#search-button");
searchButtonEl.addEventListener("click", function () {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+inputValue.value+'&appid=47af1566274fcb96decc14e0dee64957&units=imperial')
  //fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=32.7767&lon=-96.7836&appid=47af1566274fcb96decc14e0dee64957&units=imperial')
   .then((response) => response.json())
    .then((data) => {
        console.log(data);
        var currentCityValue = data['name'];
        var currentTemperatureValue = data['main']['temp'];
        var currentHumidityValue = data['main']['humidity'];
        var windSpeedValue= data['wind']['speed'];
        

        currentCity.innerHTML = currentCityValue;
        temperature.innerHTML = currentTemperatureValue;
        humidity.innerHTML = currentHumidityValue;
        windSpeed.innerHTML = windSpeedValue;
        
    })



//.catch(err => alert("Wrong city name!"))
})
