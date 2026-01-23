import Nav from '../components/Nav'
import Hero from '../components/Hero'
import DailyCard from '../components/DailyCard'
import HourCard from '../components/HourCard'


export default function Home() {
  return (
    <div>
      <Nav />
      <Hero/>
      <DailyCard />
      <HourCard city='Paris' />
    </div>
  )
}
