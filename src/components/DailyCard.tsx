import { useEffect, useState } from "react";

const API_KEY = "3330ee5459ce772712bec299bd93223e";

interface dailyCard {
  dt_txt: string;
  weather:
  {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  }
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

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // console.log(lat, lon)

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const weatherData = await weatherRes.json();

        setDailyWeather(weatherData.list);
      } catch (error) {
        console.error("Erreur météo :", error);
      }
    };

    getWeatherData();
  }, []);

  // Sécurité avant affichage
  if (!dailyWeather) {
    return <p>Chargement de la météo...</p>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 p-4">
      {dailyWeather
        .filter((_: any, index: number) => index % 8 === 0)
        .map((item: dailyCard, index) => (
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
                Min {Math.round(item.main.temp_min - 273.15)}°C / Max{" "}
                {Math.round(item.main.temp_max - 273.15)}°C
              </p>

              <p className="text-sm">
                Humidité : {item.main.humidity}%
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

export default Weather;






