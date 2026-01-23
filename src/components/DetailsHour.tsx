import React, { useEffect, useState } from "react";

interface Hour {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
    temp_kf?: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number; // % de nuages
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility?: number; // en mètres
  pop?: number; // probabilité de pluie
  rain?: {
    "3h"?: number;
  };
  snow?: {
    "3h"?: number;
  };
  sys: {
    pod: string;
  };
}

interface DetailsHourProps {
  city: string;
  hourIndex?: number; // quelle tranche de 3h afficher
}

export default function DetailsHour({ city, hourIndex = 0 }: DetailsHourProps) {
  const [hour, setHour] = useState<Hour | null>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("Ville introuvable");

        const { lat, lon } = geoData[0];

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        const weatherData = await weatherRes.json();
        console.log(weatherData); // pour voir toutes les données

        setHour(weatherData.list[hourIndex]);
      } catch (error) {
        console.error("Erreur météo :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, hourIndex]);

  if (loading) return <p>Chargement météo…</p>;
  if (!hour) return <p>Aucune donnée disponible</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-base-200 rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-2">
        Détails météo – <span className="text-blue-500">{city}</span>
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        {new Date(hour.dt * 1000).toLocaleString("fr-FR")}
      </p>

      <img
        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
        alt={hour.weather[0].description}
        className="w-16 h-16 mx-auto"
      />

      <p className="text-lg font-bold mt-2">{Math.round(hour.main.temp)}°C</p>
      <p className="text-sm text-gray-600 capitalize">{hour.weather[0].description}</p>

      <div className="mt-4 text-sm text-left space-y-1">
        <p>Température ressentie : {Math.round(hour.main.feels_like)}°C</p>
        <p>Température max : {Math.round(hour.main.temp_max)}°C</p>
        <p>Température min : {Math.round(hour.main.temp_min)}°C</p>
        <p>Humidité : {hour.main.humidity}%</p>
        <p>Pression : {hour.main.pressure} hPa</p>
        {hour.main.sea_level && <p>Niveau de la mer : {hour.main.sea_level} hPa</p>}
        {hour.main.grnd_level && <p>Niveau du sol : {hour.main.grnd_level} hPa</p>}
        <p>Nuages : {hour.clouds.all}%</p>
        <p>Vent : {Math.round(hour.wind.speed * 3.6)} km/h, direction {hour.wind.deg}°</p>
        {hour.wind.gust && <p>Rafales : {Math.round(hour.wind.gust * 3.6)} km/h</p>}
        {hour.visibility && <p>Visibilité : {hour.visibility} m</p>}
        {hour.pop && <p>Probabilité de pluie : {hour.pop * 100}%</p>}
        {hour.rain && hour.rain["3h"] && <p>Pluie (3h) : {hour.rain["3h"]} mm</p>}
        {hour.snow && hour.snow["3h"] && <p>Neige (3h) : {hour.snow["3h"]} mm</p>}
        <p>Jour/Nuit : {hour.sys.pod === "d" ? "Jour" : "Nuit"}</p>
      </div>
    </div>
  );
}
