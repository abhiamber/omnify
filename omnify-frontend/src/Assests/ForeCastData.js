import React, { useEffect } from "react";
import { WeatherState } from "../Context/ContextProvider";
import style from "../Styles/Forecast.module.css";

const ForeCastData = () => {
  let { setWeatherData, location, weatherData, setError, error } =
    WeatherState();

  let getWeather = async () => {
    // console.log()
    //   let url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=273f5ff95ca4ff1a00db8b01f38ae2e0`

    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=273f5ff95ca4ff1a00db8b01f38ae2e0&units=metric`;

    let response = await fetch(`http://localhost:8080/?city=${location}`);

    try {
      let data = await response.json();
      console.log(data);

      if (data.status === "NOTOK") {
        setWeatherData();
        setError("city not found");
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      console.log(err, "mmmmmmmmm");

      setWeatherData();
      setError("city not found");
    }
  };

  useEffect(() => {
    getWeather();
  }, [location]);
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
