//GLOBAL VARIABLES
var apiKey = "cbbe6c2ed3050fe64ee8a01d85f6dcac"
var pastCities = []

//DOM ELEMENTS
var searchBtn = document.getElementById("searchButton");
var cityEl = document.getElementById("newCity");
var historyEl = document.getElementById("searchHistory");
var currentEl = document.getElementById("current");
var forecastEl = document.getElementById("forecast");

function searchHistory(city) {
    if (pastCities.indexOf(city) !== -1) {
        return;
    }
    pastCities.push(city);
    localStorage.setItem("cities", JSON.stringify(pastCities));
    createButtons()
}

function createButtons() {
    historyEl.innerHTML = " ";
    for (var i = pastCities.length - 1; i >= 0; i--) {
        var cityHistoryBtn = document.createElement("button");
        cityHistoryBtn.setAttribute("class", "btn");
        cityHistoryBtn.textContent = pastCities[i];
        historyEl.append(cityHistoryBtn);
    }

}

function checkStorage() {

    var existingData = localStorage.getItem("cities")
    if (existingData) {
        pastCities = JSON.parse(existingData)
    }
    createButtons();
}

checkStorage()

function userInput() {
    var city = cityEl.value

    searchHistory(city)
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
    currentEl.innerHTML = " "
    console.log(current)
    // create variables for the content that we need to extract from the current object
    var temp = current.temp;
    var wind = current.wind_speed;
    var humidity = current.humidity;
    var uv = current.uvi;
    var iconID = current.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

    //create elements for the page
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var cardHeader = document.createElement("h3");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var uvEl = document.createElement("p");
    var uvIndicatorEl = document.createElement("span")
    var iconEl = document.createElement("img");
    var today = new Date().toLocaleDateString();
    console.log(today);

    // add attributes to elements
    card.setAttribute("class", "today");
    cardBody.setAttribute("class", "card-body");
    cardHeader.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");
    uvEl.setAttribute("class", "card-text");
    iconEl.setAttribute("class", "icon")
    iconEl.src = iconURL;
    //add text content
    cardHeader.textContent = city + " " + today;
    cardHeader.append(iconEl);
    tempEl.textContent = "temp: " + temp + " °F";
    windEl.textContent = "wind speed: " + wind + " mph";
    humidityEl.textContent = "humidity: " + humidity + " %";
    uvEl.textContent = "uv index: ";
    uvIndicatorEl.textContent = uv;
    console.log(uv);
    //function to style uv
    uvIndicator(uv, uvIndicatorEl);
    //append elements to parents
    uvEl.append(uvIndicatorEl);
    cardBody.append(cardHeader, tempEl, windEl, humidityEl, uvEl);
    card.append(cardBody);
    currentEl.append(card);
}

function uvIndicator(uv, uvIndicatorEl) {
    console.log(uv)
    if (uv <= 3) {
        uvIndicatorEl.setAttribute("style", "background-color: green")
    } else {
        if (uv <= 6) {
            uvIndicatorEl.setAttribute("style", "background-color: yellow");
        } else {
            if (uv >= 6.1) {
                uvIndicatorEl.setAttribute("style", "background-color: red");
            }
        }
    }

}

function fiveDay(daily) {
    forecastEl.innerHTML = " "
    console.log(daily);

    //create loop to generate 5 days of content
    for (i = 1; i < 6; i++) {
        var dailyTemp = daily[i].temp.day
        var dailyWind = daily[i].humidity
        var dailyHumidity = daily[i].wind_speed
        var dailyIconID = daily[i].weather[0].icon
        var dailyIconURL = "http://openweathermap.org/img/wn/" + dailyIconID + "@2x.png"
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + i);
        console.log(tomorrow);

        // var tomorrowTwo = new Date();
        // tomorrowTwo.setDate(tomorrowTwo.getDate() + 2);
        // var tomorrow = new Date();
        // tomorrow.setDate(tomorrow.getDate() + 1);

        var cardTwo = document.createElement("div")
        var cardBodyTwo = document.createElement("div")
        var cardHeaderTwo = document.createElement("h3")
        var tempElTwo = document.createElement("p")
        var windElTwo = document.createElement("p")
        var humidityElTwo = document.createElement("p")
        var iconElTwo = document.createElement("img")

        cardTwo.setAttribute("class", "outlook")
        cardBodyTwo.setAttribute("class", "card-body")
        cardHeaderTwo.setAttribute("class", "card-title")
        tempElTwo.setAttribute("class", "card-text")
        windElTwo.setAttribute("class", "card-text")
        humidityElTwo.setAttribute("class", "card-text")
        iconElTwo.src = dailyIconURL
        iconElTwo.setAttribute("class", "icon")

        cardHeaderTwo.textContent = tomorrow.toLocaleDateString();
        tempElTwo.textContent = "temp: " + dailyTemp + " °F"
        windElTwo.textContent = "wind speed: " + dailyWind + " mph"
        humidityElTwo.textContent = "humidity: " + dailyHumidity + " %"

        cardBodyTwo.append(cardHeaderTwo, iconElTwo, tempElTwo, windElTwo, humidityElTwo)
        cardTwo.append(cardBodyTwo);
        forecastEl.append(cardTwo);
    }
}

//EVENT LISTENERS
searchBtn.addEventListener("click", userInput);