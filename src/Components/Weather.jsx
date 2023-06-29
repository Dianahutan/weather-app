import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      if (location.trim() === "") {
        setShowPopup(true);
      } else {
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
            setShowPopup(false); // Resetting the pop-up visibility
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setShowPopup(true); // Showing the pop-up when location is not available
          });
        setLocation("");
      }
    }
  };

  const goToWeatherForecast = () => {
    navigate("/Weatherforecast");
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
        <button onClick={goToWeatherForecast}>Go to More Info</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1> {data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like} </p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity.toFixed()}% </p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MHP </p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <p>Location not available</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
