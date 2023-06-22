import React from "react";
import Clock from "react-live-clock";
import { WeatherState } from "../Context/ContextProvider";
import style from "../Styles/DateBuilder.module.css";

const DateBuilder = () => {
  let { weatherData } = WeatherState();
  //   console.log(weatherData, "mmmmmmmmmmmmmmmmmm");

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };
  return (
    <div
      className={style.DateContainer}
      style={{
      }}
    >
      <div className="current-time">
        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
      </div>
      <span
        className="current-date"
        style={{ fontWeight: 100, fontSize: "15px" }}
      >
        {dateBuilder(new Date())}
      </span>{" "}
      {weatherData && weatherData.main && (
        <span style={{ fontWeight: 400, fontSize: "35px", marginLeft: "20px" }}>
          {" "}
          {weatherData.main.temp} °C
        </span>
      )}
    </div>
  );
};

export default DateBuilder;
