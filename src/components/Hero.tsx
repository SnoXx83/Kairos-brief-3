import { useEffect, useState } from 'react';
import type WeatherData from '../types/hero';

export default function Hero() {
    const [data, setData] = useState<WeatherData>();
    const API_KEY = import.meta.env.VITE_API_Key;


    useEffect(() => {
        const featchWeather = async () => {
            try {
                const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=Paris&limit=1&appid=${API_KEY}`);
                const geoData = await geoRes.json();
                if(!geoData.length) return;
                const {lat, lon} = geoData[0];

                const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)

                const weatherData = await response.json();
                // console.log(weatherData)
                setData(weatherData);
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        featchWeather();
    }, []);

    // console.log(data);

    return (
        <div className="hero bg-sky-950/95 h- md:h-90 rounded-2xl">
            <div className="hero-content max-w-none w-full max-sm:flex-col justify-around text-white">

                <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
                        alt={data?.weather[0].description}
                        className="w-40 h-40"
                    />
                    <h2 className=" text-4xl font-bold">
                        {data ? Math.round(data.main.temp) : "--"}°C
                    </h2>
                </div>
                <div>
                    <h1 className="py-5 text-4xl font-bold">
                        {data?.name}
                    </h1>
                    <h3>
                        {data?.sys.country}
                    </h3>
                    <p className='py-5 text-2xl'>
                        {data?.main.humidity}% d'humidité dans l'air est attendu.
                    </p>
                </div>
            </div>
            <div className='flex'>
            </div>

        </div>
    )
}