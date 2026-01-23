import { useEffect, useState } from "react";

export const API_KEY = "3330ee5459ce772712bec299bd93223e";

interface dailyCard {
  dt_txt: string;
  weather: {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
}

function Weather() {
  const [dailyWeather, setDailyWeather] = useState<dailyCard[]>([]);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=Paris&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.length) {
          console.error("Ville non trouvée");
          return;
        }

        const { lat, lon } = geoData[0];

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );
        const weatherData = await weatherRes.json();

        setDailyWeather(weatherData.list);
      } catch (error) {
        console.error("Erreur météo :", error);
      }
    };

    getWeatherData();
  }, []);

  if (!dailyWeather.length) {
    return <p className="text-center p-10 text-gray-500 font-bold">Chargement du ciel...</p>;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-black mb-10 text-center text-gray-800 tracking-tight">
        Prévisions <span className="text-sky-500">5 Jours</span>
      </h1>

      <div className="carousel carousel-center w-full p-8 space-x-8 bg-sky-50/50 rounded-[3rem] overflow-x-auto shadow-inner">
        {dailyWeather
          .filter((_: any, index: number) => index % 8 === 0)
          .map((item: dailyCard, index) => (
            <div key={index} className="carousel-item">
              
              <div className="w-72 bg-sky-300 rounded-[2.5rem] shadow-2xl shadow-sky-200/50 overflow-hidden flex flex-col border-4 border-white/40 transform transition-all hover:scale-[1.02]">
                
                <div className="bg-sky-400 py-4 shadow-md">
                  <h2 className="text-xl font-black text-white text-center capitalize tracking-wide">
                    {formatDate(item.dt_txt)}
                  </h2>
                </div>

                <div className="p-8 text-center flex-1 flex flex-col items-center justify-around min-h-85">
                  <img
                    className="w-36 h-36 drop-shadow-2xl"
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                    alt={item.weather[0].description}
                  />

                  <div className="space-y-3">
                    <p className="text-6xl font-black text-white drop-shadow-sm">
                      {Math.round(item.main.temp)}°C
                    </p>
                    
                    <div className="flex gap-3 justify-center">
                      <span className="bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-sky-900 shadow-sm">
                        ↓ {Math.round(item.main.temp_min)}°
                      </span>
                      <span className="bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-sky-900 shadow-sm">
                        ↑ {Math.round(item.main.temp_max)}°
                      </span>
                    </div>
                  </div>

                  <p className="text-sm uppercase font-black text-sky-900/60 tracking-[0.2em] mt-6 leading-tight px-2">
                    {item.weather[0].description}
                  </p>
                </div>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Weather;