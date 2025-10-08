"use client";
import { useState } from "react";
import "./page.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const searchButton = () => {
    const apiKey = "e536af1685564a2eae1113933250810";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputValue}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) {
          setTemperature(data.current.temp_c);
          setCondition(data.current.condition.text);
          setWeatherIcon(data.current.condition.icon);
          setCityName(`${data.location.name}, ${data.location.country}`);
        } else {
          setTemperature(null);
          setCondition(null);
          setWeatherIcon(null);
          setCityName("Not a real city");
        }
      });

    setInputValue("");
  };

  return (
    <div className="app">
      <div className="weather-app">
        <div className="nature-card">
          <div className="search-box">
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
            <h2 className="location">{cityName}</h2>
            <div className="temperature">
              {temperature !== null
                ? `${temperature}°C`
                : cityName === "Not a real city"
                ? "Not a real city"
                : ""}
            </div>
            <div className="condition">{condition}</div>
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
