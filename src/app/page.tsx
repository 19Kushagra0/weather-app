"use client";
import { useState } from "react";
import "./page.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [condition, setCondition] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const inputHandler = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const searchButton = () => {
    console.log(inputValue);

    const apiKey = "e536af1685564a2eae1113933250810";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputValue}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTemperature(data.current.temp_c); // temperature
        setCondition(data.current.condition.text); // condition text
        setWeatherIcon(data.current.condition.icon); // weather icon URL
        setCityName(`${data.location.name}, ${data.location.country}`); // official city name
      });

    console.log(temperature);
    setCityName(inputValue);
    setInputValue("");
  };
  return (
    <div className="app">
      <div className="weather-app">
        <div className="nature-card">
          <div className="search-box">
            {/* input */}
            <input
              onChange={inputHandler}
              value={inputValue}
              type="text"
              placeholder="Enter city to find Weather..."
              className="city-name"
            />
            <button onClick={searchButton}>Search</button>
          </div>

          <div className="weather-box">
            {/* Location */}
            <h2 className="location">{cityName}</h2>
            {/* Temprature */}
            <div className="temperature">{temperature}</div>
            {/* Condition */}
            <div className="condition">{condition}</div>
            {/* Image */}
            {weatherIcon && (
              <img
                src={weatherIcon}
                alt="Weather Icon"
                className="weather-icon"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
