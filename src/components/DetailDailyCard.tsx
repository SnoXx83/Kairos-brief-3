import { useEffect, useState } from "react";
import type DetailDailyWeather from "../types/DetailDailyCard";
import type DetailDailyCardProps from "../types/DetailDailyCard";



export default function DetailDailyCard({ city }: DetailDailyCardProps) {
  const [detailDailyWeather, setDetailDailyWeather] = useState<DetailDailyWeather[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_Key;


  useEffect(() => {
    const getWeatherData = async () => {
      if (!city) return;

      try {
        setLoading(true);
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.length) return;

        const { lat, lon } = geoData[0];

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        const weatherData = await weatherRes.json();

        setDetailDailyWeather(weatherData.list);
      } catch (error) {
        console.error("Erreur météo :", error);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  if (loading) return <div className="p-5 text-center">Chargement...</div>;

  const dailyData = detailDailyWeather.filter((_, index) => index % 8 === 0);

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4 text-sky-900">Prévisions 5 jours</h3>
      <div className="overflow-x-auto rounded-xl shadow-xl">
        <table className="table w-full bg-white shadow-xl">
          <thead className="bg-sky-900 text-white">
            <tr>
              <th>Jour</th>
              <th>Météo</th>
              <th>Temp.</th>
              <th>Vent</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map((item, index) => (
              <tr key={index} className="hover:bg-sky-200 transition-colors border-b border-sky-600">
                <td className="font-medium capitalize border-sky-500">
                  {new Date(item.dt * 1000).toLocaleDateString("fr-FR", { weekday: 'long' })}
                </td>
                <td className="border-sky-500">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt="icon"
                    className="w-10 h-10 "
                  />
                </td>
                <td className="font-bold border-sky-500">{Math.round(item.main.temp)}°C</td>
                <td className="text-sm border-sky-500">{Math.round(item.wind.speed * 3.6)} km/h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}