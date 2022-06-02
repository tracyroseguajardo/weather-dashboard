//GLOBAL VARIABLES
var apiKey = "cbbe6c2ed3050fe64ee8a01d85f6dcac"

//DOM ELEMENTS
var searchBtn = document.getElementById("searchButton");
var cityEl = document.getElementById("newCity");
var historyEl = document.getElementById("searchHistory");
var currentEl = document.getElementById("current");
var forecastEL = document.getElementById("forecast");


//DECLARED FUNCTIONS

// function citySubmitHandler() {
//     preventDefault();
//     var city =  cityEl.value.trim();
//     console.log(city);
//     if (city) {
//         getWeather(city);
//     } else {
//         alert("City not found. Please enter a different City");
//     }
// };

function getWeather() {
    var city =  cityEl.value.trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(queryURL);
    console.log(queryURL);
}



//EVENT LISTENERS
searchBtn.addEventListener("click", getWeather);
