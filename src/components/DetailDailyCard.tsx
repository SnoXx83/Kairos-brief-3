import { useEffect, useState } from "react";

export const API_KEY = "3330ee5459ce772712bec299bd93223e";

/* ✅ Interface au bon endroit, avec un nom différent du composant */
interface DetailDailyWeather {
  dt_txt: string;

  weather: {
    icon: string;
    description: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };

  wind: {
    speed: number;
    deg: number;
  };

  clouds: {
    all: number;
  };

  visibility: number;
}

/* ✅ UN SEUL composant, export default */
export default function DetailDailyCard() {
  const [detailDailyWeather, setDetailDailyWeather] =
    useState<DetailDailyWeather[]>([]);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=Paris&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.length) return;

        const { lat, lon } = geoData[0];

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const weatherData = await weatherRes.json();

        setDetailDailyWeather(weatherData.list);
      } catch (error) {
        console.error("Erreur météo :", error);
      }
    };

    getWeatherData();
  }, []);

  if (detailDailyWeather.length === 0) {
    return <p>Chargement de la météo...</p>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 p-4">
      {detailDailyWeather
        .filter((_, index) => index % 8 === 0)
        .map((item, index) => (
          <div
            key={index}
            className="bg-indigo-300 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-indigo-400 px-4 py-2">
              <h2 className="text-sm font-bold text-white text-center">
                {item.dt_txt.split(" ")[0]}
              </h2>
            
            </div>

            <div className="p-4 text-gray-900 space-y-2 text-center">
              <img
                className="mx-auto"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />

              <p className="text-3xl font-semibold">
                {Math.round(item.main.temp - 273.15)}°C
              </p>

              <p className="text-sm">
                Ressenti : {Math.round(item.main.feels_like - 273.15)}°C
              </p>

              <p className="text-sm">
                Min {Math.round(item.main.temp_min - 273.15)}°C / Max{" "}
                {Math.round(item.main.temp_max - 273.15)}°C
              </p>

              <p className="text-sm">Humidité : {item.main.humidity}%</p>
              <p className="text-sm">Pression : {item.main.pressure} hPa</p>
              <p className="text-sm">
                Vent : {Math.round(item.wind.speed * 3.6)} km/h
              </p>
              <p className="text-sm">Nuages : {item.clouds.all}%</p>
              <p className="text-sm">
                Visibilité : {item.visibility / 1000} km
              </p>

              <p className="text-sm capitalize">
                {item.weather[0].description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
