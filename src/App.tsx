import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface WeatherData {
  name: string;
  temp: number;
  humidity: number;
  wind: { speed: number };
  feels_like: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  // Další vlastnosti, které očekáváte od API...
}

function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [icons,setIcons]=useState("")
  const [location, setLocation] = useState(``);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=db0840f95d9213c5790cddb57ac9d6cf&units=metric`;
  const iconUrl= `https://openweathermap.org/img/wn/${icons}d@2x.png`

  const searchLocation = (event: { key: string }) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation(``);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            <h1>{data?.main.temp}°C</h1>
            <p>{data?.weather[0].icon && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
          )}</p>
          </div>
          <div className="clouds">
            <p className="bold">{data?.weather[0].description}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="wind">
            <p>Wind</p>
            <p className="bold">{data?.wind.speed}km/h</p>
          </div>
          <div className="feels">
            <p>Feels like</p>
            <p className="bold">{data?.main.feels_like}°C</p>
          </div>
          <div className="humidity">
            <p>Humidity</p>
            <p className="bold">{data?.main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
//https://api.openweathermap.org/data/2.5/weather?q=Praha&appid=db0840f95d9213c5790cddb57ac9d6cf&units=metric
