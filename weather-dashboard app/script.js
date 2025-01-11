const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", async () => {
    const city = cityInput.value;
    if (city) {
        await getWeatherData(city);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeatherData(city) {
    const apiKey = "4ab194322e4475b68925ea84b6febd8b"; // Replace with your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            const { name, main, weather } = data;
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherInfo.innerHTML = "<p>City not found. Please try again.</p>";
        }
    } catch (error) {
        weatherInfo.innerHTML = "<p>Failed to retrieve weather data. Please try again later.</p>";
    }
}
