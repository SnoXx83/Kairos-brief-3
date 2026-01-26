export default interface DetailDailyWeather {
  dt: number;
  dt_txt: string;
  weather: { icon: string; description: string }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number };
  visibility: number;
}

export default interface DetailDailyCardProps {
  city: string;
}