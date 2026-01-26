import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailsHour from "./DetailsHour";
import DetailDailyCard from "./DetailDailyCard";
import type WeatherData from "../types/hero";
import Nav from "./Nav";
import Footer from "./Footer";

export default function WeatherDetails() {
  const { cityName } = useParams<{ cityName: string }>();
  const [data, setData] = useState<WeatherData>();
  const API_KEY = import.meta.env.VITE_API_Key;
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();
        if (!geoData.length) return;

        const { lat, lon } = geoData[0];

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        const weatherData = await response.json();
        setData(weatherData);
      } catch (error) {
        console.log(error);
      }
    };
    if (cityName) fetchWeather();
  }, [cityName]);

  return (
    <>
      <Nav />
      <div className="bg-sky-900 min-h-screen rounded-3xl mt-7 p-4 md:p-10 mb-25 ">
        <h2 className="text-3xl font-bold text-white mb-10 py-5">Météo pour {cityName}</h2>

        <div className="hero bg-sky-700 backdrop-blur-md rounded-2xl mb-25  shadow-xl">
          <div className="hero-content max-w-none w-full flex-col md:flex-row justify-around text-white">
            <div className="text-center">
              <img
                src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
                alt={data?.weather[0].description}
                className="w-40 h-40"
              />
              <h2 className="text-6xl font-bold">
                {data ? Math.round(data.main.temp) : "--"}°C
              </h2>
              <p className="capitalize text-xl my-3">{data?.weather[0].description}</p>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-center m-5">{data?.name}</h1>
              <h3 className="text-2xl text-center">{data?.sys.country}</h3>
              <p className="py-2 text-lg m-2 text-center">
                {data?.main.humidity}% d'humidité.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:flex-1 bg-white/90 rounded-3xl shadow-xl overflow-hidden">
            <DetailsHour city={cityName || ""} />
          </div>

          <div className="w-full lg:flex-1 bg-white/90 rounded-3xl shadow-xl overflow-hidden">
            <DetailDailyCard city={cityName || ""} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}