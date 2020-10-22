function initPage() {
    const input = document.getElementById("cityIn");
    const searchBtn = document.getElementById("searchBtn");
    const clearEl = document.getElementById("clear");
    const cityName = document.getElementById("cityName");
    const cityPic = document.getElementById("currentPic");
    const currentTemp = document.getElementById("temp");
    const currentHumidity = document.getElementById("humidity");4
    const currentWind = document.getElementById("wind");
    const currentUV = document.getElementById("UV");
    const history = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
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
        const currentDate = new Date(response.data.dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        cityName.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        let weatherPic = response.data.weather[0].icon;
        currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        currentPic.setAttribute("alt",response.data.weather[0].description);
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
        }
        )}