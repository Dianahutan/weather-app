import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WeatherForecast() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const handleSearch = () => {
    if (location.trim() === "") {
      setShowPopup(true);
      return;
    }

    axios
      .get(url)
      .then((response) => {
        if (response.data.cod === 200) {
          setWeatherData(response.data);
          setShowPopup(false);
        } else {
          setShowPopup(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setShowPopup(true);
      });
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="forecast-app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Enter location"
          type="text"
        />
        <button onClick={goBack}>Go Back</button>
      </div>
      <div className="forecast-container">
        <div className="top">
          <div className="location">
            <p>{weatherData?.name}</p>
          </div>
          <div className="temp">
            {weatherData?.main ? <h1>{weatherData.main.temp.toFixed()}°C</h1> : null}
          </div>
        </div>
        {weatherData?.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData?.main ? (
                <p className="bold">{weatherData.main.temp_min.toFixed()}°C</p>
              ) : null}
              <p>Min temperature</p>
            </div>
            <div className="humidity">
              {weatherData?.main ? (
                <p className="bold">{weatherData.main.temp_max.toFixed()}°C</p>
              ) : null}
              <p>Max temperature</p>
            </div>
            <div className="wind">
              {weatherData?.wind ? (
                <p className="bold">{weatherData.main.pressure}</p>
              ) : null}
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>
      {showPopup && <div className="popup">Location unavailable</div>}
    </div>
  );
}

export default WeatherForecast;
