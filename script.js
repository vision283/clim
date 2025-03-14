const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
    const APIKey = '58055f42b50b63f3495ed9692350a19e';
    const city = document.querySelector(".search-box input").value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == "404") {
                cityHide.textContent = city;
                container.style.height = "400px";
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            image.style.transform = "none"; // Corregido

            if (cityHide.textContent === city) return;

            cityHide.textContent = city;
            container.style.height = "555px";
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            // ⛔ Eliminado el setTimeout que ocultaba el weatherBox

            // Asignación de imagen según el clima
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = "./clear.png";
                    break;
                case 'Rain':
                    image.src = "./rain.png";
                    break;
                case 'Snow':
                    image.src = "./snow.png";
                    break;
                case 'Clouds':
                    image.src = "./cloud.png";
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = "./mist.png";
                    break;
                default:
                    image.src = "./cloud.png";
                    break;
            }

            // Mostrar datos en pantalla
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Manejo de clones sin eliminar elementos principales
            const infoWeather = document.querySelector(".info-weather");
            const infoHumidity = document.querySelector(".info-humidity");
            const infoWind = document.querySelector(".info-wind");

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            // Eliminar solo clones antiguos
            const cloneInfoweather = document.querySelectorAll('.info-weather.active-clone');
            const cloneInfohumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfowind = document.querySelectorAll('.info-wind.active-clone');

            if (cloneInfoweather.length > 1) cloneInfoweather[0].remove();
            if (cloneInfohumidity.length > 1) cloneInfohumidity[0].remove();
            if (cloneInfowind.length > 1) cloneInfowind[0].remove();
        })
        .catch(error => console.error("Error obteniendo datos del clima:", error));
});
