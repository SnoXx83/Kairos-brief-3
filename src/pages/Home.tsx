import Nav from '../components/Nav'
import Hero from '../components/Hero'
import DailyCard from '../components/DailyCard'
import HourCard from '../components/HourCard'
import DetailsHour from '../components/DetailsHour'



export default function Home() {
  return (
    <div>
      <Nav />
      <Hero/>
      <DailyCard />
      <HourCard city='Paris' />
      <DetailsHour city='Paris' />
    </div>
  )
}
