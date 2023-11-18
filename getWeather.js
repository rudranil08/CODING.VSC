async function getWeather() {
  const apiKey = 'aa74796b476012b61a3c231e2eccf2c7';
  const city = document.getElementById('cityInput').value;
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');

  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    temperatureElement.textContent = data.main.temp;
    descriptionElement.textContent = data.weather[0].description;
  } catch (error) {
    console.log('Error fetching weather data:', error);
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';

  }

}