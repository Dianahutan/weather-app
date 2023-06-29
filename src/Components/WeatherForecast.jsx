import React from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherData } from "./useWeatherData";

function WeatherForecast() {
  const { location, setLocation, weatherData, searchLocation } = useWeatherData();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter location"
          type="text"
        />
      </div>
      {weatherData && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              <h1>{weatherData.main.temp.toFixed()}°C</h1>
            </div>
            <div className="description">
              <p>{weatherData.weather[0].main}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">{weatherData.sys.sunse}</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">{weatherData.main.humidity.toFixed()}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{weatherData.wind.speed.toFixed()} MHP</p>
              <p>Wind speed</p>
            </div>
          </div>
        </div>
      )}
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default WeatherForecast;
