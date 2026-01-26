import { useEffect, useState } from "react";


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
  clouds: { all: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility?: number;
  pop?: number;
  rain?: { "3h"?: number };
  snow?: { "3h"?: number };
  sys: { pod: string };
}

interface DetailsHourProps {
  city: string;
}

export default function DetailsHour({ city }: DetailsHourProps) {
  const [forecastList, setForecastList] = useState<Hour[]>([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_Key;


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
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
        setForecastList(weatherData.list);
      } catch (error) {
        console.error("Erreur météo :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!forecastList.length) return <p className="text-center p-10">Aucune donnée disponible</p>;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-6 text-center capitalize text-sky-900">
        Prévisions 24h : <span className="text-sky-500">{city}</span>
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl">
        <table className="table w-full text-center">

          <thead className="bg-sky-900  text-white">
            <tr>
              <th>Heure</th>
              <th>Météo</th>
              <th>Temp.</th>
              <th>Ressenti</th>
              <th>Pluie (%)</th>
              <th>Vent</th>
              <th>Humidité</th>
            </tr>
          </thead>

          <tbody>
            {forecastList.slice(0, 8).map((hour) => (
              <tr key={hour.dt} className="hover:bg-sky-200 transition-colors">
                <td className="font-bold">
                  {new Date(hour.dt * 1000).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td>
                  <div className="flex flex-col items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                      alt={hour.weather[0].description}
                      className="w-10 h-10"
                    />
                    <span className="text-[10px] uppercase opacity-60 font-medium">
                      {hour.weather[0].description}
                    </span>
                  </div>
                </td>
                <td className="text-lg font-bold">
                  {Math.round(hour.main.temp)}°C
                </td>
                <td className="opacity-70">
                  {Math.round(hour.main.feels_like)}°C
                </td>
                <td>
                  <span className={`font-medium ${hour.pop && hour.pop > 0.3 ? 'text-blue-500' : ''}`}>
                    {Math.round((hour.pop || 0) * 100)}%
                  </span>
                </td>
                <td>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold">{Math.round(hour.wind.speed * 3.6)} km/h</span>
                    <span className="opacity-50 text-[9px]">Dir: {hour.wind.deg}°</span>
                  </div>
                </td>
                <td>{hour.main.humidity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}