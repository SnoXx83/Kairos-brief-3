import { useEffect, useState } from 'react';
import sunIcon from '../assets/sunIcon.png';
import type { Hero } from '../types/hero';

export default function Hero() {
    const [data, setData] = useState<Hero>();

    useEffect(() => {
        const featchWeather = async () => {
            try {
                const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=3330ee5459ce772712bec299bd93223e")
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

    console.log(data);

    return (
        <div className="hero bg-sky-500 h- md:h-90  rounded-2xl">
            <div className="hero-content max-w-none w-full max-sm:flex-col justify-around text-white">

                <div>
                    <img
                        src={sunIcon}
                        className="max-w-50"
                    />
                    <h2 className=" text-4xl font-bold">
                        {data?.wind.deg}°C
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