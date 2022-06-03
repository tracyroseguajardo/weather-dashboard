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
function userInput() {
    var city = cityEl.value

    getWeather(city)
}

function getWeather(search) {

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apiKey;
    fetch(queryURL).then(function (res) {
        return res.json()
    }).then(function (data) {
        oneCall(data.coord.lat, data.coord.lon, data.name)
    }).catch(function (err) {
        alert('no city with that name')
    });


}

function oneCall(lat, lon, city) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKey).then(function (res) {
        return res.json()
    }).then(function (data) {
        todayWeather(city, data.current)
    });


}

function todayWeather(city, current) {
    console.log(current)
    // create variables for the content that we need to extract from the current object.
    var temp = current.temp
    var wind = current.wind_speed
    var humidity = current.humidity
    var uv = current.uvi
    //elements for the page
    var card = document.createElement("div")
    var cardBody = document.createElement("div")
    var cardHeader = document.createElement("h5")
    var tempEl = document.createElement("p")
    var windEl = document.createElement("p")
    var humidityEl = document.createElement("p")
    var uvEl = document.createElement("p")
// add attributes to elements
    card.setAttribute('class', "card")
    cardBody.setAttribute("class", "card-body")
    cardHeader.setAttribute("class", "card-title")
    tempEl.setAttribute("class", "card-text")
    windEl.setAttribute("class", "card-text")
    humidityEl.setAttribute("class", "card-text")
    uvEl.setAttribute("class", "card-text")

    cardHeader.textContent = city
    tempEl.textContent = temp


    cardBody.append(cardHeader, tempEl)
    card.append(cardBody)

    currentEl.append(card)
}



//EVENT LISTENERS
searchBtn.addEventListener("click", userInput);
