// imports form tookit and for css
import { getJSONData } from "./Toolkit";
import { Spinner } from "spin.js";
import "spin.js/spin.css";
import "weather-icons/css/weather-icons.css";
import "weather-icons/css/weather-icons-wind.css";
import "weather-icons/css/weather-icons-wind.min.css";

// variable declarations
let citySelect;
let weathericon;
let location;
let tempcurrent;
let templow;
let temphigh;
let tempfeels;
let Visibility;
let humidity;
let pressure;
let windDirection;
let windspeed;
let Overlay;
let weatherData = null;
let city;
let description;
let option;
let index;
let page;
let savedCity;
let windIcon;
let wind;
// stores the list of city objects from cities.json
let citiesData = [];

// getting json data for dropdown
const CITIES_JSON = "/cities.json";

// loading page spinner
let spinner = new Spinner({ color: "#FF0000", lines: 12 }).spin(document.querySelector(".g-loading-overlay")
);

// stops spinner
function hideLoading() {
    spinner.stop();
    Overlay.style.display = "none";
}

// alert if error
function onFailure() {
    alert("Error");
}

// populates the blue dropdown with the cities from json data = cities.json data
function populateMe(data) {
    citiesData = data.data.cities;
    citySelect.innerHTML = "";

    // loop through each city
    for (let c = 0; c < citiesData.length; c++) {
        city = citiesData[c];

        // create option element for each province and city
        option = document.createElement("option");

        option.value = c;
        // using expression interpolation for the object propertys
        option.textContent = `${city.name}, ${city.province}`;
        // add element to end of list
        citySelect.append(option);
    }

    // gets city and province that was stored
    savedCity = localStorage.getItem("item");

    // if savedCity holds a value the dropdown is the same as when the user left
    if (savedCity != null) {
        citySelect.value = savedCity;
    }

    getWeather();

    // when ever drop down changes getWeather function runs
    citySelect.addEventListener("change", getWeather);
}

// shows the weather info on page
function showWeather() {
    let main = weatherData.main;
    wind = weatherData.wind;

    location.textContent = city + ", " + citiesData[citySelect.value].province;
    description.textContent = weatherData.weather[0].description;

    tempcurrent.textContent = `${main.temp}°C Current`;
    templow.textContent = `${main.temp_min}°C Low`;
    temphigh.textContent = `${main.temp_max}°C High`;
    tempfeels.textContent = `Feels like ${main.feels_like}°C`;

    Visibility.textContent = `${weatherData.visibility} m`;
    humidity.textContent = `${main.humidity}%`;
    pressure.textContent = `${main.pressure} hPa`;
    windDirection.textContent = `${wind.deg}°`;

    // to fixed rounds number to a fixed two decimal number for the wind speed other wise wind speed might look like 4.824000000000001 it also gives the data in meters per second so you have to multipy by 3.6 to get km
    windspeed.textContent = `${(wind.speed * 3.6).toFixed(2)} km/h speed`;
}

// runs if weather api is retrieved data = OpenWeatherMap API data
function onResponse(data) {
    page.style.opacity = "1";
    weatherData = data;
    showWeather();
    hideLoading();
}

// gets the weather data for the selected city in the drop down
function getWeather() {
    page.style.opacity = "0.4";

    index = citySelect.value;
    city = citiesData[index].name;
    localStorage.setItem("item", index);

    // weather API request with template litaral
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},CA&appid=58ebe018226c4be82e7f241228743375&units=metric`;

    getJSONData(URL, onResponse, onFailure, true);
}

function main() {
    // connecting variables to html with querySelector
    Overlay = document.querySelector(".g-loading-overlay");
    citySelect = document.querySelector("#city-Select");
    weathericon = document.querySelector("#weather-icon");
    location = document.querySelector("#location");
    tempcurrent = document.querySelector("#temp-current");
    templow = document.querySelector("#temp-low");
    temphigh = document.querySelector("#temp-high");
    tempfeels = document.querySelector("#temp-feels");
    Visibility = document.querySelector("#Visibility");
    humidity = document.querySelector("#humidity");
    pressure = document.querySelector("#pressure");
    windDirection = document.querySelector("#wind-Direction");
    windspeed = document.querySelector("#wind-speed");
    description = document.querySelector("#description");
    windIcon = document.querySelector("#wind-icon");
    page = document.querySelector(".g-page");

    // same as get url but with cities.json onResponse, or onFailure in return
    getJSONData(CITIES_JSON, populateMe, onFailure, true);
}

main();