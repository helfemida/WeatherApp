const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {

  const APIkey = '56ea7cc381583a16e6e7bc493bace6ca';
  const city = document.querySelector('.search-box input').value;

  if(city == '')
    return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity');
    const wind = document.querySelector('.weather-details .wind');

    switch(json.weather[0].main){
      case 'Clear':
        image.src = 'src/sun.png';
        break;

      case 'Rain':
        image.src = 'src/rain.png';
        break;
      case 'Snow':
        image.src = 'src/snowy.png';
        break;
      case 'Clouds':
        image.src = 'src/cloudy.png';
        break;
      case 'Haze':
        image.src = 'src/windy.png';
        break;
      case 'Mist':
        image.src = 'src/windy.png';
        break;
      default:
        image.src = 'images/sun.png';
        break;
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

  });

})