import React, { useEffect } from "react";
import { WeatherState } from "../Context/ContextProvider";

const Map = () => {
  let { location, setLocation } = WeatherState();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // console.log(lat, lon, position);
    let url2 = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=273f5ff95ca4ff1a00db8b01f38ae2e0`;

    fetch(url2)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        // console.log(data);
        setLocation(data[0].name);
      })

      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div style={{ position: "fixed", bottom: "0px", width: "100%" }}>
      <iframe
        style={{
          width: "100%",
          height: "20vh",
          frameborder: "0",
          scrolling: "no",
          marginheight: "0",
          marginwidth: "0",
        }}
        title="frame1"
        src={
          location
            ? `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`
            : "https://maps.google.com/maps?q=india&t=&z=13&ie=UTF8&iwloc=&output=embed"
        }
      />
    </div>
  );
};

export default Map;
