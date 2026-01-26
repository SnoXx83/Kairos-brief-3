export default interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

