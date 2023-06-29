import React from "react";
import WeatherForecast from "./Components/WeatherForecast";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Weather from "./Components/Weather";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Weather />,
  },
  {
    path: "/WeatherForecast",
    element: <WeatherForecast />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
