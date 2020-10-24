//Global Variables
var input = document.getElementById("cityIn");
var searchBtn = document.getElementById("searchBtn");
var clearEl = document.getElementById("clear");
var cityName = document.getElementById("cityName");
var cityPic = document.getElementById("currentPic");
var currentTemp = document.getElementById("temp");
var currentHumidity = document.getElementById("humidity"); 4
var currentWind = document.getElementById("wind");
var currentUV = document.getElementById("UV");
var history = document.getElementById("history");
let SearchHistory = JSON.parse(localStorage.getItem("searchBtn")) || [];
console.log(SearchHistory);
var currentDate = document.getElementById("currentDay");

$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

//  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for

//API pull with city name
var APIKey = "dcbd037825acb7251c5535a84252386b";

//save user input for city
input.addEventListener("click", function (event) {
    event.preventDefault();
    var userCity = document.getElementById('cityIn').value;
    localStorage.setItem('cityIn', userCity);
 })

function getWeather(userCity) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" +APIKey;
                $.ajax({
                url: queryURL,
                method: "GET"
              })
              .then(function (weatherData) {
            //console.log(response);
            let cityObj = {
                cityName: weatherData.name,
                currentTemp: weatherData.main.temp,
                currentHumidity: weatherData.main.humidity,
                currentWind: weatherData.wind.speed,
                cityUVIndex: weatherData.coord,
                cityPic: weatherData.weather[0].icon
            }

            function renderWeatherData(cityName, currentTemp, currentHumidity, currentWind, cityUVIndex, cityPic) {
                cityNameEl.text(cityName)
                currentDateEl.text(`(${today})`)
                tempEl.text(`Temperature: ${cityTemp} °F`);
                humidityEl.text(`Humidity: ${cityHumidity}%`);
                windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
                uvIndexEl.text(`UV Index: ${uvVal}`);
                weatherIconEl.attr("src", cityWeatherIcon);
            }
            //  Show current conditions
           //var cityPic = weatherData.weather[0].icon;
          // cityPic.append("src", "https://openweathermap.org/img/wn/" + cityPic + "@2x.png");
         // cityPic.append("alt", response.weather[0].description);
            currentTemp.append = "Temperature: " + response.data.main.temp.text + " &#176F";
            currentHumidity.append = "Humidity: " + response.data.main.humidity + "%";
            currentWind.append = "Wind Speed: " + response.data.wind.speed + " MPH";
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
                $.ajax({
                url: UVQueryURL,
                method: "GET"
              })
                .then(function (response) {
                    let UVIndex = document.createElement("span");
                    UVIndex.setAttribute("class", "badge badge-danger");
                    UVIndex.innerHTML = response.data[0].value;
                    currentUV.innerHTML = "UV Index: ";
                    currentUV.append(UVIndex);
                });
            //  Pull 5-day forecast
            var cityFive = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityFive + "&appid=" + APIKey;
            $.ajax({
                url: forecastQueryURL,
                method: "GET" })
                .then(function (response) {
                    // Show forecast under current conditions
                    console.log(response);
                    console.log(response);
                    var forecast = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecast.length; i++) {
                        forecast[i].innerHTML = "";
                        var forecastIndex = i * 8 + 4;
                        var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                        var forecastDay = forecastDate.getDate();
                        var forecastMonth = forecastDate.getMonth() + 1;
                        var forecastYear = forecastDate.getFullYear();
                        var forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.append = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecast[i].append(forecastDateEl);
                        var forecastWeatherEl = document.createElement("img");
                        forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                        forecast[i].append(forecastWeatherEl);
                        var forecastTemp = document.createElement("p");
                        forecastTemp.append = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                        forecast[i].append(forecastTemp);
                        var forecastHumidity = document.createElement("p");
                        forecastHumidity.append = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                        forecast[i].append(forecastHumidity);
                    }
                })
        });
}

//  Click search button and read city name from user then save search history
searchBtn.addEventListener("click", function () {
    let searchTerm = input.value;
    getWeather(searchTerm);
    SearchHistory.push(searchTerm);
    localStorage.setItem("SearchHistory", JSON.stringify(SearchHistory));
    renderSearchHistory();
})

//Clear search history button
clearEl.addEventListener("click", function () {
    SearchHistory = [];
    renderSearchHistory();
})

//show previously searched cities
function renderSearchHistory() {
    history.innerHTML = "";
    for (let i = 0; i < SearchHistory.length; i++) {
        var historyInfo = document.createElement("input");
        historyInfo.setAttribute("type", "text");
        historyInfo.setAttribute("readonly", true);
        historyInfo.setAttribute("class", "form-control d-block bg-white");
        historyInfo.setAttribute("value", SearchHistory[i]);
        historyInfo.addEventListener("click", function () {
            getWeather(historyInfo.value);
        history.append(historyInfo);
    })}
}

renderSearchHistory();
if (SearchHistory.length > 0) {
    getWeather(SearchHistory[SearchHistory.length - 1]);
}


//  call function for when page loads to display current and searched weather

//initPage();
function initPage() {
    var input = document.getElementById("cityIn");
    var searchBtn = document.getElementById("searchBtn");
    var clearEl = document.getElementById("clear");
    var cityName = document.getElementById("cityName");
    var cityPic = document.getElementById("currentPic");
    var currentTemp = document.getElementById("temp");
    var currentHumidity = document.getElementById("humidity");4
    var currentWind = document.getElementById("wind");
    var currentUV = document.getElementById("UV");
    var history = document.getElementById("history");
    let SearchHistory = JSON.parse(localStorage.getItem("searchBtn")) || [];
    console.log(SearchHistory);
}