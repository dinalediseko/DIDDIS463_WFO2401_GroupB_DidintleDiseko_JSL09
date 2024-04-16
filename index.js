// Display a user-friendly error message or handle the error in a different way
// Fallback background image and author name can be set here
async function setBackground() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        const data = await res.json()
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    } catch (err) {
        console.error("Error setting background:", err.message)
    }
}

async function fetchCryptoData() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
        if (!res.ok) {
            throw new Error("Failed to fetch cryptocurrency data")
        }
        const data = await res.json()
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    } catch (err) {
        console.error("Error fetching cryptocurrency data:", err.message)
        // Display a user-friendly error message or handle the error in a different way
    }
}

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

async function fetchWeatherData(position) {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        if (!res.ok) {
            throw new Error("Weather data not available")
        }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (err) {
        console.error("Error fetching weather data:", err.message)
        // Display a user-friendly error message
    }
}

async function initialize() {
    await setBackground();
    await fetchCryptoData();

    getCurrentTime();
    setInterval(getCurrentTime, 1000);

    navigator.geolocation.getCurrentPosition(fetchWeatherData);
}

initialize();