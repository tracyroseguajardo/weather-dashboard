//GLOBAL VARIABLES
var apiKey = "cbbe6c2ed3050fe64ee8a01d85f6dcac"

//DOM ELEMENTS
var searchBtn = document.getElementById("searchButton");
var cityEl = document.getElementById("newCity");
var historyEl = document.getElementById("searchHistory");
var currentEl = document.getElementById("current");
var forecastEl = document.getElementById("forecast");

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
        console.log(data);
        todayWeather(city, data.current);
        fiveDay(data.daily);
    });
}

function todayWeather(city, current) {
    console.log(current)
    // create variables for the content that we need to extract from the current object
    var temp = current.temp
    var wind = current.wind_speed
    var humidity = current.humidity
    var uv = current.uvi
    //elements for the page
    var card = document.createElement("div")
    var cardBody = document.createElement("div")
    var cardHeader = document.createElement("h3")
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
    //add text content
    cardHeader.textContent = city
    tempEl.textContent = "temp: " + temp + "F"
    windEl.textContent = "wind speed: " + wind + "mph"
    humidityEl.textContent = "humidity: " + humidity + "%"
    uvEl.textContent = "uv index: " + uv
    //append elements to parents
    cardBody.append(cardHeader, tempEl, windEl, humidityEl, uvEl)
    card.append(cardBody);
    currentEl.append(card);
}

function fiveDay(daily) {
    console.log(daily);

    //create loop to create 5 days of content
    for (i = 1; i < 6; i++) {
        var dailyTemp = daily[i].temp.day
        var dailyWind = daily[i].humidity
        var dailyHumidity = daily[i].wind_speed

        var cardTwo = document.createElement("div")
        var cardBodyTwo = document.createElement("div")
        var cardHeaderTwo = document.createElement("h3")
        var tempElTwo = document.createElement("p")
        var windElTwo = document.createElement("p")
        var humidityElTwo = document.createElement("p")

        cardTwo.setAttribute("class", "outlook")
        cardBodyTwo.setAttribute("class", "card-body")
        cardHeaderTwo.setAttribute("class", "card-title")
        tempElTwo.setAttribute("class", "card-text")
        windElTwo.setAttribute("class", "card-text")
        humidityElTwo.setAttribute("class", "card-text")

        cardHeaderTwo.textContent = "date goes here"
        tempElTwo.textContent = "temp: " + dailyTemp + "F"
        windElTwo.textContent = "wind speed: " + dailyWind + "mph"
        humidityElTwo.textContent = "humidity: " + dailyHumidity + "%"

        cardBodyTwo.append(cardHeaderTwo, tempElTwo, windElTwo, humidityElTwo)
        cardTwo.append(cardBodyTwo);
        forecastEl.append(cardTwo);
    }

}
//EVENT LISTENERS
searchBtn.addEventListener("click", userInput);