"use client";

import {
  faDroplet,
  faWind,
  faEye,
  faGauge,
  faMapPin,
  faCloud,
  faTemperatureHigh,
  faTemperatureLow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Loading,
  WeatherDetailsDay,
  WeatherDivForADay,
  WeatherDivForAWeek,
} from "./Components";
import { useEffect, useState } from "react";
import axios from "axios";

interface IList {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: [{ main: string; description: string }];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  dt_txt: string;
}

interface IWeatherData {
  city: {
    name: string;
  };
  list: [IList];
}

export default function Home() {
  const [location, setLocation] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState(true);

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
          .get<IWeatherData>(weatherApiUrl)
          .then((weatherResponse) => {
            setWeatherData(weatherResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false after data fetching is complete
          });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  const bg =
    weatherData?.list[0].weather[0].main === "Clear"
      ? "bg-[url(/clear-sky.jpg)]"
      : weatherData?.list[0].weather[0].main === "Rain"
      ? "bg-[url(/heavy-rain.jpg)]"
      : "";

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main
          className={`flex min-h-screen items-center justify-between ${bg} bg-no-repeat bg-cover text-white`}
        >
          <div className="border-r-2 border-x-slate-400 w-1/6 h-screen flex flex-col px-2 items-center justify-around py-12">
            <div className="flex gap-2">
              <h1 className="text-6xl">
                {weatherData?.list[0].main.temp &&
                  Math.round(weatherData.list[0].main.temp - 273)}
                °
                <p className="text-sm">
                  Feels like:{" "}
                  {weatherData?.list[0].main.feels_like &&
                    Math.round(weatherData.list[0].main.feels_like - 273)}
                  °
                </p>
              </h1>
              <div className="py-1">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faTemperatureHigh} size="1x" />
                  <h3 className="">
                    {" "}
                    {weatherData?.list[0].main.temp_max &&
                      Math.round(weatherData.list[0].main.temp_max - 273)}
                    °
                  </h3>
                </div>

                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faTemperatureLow} size="1x" />
                  <h3 className="">
                    {weatherData?.list[0].main.temp_min &&
                      Math.round(weatherData.list[0].main.temp_min - 273)}
                    °
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <WeatherDetailsDay
                icon={faDroplet}
                text={`Humidity: ${weatherData?.list[0].main.humidity}%`}
              />
              <WeatherDetailsDay
                icon={faWind}
                text={`Wind: ${weatherData?.list[0].wind.speed} m/s at ${weatherData?.list[0].wind.deg}°`}
              />
              <WeatherDetailsDay
                icon={faEye}
                text={`Visibility: ${weatherData?.list[0].visibility}`}
              />
              <WeatherDetailsDay
                icon={faGauge}
                text={`Pressure: ${weatherData?.list[0].main.pressure} hPa `}
              />
            </div>
          </div>
          <div className="w-5/6 h-screen flex flex-col justify-around">
            <div className="px-24">
              <p>
                <FontAwesomeIcon icon={faMapPin} size="1x" />{" "}
                {weatherData && weatherData.city.name}
              </p>
              <h2 className="text-6xl capitalize">
                {weatherData && weatherData.list[0].weather[0].description}{" "}
                <FontAwesomeIcon icon={faCloud} size="1x" />
              </h2>

              <p className="flex gap-2 items-center py-2 text-sm">
                {weatherData && weatherData.list[0].dt_txt}
              </p>
            </div>

            <div className="flex w-full justify-around px-16">
              {weatherData?.list.slice(0, 8).map((data) => (
                <WeatherDivForADay
                  temp={Math.round(data.main.temp - 273)}
                  name={data.weather[0].main}
                  time={data.dt_txt.split(" ")[1]}
                  day={
                    data.dt_txt.split(" ")[0] ===
                    weatherData?.list[0].dt_txt.split(" ")[0]
                      ? "Today"
                      : "Tomorrow"
                  }
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
