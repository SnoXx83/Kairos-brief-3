export default interface Hour {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export default interface HourCardProps {
  city: string;
}