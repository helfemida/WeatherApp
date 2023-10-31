function getWeatherByCity(city) {
    // Replace this section with code to fetch weather data based on the city
    // This is a placeholder for fetching weather data using the city name
    // Simulating weather data using random values
    const mockWeatherData = {
      name: city,
      country: 'NA',
      temp: Math.floor(Math.random() * 30),
      description: 'Mock Weather Description',
      humidity: Math.floor(Math.random() * 100),
      windSpeed: Math.floor(Math.random() * 20)
    };
    displayWeather(mockWeatherData);
  }
  
  function getCityNameFromOpenStreetMap(latitude, longitude) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state || '';
        if (city !== '') {
          getWeatherByCity(city);
        } else {
          console.log('City not found');
        }
      })
      .catch(error => console.log('Error fetching city name:', error));
  }
  
  function getWeatherByCoordinates(latitude, longitude) {
    getCityNameFromOpenStreetMap(latitude, longitude);
  }
  
  function getWeather() {
    const city = document.getElementById('city').value;
    getWeatherByCity(city);
  }
  
  function getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherByCoordinates(latitude, longitude);
      }, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showError(error) {
    alert("Unable to retrieve your location.");
  }
  
  function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.country}</h2>
      <p>Temperature: ${data.temp}°C</p>
      <p>Description: ${data.description}</p>
      <p>Humidity: ${data.humidity}%</p>
      <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
  }