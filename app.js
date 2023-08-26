const btn = document.querySelector("button");
const search = document.querySelector("input");
const icon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const container = document.querySelector(".container");

const apiKey = "b0b80efc97b4efaaf28b0300b95c8e9a";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const checkWeather = async (city) => {
  const response = await fetch(url + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    container.style.display = "none";
  } else {
    const data = await response.json();
    const {
      name,
      main: { temp, humidity },
      wind: { speed },
    } = data;
    document.querySelector(".location").innerHTML = name;
    document.querySelector(".temp").innerHTML = Math.round(temp) + "°c";
    document.querySelector(".humidity").innerHTML = humidity + "%";
    document.querySelector(".wind").innerHTML = speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      icon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Mist") {
      icon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      icon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      icon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Clear") {
      icon.src = "images/clear.png";
    } else if (data.weather[0].main == "Snow") {
      icon.src = "images/snow.png";
    } else if (data.weather[0].main == "Wind") {
      icon.src = "images/wind.png";
    }

    container.style.display = "block";
    error.style.display = "none";

    search.value = null;
  }
};

btn.addEventListener("click", () => checkWeather(search.value));
