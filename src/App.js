import './App.css';
import { useState } from 'react';

const api = {
  key: 'df1cdf228ccce4bb8cca576b980d1a4a',
  base: 'https://api.openweathermap.org/data/2.5/',
}


function App() {

  const [search, setSearch] = useState('');

  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);

    })
  }

  const getWeatherEmoji = (main) => {
  switch (main) {
    case 'Clouds':
      return '☁️';
    case 'Clear':
      return '☀️';
    case 'Rain':
      return '🌧️';
    case 'Drizzle':
      return '🌦️';
    case 'Thunderstorm':
      return '⛈️';
    case 'Snow':
      return '❄️';
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Fog':
      return '🌫️';
    default:
      return '🌈';
  }
}


  return (
    <div className="App">
      <h1>Weather App</h1>

      <div className="search-container">
      <input
        type="text"
        placeholder="Enter City..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchPressed}>Search</button>
      </div>


      {typeof weather.main !== "undefined" ? (
        <div className="weather-info">
          <div className="weather-emoji">
            {getWeatherEmoji(weather.weather[0].main)}
          </div>
          <p><strong>{weather.name}</strong></p>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].main}</p>
          <p>({weather.weather[0].description})</p>
        </div>
      ) : (
        <p>No data found</p>
      )}

    </div>
  );
}

export default App;
