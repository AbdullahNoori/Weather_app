const api_key = "007167cf53e3061a5ec1f473d56960ee";

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}/
// get city name input
// get or fetch data
// put it into tags
// display

const cityInput = document.getElementById("cityInput");
const button = document.getElementById("button");
const info_div = document.querySelector(".weather-info-container");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    try {
      const weatherData = await getweather(city);
      displayData(weatherData);
      // alert(weatherData);
    } catch (error) {
      console.error("404");
    }
  } else {
    alert("Enter a valid City name");
  }
});

async function getweather(city) {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const response = await fetch(api_url);

  if (!response.ok) {
    throw new error("cant fetch data");
  }

  return await response.json();
  // console.log(response.json());

  // response = response.json();
  console.log(response);
}

function displayData(data) {
  const {
    name: city,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ description }],
  } = data;

  const newDiv = document.createElement("div");
  const city_name = document.createElement("h2");
  const temperature1 = document.createElement("p");
  const humid1 = document.createElement("p");
  const wind = document.createElement("p");
  const desc1 = document.createElement("p");

  city_name.textContent = city;

  temperature1.textContent = `${(temp - 273.15).toFixed(1)}°C `;
  temperature1.classList.add("temperature");

  humid1.textContent = `Humidity: ${humidity}`;

  desc1.textContent = description;
  desc1.classList.add("description");

  wind.textContent = `Wind: ${speed}km/h`;

  info_div.appendChild(city_name);
  info_div.appendChild(temperature1);
  info_div.appendChild(desc1);
  info_div.appendChild(humid1);
  info_div.appendChild(wind);

  console.log(data, city_name);
}
