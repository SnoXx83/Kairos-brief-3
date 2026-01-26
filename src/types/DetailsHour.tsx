export default interface Hour {
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

export default interface DetailsHourProps {
  city: string;
}