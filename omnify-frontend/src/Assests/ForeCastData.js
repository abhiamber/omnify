import React, { useEffect } from "react";
import { WeatherState } from "../Context/ContextProvider";
import style from "../Styles/Forecast.module.css";

const ForeCastData = () => {
  let {
    setWeatherData,
    location,
    weatherData,
    setError,
    error,
    loadin,
    setLoading,
  } = WeatherState();

  let getWeather = async () => {
    let response = await fetch(`http://localhost:8080/?city=${location}`);
    setLoading(true);

    try {
      let data = await response.json();
      console.log(data);

      if (data.status === "NOTOK") {
        setLoading(false);

        setWeatherData();
        setError("city not found");
      } else {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err, "mmmmmmmmm");
      setLoading(false);

      setWeatherData();
      setError("city not found");
    }
  };

  useEffect(() => {
    getWeather();
  }, [location]);

  if (loadin) {
    return <h1>Loading weather data</h1>;
  }

  return (
    <div className={style.forecast}>
      <ul>
        {weatherData && weatherData.main ? (
          <div>
            {" "}
            {/*<img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="phot"
            />*/}
            <li>
              <p>
                {weatherData.name}, {weatherData.sys.country}
              </p>
            </li>
            <li>
              Temperature{" "}
              <span>
                {Math.round(weatherData.main.temp)}°c (
                {weatherData.weather[0].main})
              </span>
            </li>
            <li>
              Humidity <span>{Math.round(weatherData.main.humidity)}%</span>
            </li>
            <li>
              Visibility <span>{Math.round(weatherData.visibility)} mi</span>
            </li>
            <li>
              Wind Speed <span>{Math.round(weatherData.wind.speed)} Km/h</span>
            </li>
          </div>
        ) : (
          <li>{error}</li>
        )}
      </ul>
    </div>
  );
};

export default ForeCastData;
