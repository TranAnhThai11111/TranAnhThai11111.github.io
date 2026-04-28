const apiKey = '06b763ed3b07470e73e63bb23574f9ed';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            () => {
                fetchWeather('Hanoi');
            }
        );
    } else {
        fetchWeather('Hanoi');
    }
});

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();

    if (location) {
        fetchWeather(location);
    }
});

function displayWeather(data) {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
}

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                locationElement.textContent = 'City not found';
                temperatureElement.textContent = '';
                descriptionElement.textContent = '';
                return;
            }

            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchWeatherByCoords(lat, lon) {
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
