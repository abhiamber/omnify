import React, { useState } from "react";
import style from "../Styles/Navbar.module.css";
import { WeatherState } from "../Context/ContextProvider";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  let [searchCity, setSearchCity] = useState("");
  let { setLocation } = WeatherState();

  let handleLocationClick = () => {
    if (!searchCity) {
      return;
    }
    setLocation(searchCity);
  };

  return (
    <div className={style["main-header-container"]}>
      <div className={style["header-title-logo"]}>WeatherApp</div>
      <div className={style["header-main-input-button"]}>
        <input
          type="text"
          placeholder="Search any city"
          onChange={(e) => setSearchCity(e.target.value)}
          value={searchCity}
        />
        <button onClick={handleLocationClick}>
          {" "}
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
