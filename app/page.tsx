"use client";

import {
  faDroplet,
  faWind,
  faEye,
  faGauge,
  faClock,
  faSun,
  faMoon,
  faMapPin,
  faCloud,
  faTemperatureHigh,
  faTemperatureLow,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  WeatherDetailsDay,
  WeatherDivForADay,
  WeatherDivForAWeek,
} from "./Components";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  city: {
    name: string;
  };
  list: [{ main: { temp: number } }];
}

export default function Home() {
  const [location, setLocation] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Get user's geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Set latitude and longitude as the user's location
        setLocation({ latitude, longitude });

        // Fetch weather data using OpenWeatherMap API
        const weatherApiKey = "YOUR_OPENWEATHERMAP_API_KEY";
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=afa686b6ddf43261ad3dc386077429f8`;

        axios
          .get(weatherApiUrl)
          .then((weatherResponse) => {
            setWeatherData(weatherResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return (
    <main className="flex min-h-screen items-center justify-between bg-[url(/storm-clouds.png)] bg-no-repeat bg-cover text-white">
      <div className="border-r-2 border-x-slate-400 w-1/6 h-screen flex flex-col px-2 items-center justify-around py-12">
        <div className="flex gap-2">
          <h1 className="text-6xl">
            {weatherData?.list[0].main.temp}
            <p
              className="text-sm"
              onClick={() => console.log(weatherData?.list[0].main.temp)}
            >
              Feels like: 20
            </p>
          </h1>
          <div className="py-1">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faTemperatureHigh} size="1x" />
              <h3 className="">23°</h3>
            </div>

            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faTemperatureLow} size="1x" />
              <h3 className="">18°</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <WeatherDetailsDay icon={faDroplet} text="Humidity: 23%" />
          <WeatherDetailsDay icon={faWind} text="Wind: 2.06 at 40°" />
          <WeatherDetailsDay icon={faEye} text="Visibility: 6000" />
          <WeatherDetailsDay icon={faGauge} text="Pressure: 1007" />
        </div>

        <div className="flex gap-8 mb-24">
          <p className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faSun} size="1x" color="yellow" />
            19000
          </p>

          <p className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faMoon} size="1x" color="grey" />
            19000
          </p>
        </div>
      </div>
      <div className="w-5/6 h-screen flex flex-col justify-around">
        <div className="px-24">
          <p>
            <FontAwesomeIcon icon={faMapPin} size="1x" /> Abomsa
          </p>
          {/* name */}
          <h2 className="text-6xl">
            Few Clouds <FontAwesomeIcon icon={faCloud} size="1x" />
          </h2>
          {/* Description */}

          <p className="flex gap-2 items-center py-2 text-sm">
            12/01/20
            <FontAwesomeIcon icon={faClock} size="1x" />
            19000
          </p>
        </div>

        <div className="flex w-full justify-around px-16">
          <WeatherDivForADay />
          <WeatherDivForADay />
          <WeatherDivForADay />
          <WeatherDivForADay />
          <WeatherDivForADay />
          <WeatherDivForADay />
          <WeatherDivForADay />
          <WeatherDivForADay />
        </div>

        <div className="flex justify-around border-t-2 border-slate-400 pt-8">
          <WeatherDivForAWeek />
          <WeatherDivForAWeek />
          <WeatherDivForAWeek />
          <WeatherDivForAWeek />
          <WeatherDivForAWeek />
        </div>
      </div>
    </main>
  );
}
