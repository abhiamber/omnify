import { createContext, useContext, useState } from "react";

let globalContext = createContext();

export const ContextProvider = ({ children }) => {
  let [location, setLocation] = useState();
    let [loadin, setLoading] = useState(false);
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
        loadin,
        setLoading,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const WeatherState = () => {
  return useContext(globalContext);
};
