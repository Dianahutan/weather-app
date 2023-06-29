import { useState, useEffect } from "react";
import axios from "axios";

export function useWeatherData() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

      axios.get(url)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLocation();
    }
  };

  return { location, setLocation, weatherData, searchLocation };
}
