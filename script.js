const apiKey = "fca9b8718e7e7e45651e3c4a0c675d2e";

// Function to create background elements dynamically
function createWeatherBackgroundElements() {
    const background = document.querySelector('.background');

    // Create clouds
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.innerHTML = '☁️';
        cloud.style.top = `${Math.random() * 50}vh`;
        cloud.style.left = `${Math.random() * 100}vw`;
        cloud.style.animationDuration = `${40 + Math.random() * 20}s`;
        background.appendChild(cloud);
    }

    // Create raindrops
    for (let i = 0; i < 20; i++) {
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        raindrop.innerHTML = '💧';
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.animationDuration = `${2 + Math.random() * 2}s`;
        background.appendChild(raindrop);
    }

    // Create snowflakes
    for (let i = 0; i < 10; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄️';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${5 + Math.random() * 3}s`;
        background.appendChild(snowflake);
    }
}

// Call function to generate background elements
createWeatherBackgroundElements();

function changeBackground(weather) {
    if (weather.includes("Rain")) {
        document.body.style.background = 'linear-gradient(to top, #3a3a3a, #87CEEB)';
    } else if (weather.includes("Clouds")) {
        document.body.style.background = 'linear-gradient(to top, #7f8c8d, #ecf0f1)';
    } else if (weather.includes("Snow")) {
        document.body.style.background = 'linear-gradient(to top, #ecf0f1, #bdc3c7)';
    } else {
        document.body.style.background = 'linear-gradient(to top, #f1c40f, #87CEEB)';
    }
}

async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

async function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeather(url);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.getElementById('weather').innerHTML = `
                <h3>${data.name}, ${data.sys.country} 🌍</h3>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>🌦 Weather: ${data.weather[0].description}</p>
            `;
            changeBackground(data.weather[0].main);
        } else {
            document.getElementById('weather').innerHTML = `<p>⚠️ City not found!</p>`;
        }
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>⚠️ Error fetching data</p>`;
    }
}
