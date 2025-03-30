const accessKey = '1803ba732b1ce2697c5e527f75103ca8';
const form = document.getElementById('weather-form');
const city1Input = document.getElementById('city1');
const city2Input = document.getElementById('city2');
const weatherCard1 = document.getElementById('weather-card1');
const weatherCard2 = document.getElementById('weather-card2');
const weatherIcon1 = document.getElementById('weather-icon1');
const weatherIcon2 = document.getElementById('weather-icon2');
const location1Label = document.getElementById('location1');
const location2Label = document.getElementById('location2');
const localTime1 = document.getElementById("localtime1");
const localTime2 = document.getElementById("localtime2");
const temperatureText1 = document.getElementById('temperature1');
const temperatureText2 = document.getElementById('temperature2');
const weatherDescription1 = document.getElementById('weather-description1');
const weatherDescription2 = document.getElementById('weather-description2');
const clearButton = document.getElementById('clear-button');
const timeDifferenceElement = document.getElementById('time-difference');
const temperatureDifferenceElement = document.getElementById('temperature-difference');

const formatLocalTime = (localTime) => {
    const date = new Date(localTime);
    return date.toLocaleString();
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city1 = city1Input.value.trim();
    const city2 = city2Input.value.trim();

    if (!city1 || !city2) {
        alert('Please enter both cities!');
        return;
    }

    const url1 = `https://api.weatherstack.com/current?access_key=${accessKey}&query=${city1}`;
    const url2 = `https://api.weatherstack.com/current?access_key=${accessKey}&query=${city2}`;

    try {
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const result1 = await response1.json();
        const result2 = await response2.json();

        if (result1.error) {
            alert(`Error: ${result1.error.info}`);
            weatherCard1.style.display = 'none';
        } else {
            location1Label.textContent = `${result1.location.name}, ${result1.location.country}`;
            localTime1.textContent = `Local Time: ${formatLocalTime(result1.location.localtime)}`;
            temperatureText1.textContent = `Temperature: ${result1.current.temperature}°C`;
            weatherIcon1.src = result1.current.weather_icons[0];
            weatherDescription1.textContent = `Weather: ${result1.current.weather_descriptions[0]}`;
            weatherCard1.style.display = 'block';
        }

        if (result2.error) {
            alert(`Error: ${result2.error.info}`);
            weatherCard2.style.display = 'none';
        } else {
            location2Label.textContent = `${result2.location.name}, ${result2.location.country}`;
            localTime2.textContent = `Local Time: ${formatLocalTime(result2.location.localtime)}`;
            temperatureText2.textContent = `Temperature: ${result2.current.temperature}°C`;
            weatherIcon2.src = result2.current.weather_icons[0];
            weatherDescription2.textContent = `Weather: ${result2.current.weather_descriptions[0]}`;
            weatherCard2.style.display = 'block';
        }

        if (result1.location.localtime && result2.location.localtime) {
            const time1 = new Date(result1.location.localtime);
            const time2 = new Date(result2.location.localtime);

            const timeDifference = Math.abs(time1 - time2);
            const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            timeDifferenceElement.textContent = `Time Difference: ${hoursDifference} hours and ${minutesDifference} minutes`;
        }

        if (result1.current.temperature && result2.current.temperature) {
            const temp1 = result1.current.temperature;
            const temp2 = result2.current.temperature;

            const tempDifference = Math.abs(temp1 - temp2);
            temperatureDifferenceElement.textContent = `Temperature Difference: ${tempDifference}°C`;
        }

    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data.');
        weatherCard1.style.display = 'none';
        weatherCard2.style.display = 'none';
    }
});

clearButton.addEventListener('click', () => {
    city1Input.value = '';
    city2Input.value = '';

    weatherCard1.style.display = 'none';
    weatherCard2.style.display = 'none';
    timeDifferenceElement.textContent = 'Time Difference: --';
    temperatureDifferenceElement.textContent = 'Temperature Difference: --°C';
});
