import { createContext, useContext, useState } from "react";

let globalContext = createContext();

export const ContextProvider = ({ children }) => {
  let [location, setLocation] = useState();
  //   let [city, setCity] = u/seState("delhi");
  let [weatherData, setWeatherData] = useState();
  let [error, setError] = useState();

  return (
    <globalContext.Provider
      value={{
        location,
        setLocation,
        error,
        setError,
        weatherData,
        setWeatherData,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const WeatherState = () => {
  return useContext(globalContext);
};
