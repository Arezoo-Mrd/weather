const api = {
    key: "9f89a524c04922843c45b6eee5831ed7",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    console.log(weather);
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    let main = weather.weather[0].main;
    document.body.style.backgroundImage = `url(${setBackground(main)})`;

    weather_el.innerText = main;

    let feelsLike = document.querySelector(".feels-like");
    feelsLike.innerHTML = `${Math.round(weather.main.feels_like)}°C `;

    let hiLow = document.querySelector(".hi-low");
    hiLow.innerText = `${Math.round(weather.main.temp_max)}°C / ${Math.round(
    weather.main.temp_min
  )} °C`;
}

function dateBuilder(d) {
    let months = [
        "Januray",
        "Februray",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "October",
        "November",
        "December",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

function setBackground(main) {
    let picture = [
        { id: 0, path: "./images/sunny3.jpg" },
        { id: 1, path: "./images/sunny1.jpg" },
        { id: 2, path: "./images/Cloudy.jpg" },
        { id: 3, path: "./images/Cloudy3.jpg" },
        { id: 4, path: "./images/stormy.jpg" },
        { id: 5, path: "./images/snow.jpg" },
        { id: 6, path: "./images/Thunder.jpg" },
        { id: 7, path: "./images/Rain.jpg" },
    ];
    switch (main) {
        case "Sunny":
            return picture[1].path;
        case "Clear":
            return picture[2].path;
        case "Clouds":
            return picture[3].path;
        case "Stormy":
            return picture[4].path;
        case "Snow":
            return picture[5].path;
        case "Thunder":
            return picture[6].path;
        case "Rain":
            return picture[7].path;
        default:
            return picture[0].path;
    }
}