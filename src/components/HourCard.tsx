
import React, { useEffect, useState } from "react";

interface Hour {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

// Interface pour la props city (a définir par le composant parent sinon Paris par défault)
interface HourCardProps {
  city: string; 
}

export default function HourCard({ city = "Paris" }: HourCardProps) {
  const [hours, setHours] = useState<Hour[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
      // Récupération des coordonnées lat et longitude
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        // Transforme le tableau d'objet en json
        const geoData = await geoRes.json();

        if (!geoData.length) {
          throw new Error("Ville introuvable");
        }
        // Extraction des coordonnées
        const { lat, lon } = geoData[0];

        // Récupération de la météo toutes les 3h
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        const weatherData = await weatherRes.json();
         console.log(weatherData);
         
        // affiche les 24h suivante par tranche de 3h
        setHours(weatherData.list.slice(0, 8));
      } catch (error) {
        console.error("Erreur météo :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // relance le fetch si la ville change

  if (loading) return <p>Chargement météo…</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center"> Météo toutes les 3h – <span className="text-blue-500"> {city}</span> </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {hours.map((hour) => (
          <div key={hour.dt}className="card w-24 bg-base-200 shadow-md text-center p-2">
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-sm font-medium mb-1">
              {`${new Date(hour.dt * 1000).getHours()}h${new Date(hour.dt * 1000).getMinutes().toString().padStart(2, '0')}`}
            </p>

            <p className="text-lg font-bold mt-1">
                // Arrondi à l'entier le plus proche
              {Math.round(hour.main.temp)}°C
            </p>

            <small className="text-xs text-gray-400">
              {hour.weather[0].description}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
