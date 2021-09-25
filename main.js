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
    console.log(main);
    document.body.style.backgroundImage = `url(${setBackground(main)})`
    console.log(setBackground(main));
    weather_el.innerText = main;

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
    switch (main) {
        case "Sunny":
            return "./images/sunny1.jpg";
        case "Clear":
            return "./images/Cloudy.jpg";
        case "Clouds":
            return "./images/Cloudy3.jpg";
        case "Stormy":
            return "./images/stormy.jpg";
        case "Snow":
            return "./images/snow.jpg";
        case "Stormy":
            return "./images/stormy.jpg";
        case "Thunder":
            return "./images/Thunder.jpg";
        case "Rain":
            return "./images/Rain.jpg";
        default:
            return "./images/sunny3.jpg";
    }
}