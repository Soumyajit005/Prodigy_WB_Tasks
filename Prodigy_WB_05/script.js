const apiKey = '664610afef13413be467f2168265b33a'; // OpenWeatherMap API key

// Function to fetch weather data by current location
async function getCurrentLocationWeather() {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = '<p>Fetching your location...</p>';

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherInfoDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    }, () => {
        weatherInfoDiv.innerHTML = '<p>Location permission denied or unavailable.</p>';
    });
}

// Function to fetch weather data by city name
async function getWeatherByCity() {
    const location = document.getElementById('location').value;
    const weatherInfoDiv = document.getElementById('weather-info');
    if (!location) {
        weatherInfoDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}

// Function to display weather data with Font Awesome icons
function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const { name, main, weather, wind } = data;

    let weatherIcon = '';
    switch(weather[0].main) {
        case 'Clear':
            weatherIcon = 'fas fa-sun'; // Sunny
            break;
        case 'Clouds':
            weatherIcon = 'fas fa-cloud'; // Cloudy
            break;
        case 'Rain':
            weatherIcon = 'fas fa-cloud-showers-heavy'; // Rainy
            break;
        case 'Snow':
            weatherIcon = 'fas fa-snowflake'; // Snowy
            break;
        case 'Thunderstorm':
            weatherIcon = 'fas fa-bolt'; // Thunderstorm
            break;
        default:
            weatherIcon = 'fas fa-cloud-sun'; // Default icon
    }

    weatherInfoDiv.innerHTML = `
        <div class="weather-box">
            <i class="${weatherIcon}"></i>
            <div class="weather-text">
                <h3>${name}</h3>
                <div class="icon-text">
                    <i class="fas fa-thermometer-half"></i>
                    <p>Temperature: ${main.temp}°C</p>
                </div>
                <div class="icon-text">
                    <i class="fas fa-tint"></i>
                    <p>Humidity: ${main.humidity}%</p>
                </div>
                <div class="icon-text">
                    <i class="fas fa-wind"></i>
                    <p>Wind: ${wind.speed} m/s</p>
                </div>
            </div>
        </div>
    `;
}
