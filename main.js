
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const realFeel = document.querySelector('.real-feel');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const errorLocation = document.querySelector('.error-location');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const cardImg = document.querySelector('.card-img');
const errorInput = document.querySelector('.error-input');
const favoriteCitiesContainer = document.querySelector('.weather-container')
const favoriteButton = document.querySelector('.favorite-button');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');

let favoriteCities = [];
let lat;
let lon;
const apiKey = '3c7acfb5a190b6523822a810873b0c9c';

function getWeatherGeolocation(position) {
  lon = position.coords.longitude;
  lat = position.coords.latitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchData(apiUrl);
}
function fetchData(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
}

function getWeatherByInput(city) {
  const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchDataCity(apiCity);
}

function fetchDataCity(apiCity) {
  fetch(apiCity)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch(() => {
      errorInput.textContent = "Please search for a valid city!";
    });
}

function displayWeather(data) {
  errorInput.innerHTML = "";
  city.innerHTML = `Weather in ` + data.name + `, ` + data.sys.country
  temp.innerHTML = Math.round(data.main.temp) + '°C';
  realFeel.innerHTML = `Real feel: ` + Math.round(data.main.feels_like) + '°C';
  minTemp.innerHTML = `Min Temp: ` + Math.round(data.main.temp_min) + '°C';
  maxTemp.innerHTML = `Max Temp: ` + Math.round(data.main.temp_max) + '°C';
  description.innerHTML = data.weather[0].description
  humidity.innerHTML = `Humidity: ` + data.main.humidity + `%`;
  wind.innerHTML = `Wind: ` + data.wind.speed + ' km/h';
  const iconUrl = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
  const icon = document.querySelector('.icon');
  icon.src = iconUrl;
  sunrise.innerHTML = `Sunrise: ` + formatTime(data.sys.sunrise);
  sunset.innerHTML = `Sunset: ` + formatTime(data.sys.sunset);
  bgChange(data);

  favoriteButton.addEventListener('click', () => {
    if (!favoriteCities.includes(data)) {
      favoriteCities.push(data);
      addFavoriteCity(data);
    }
  });
}

function addFavoriteCity(data) {
  const cityContainer = document.createElement('div');
  cityContainer.classList.add('favorite-city');


  const favoriteCity = document.createElement('p');
  favoriteCity.classList.add('favorite-city-name');
  favoriteCity.innerHTML = data.name + `, ` + data.sys.country;
  cityContainer.appendChild(favoriteCity);


  const favoriteTemp = document.createElement('p');
  favoriteTemp.classList.add('favorite-temp');
  favoriteTemp.innerHTML = Math.round(data.main.temp) + '°C';
  cityContainer.appendChild(favoriteTemp);


  const favoriteDescription = document.createElement('p');
  favoriteDescription.classList.add('favorite-description');
  favoriteDescription.innerHTML = data.weather[0].description;
  cityContainer.appendChild(favoriteDescription);


  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    const index = favoriteCities.indexOf(data);
    if (index !== -1) {
      favoriteCities.splice(index, 1);
      favoriteCitiesContainer.removeChild(cityContainer);
    }
  });
  cityContainer.appendChild(removeButton);

  favoriteCitiesContainer.appendChild(cityContainer);
}

function bgChange(data) {
  switch (data.weather[0].icon) {
    case "01d":
      cardImg.src = "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";
      break;
    case "02d":
      cardImg.src = "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      break;
    case "03d":
      cardImg.src = "https://images.unsplash.com/photo-1483702721041-b23de737a886?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80";
      break;
    case "04d":
      cardImg.src = "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      break;
    case "09d":
      cardImg.src = "https://images.unsplash.com/photo-1520609798519-2e1e8c18df3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      break;
    case "10d":
      cardImg.src = "https://images.unsplash.com/photo-1527766833261-b09c3163a791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      break;
    case "11d":
      cardImg.src = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";
      break;
    case "13d":
      cardImg.src = "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      break;
    case "50d":
      cardImg.src = "https://images.unsplash.com/photo-1462040700793-fcd2dbc0edf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      break;
    default:
      cardImg.src = "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80";
      break;
  }
  cardImg.style.backgroundSize = "contain";
  cardImg.style.backgroundRepeat = "no-repeat";
  cardImg.style.height = "480px";
}

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherGeolocation);
  } else {
    errorLocation.innerHTML = "Please allow location";
  }
}

searchBar.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    getWeatherByInput(this.value);
    this.value = "";
  }
});

searchBtn.addEventListener('click', function (event) {
  getWeatherByInput(searchBar.value);
  searchBar.value = "";
});

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const formattedTime = hours + ':' + minutes;
  return formattedTime;
}


