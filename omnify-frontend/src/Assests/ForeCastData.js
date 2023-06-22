import React, { useEffect } from "react";
import { WeatherState } from "../Context/ContextProvider";
import style from "../Styles/Forecast.module.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import { GiNightVision } from "react-icons/gi";
import { API } from "../API";

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
    console.log(location, "kkkkkkkkkkkkkkkkkkk");
    let response = await fetch(`${API}/?city=${location}`);
    setLoading(true);

    try {
      let data = await response.json();
      // console.log(data);

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
    if (location) {
      getWeather();
    }
  }, [location]);

  // console.log(weatherData, "kekekekekekek");

  if (loadin) {
    return <h1>Loading weather data</h1>;
  }

  return (
    <div className={style.container}>
      {weatherData && weatherData.main && (
        <h2 style={{ textDecoration: "underline" }}>
          {" "}
          {weatherData.name}, {weatherData.sys.country}
        </h2>
      )}
      <ul>
        {weatherData && weatherData.main ? (
          <div className={style.forecast}>
            <li>
              Temperature <FaTemperatureHigh />
              <span>
                {Math.round(weatherData.main.temp)}°c (
                {weatherData.weather[0].main})
              </span>
            </li>
            <li>
              Humidity <WiHumidity />{" "}
              <span>{Math.round(weatherData.main.humidity)}%</span>
            </li>
            <li>
              Visibility <GiNightVision />{" "}
              <span>{Math.round(weatherData.visibility)} mi</span>
            </li>
            <li>
              Wind Speed <BiWind />{" "}
              <span>{Math.round(weatherData.wind.speed)} Km/h</span>
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
