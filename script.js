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

const APIKey = "9723430e37ba2f692d5b6dacd15eadc1";
//  Click search button and read city name from user

    function getWeather(cityEl) {
//  API pull with saved city name
        let queryURL = "api.openweathermap.org/data/2.5/forecast?q" + cityEl + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);
//  Show current conditions
        //  Method for using "date" objects obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        var currentDate = new Date(response.data.dt*1000);
        console.log(currentDate);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        cityName.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        let weatherPic = response.data.weather[0].icon;
        cityPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        cityPic.setAttribute("alt",response.data.weather[0].description);
        currentTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
        currentHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
    axios.get(UVQueryURL)
    .then(function(response){
        let UVIndex = document.createElement("span");
        UVIndex.setAttribute("class","badge badge-danger");
        UVIndex.innerHTML = response.data[0].value;
        currentUV.innerHTML = "UV Index: ";
        currentUV.append(UVIndex);
    });
    //  Pull 5-day forecast
            var cityFive = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityFive + "&appid=" + APIKey;
            axios.get(forecastQueryURL)
            .then(function(response){
// Show forecast under current conditions
console.log(response);
var forecast = document.querySelectorAll(".forecast");
for (i=0; i<forecast.length; i++) {
    forecast[i].innerHTML = "";
    var forecastIndex = i*8 + 4;
    var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
    var forecastDay = forecastDate.getDate();
    var forecastMonth = forecastDate.getMonth() + 1;
    var forecastYear = forecastDate.getFullYear();
    var forecastDateEl = document.createElement("p");
    forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
    forecast[i].append(forecastDateEl);
    var forecastWeatherEl = document.createElement("img");
    forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
    forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
    forecast[i].append(forecastWeatherEl);
    var forecastTemp = document.createElement("p");
    forecastTemp.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
    forecast[i].append(forecastTemp);
   var forecastHumidity = document.createElement("p");
    forecastHumidity.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
    forecast[i].append(forecastHumidity);
    }
})
});  
}

