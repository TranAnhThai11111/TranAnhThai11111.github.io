const apiKey = '06b763ed3b07470e73e63bb23574f9ed';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

document.addEventListener('DOMContentLoaded', () => {
    getCurrentLocationWeather();
});

searchButton.addEventListener('click', searchWeather);

locationInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

function searchWeather() {
    const location = locationInput.value.trim();

    if (location !== '') {
        fetchWeatherByCity(location);
    }
}

function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
        fetchWeatherByCity('Hanoi');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        },
        () => {
            fetchWeatherByCity('Hanoi');
        }
    );
}

function displayWeather(data) {
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
}

function showError(message) {
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
}

function fetchWeatherByCity(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod != 200) {
                showError('City not found');
                return;
            }

            displayWeather(data);
        })
        .catch(() => {
            showError('Failed to load weather');
        });
}

function fetchWeatherByCoords(lat, lon) {
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(() => {
            showError('Failed to load weather');
        });
}
