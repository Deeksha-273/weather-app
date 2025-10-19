const apiKey = "your API key"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");
const date = document.getElementById("date");
const error = document.getElementById("error");

let lastCity = localStorage.getItem("lastCity") || "Delhi";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      error.textContent = "City not found! Try again.";
      return;
    }

    error.textContent = "";
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    date.textContent = new Date().toDateString();

    changeBackground(data.weather[0].main);
    localStorage.setItem("lastCity", city);
  } catch (err) {
    error.textContent = "Something went wrong! Please try again.";
  }
}

function changeBackground(weather) {
  const body = document.body;
  if (weather.includes("Cloud")) body.style.background = "linear-gradient(to top, #bdc3c7, #2c3e50)";
  else if (weather.includes("Rain")) body.style.background = "linear-gradient(to top, #4b79a1, #283e51)";
  else if (weather.includes("Clear")) body.style.background = "linear-gradient(to top, #fceabb, #f8b500)";
  else if (weather.includes("Snow")) body.style.background = "linear-gradient(to top, #e0eafc, #cfdef3)";
  else body.style.background = "linear-gradient(to top, #89f7fe, #66a6ff)";
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

window.addEventListener("load", () => {
  getWeather(lastCity);
});
