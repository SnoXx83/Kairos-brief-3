import React from 'react'
import Nav from '../components/Nav'
import HourCard from '../components/HourCard'


export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900"> Kairos </h1>
      <Nav />
      <HourCard />
    </div>
  )
}
