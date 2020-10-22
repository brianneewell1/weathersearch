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

    function getWeather(cityName) {
//  API pull with saved city name
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);
