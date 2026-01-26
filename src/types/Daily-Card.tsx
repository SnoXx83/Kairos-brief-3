export default interface dailyCard {
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