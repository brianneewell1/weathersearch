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

const APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a";
//  When search button is clicked, read the city name typed by the user

    function getWeather(cityName) {
//  Using saved city name, execute a current condition get request from open weather map api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);