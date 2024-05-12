import './style.css';
// import icon from './icon.png'; To load some image for the code

const baseURL = 'http://api.weatherapi.com/v1';
const key = 'de5b8821295a445cb73200758240203';

const getWeather = async (city) => {
  const request = await fetch(`${baseURL}/current.json?key=${key}&q=${city}`);

  const response = await request.json();

  console.log(response);

  return response;
}

const cardCreation = async (cityToGet) => {

  const data = await getWeather(cityToGet).catch((err) => {
    console.log(err);
  });

  const city = data.location;
  const weather = data.current.condition;

  // INFO CITY TIME  
  // const cityName = city.name;
  const cityTime = city.localtime.slice(11);
  const cityDate = city.localtime.slice(0, 10);
  
  // const cityNameElement = document.getElementById('city-paragraph');
  const cityTimeElement = document.getElementById('user-time-paragraph');
  const cityDateElement = document.getElementById('user-date-paragraph');

  // cityNameElement.innerHTML = cityName;
  cityTimeElement.innerHTML = cityTime;
  cityDateElement.innerHTML = cityDate;

  // INFO CITY WEATHER
  const weatherIconElement = document.getElementById('weather-icon');
  const weatherDescElement = document.getElementById('weather-desc');

  weatherIconElement.src = weather.icon;
  weatherDescElement.innerHTML = weather.text;
};

const cardReset = () => {
  const cityTimeElement = document.getElementById('user-time-paragraph');
  const cityDateElement = document.getElementById('user-date-paragraph');
  const weatherIconElement = document.getElementById('weather-icon');
  const weatherDescElement = document.getElementById('weather-desc');

  cityTimeElement.innerHTML = 'HH:MM';
  cityDateElement.innerHTML = 'Date';
  weatherIconElement.src = '/asset/weather-forecast.png';
  weatherDescElement.innerHTML = 'No city';
}

const dropdownList = document.getElementById('cities');

dropdownList.onchange = () => {
  if( dropdownList.value !== 'none') cardCreation(dropdownList.value);
  else cardReset();
}
