import { useEffect, useState } from "react";
import { API_KEY } from "./DailyCard";

interface Hour {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

interface HourCardProps {
  city: string;
}

export default function HourCard({ city }: HourCardProps) {
  const [hours, setHours] = useState<Hour[]>([]);
  const [loading, setLoading] = useState(true);

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
        setHours(weatherData.list.slice(0, 8));
      } catch (error) {
        console.error("Erreur météo :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return <p className="text-center p-10 text-gray-500 font-bold tracking-widest">Analyse du ciel...</p>;

  return (
    <div className=" w-full">
      <h1 className="text-3xl font-black mb-10 text-center text-gray-800 tracking-tight">
        Météo <span className="text-sky-700 text-shadow-sm">Toutes les 3h</span>
      </h1>

      <div className="carousel carousel-center w-full p-8 space-x-8 bg-sky-50/50 rounded-[3rem] overflow-x-auto shadow-inner">
        {hours.map((hour) => (
          <div key={hour.dt} className="carousel-item">

            <div className="w-72 bg-sky-700/50 rounded-[2.5rem] shadow-2xl shadow-sky-200/50 overflow-hidden flex flex-col border-4 border-white/40 transform transition-all hover:scale-[1.02]">

              <div className="bg-sky-900 py-4 shadow-md">
                <h2 className="text-xl font-black text-white text-center tracking-widest">
                  {new Date(hour.dt * 1000).getHours()}h00
                </h2>
              </div>

              <div className="p-8 text-center flex-1 flex flex-col items-center justify-around min-h-85">
                <img
                  className="w-36 h-36 drop-shadow-2xl"
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`}
                  alt={hour.weather[0].description}
                />

                <div className="space-y-3">
                  <p className="text-6xl font-black text-white drop-shadow-sm">
                    {Math.round(hour.main.temp)}°C
                  </p>
                  <p className="text-sm uppercase font-black text-sky-900/60 tracking-[0.2em] mt-2 leading-tight">
                    {hour.weather[0].description}
                  </p>
                </div>
                <div className="mt-6 px-6 py-2 bg-white/40 backdrop-blur-sm rounded-full inline-block shadow-sm">
                  <span className="text-[10px] font-black text-sky-900 tracking-tighter">PRÉVISIONS LOCALES</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}