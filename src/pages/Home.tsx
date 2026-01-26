import Nav from '../components/Nav'
import Hero from '../components/Hero'
import DailyCard from '../components/DailyCard'
import HourCard from '../components/HourCard'
import { useState } from "react"
import Footer from '../components/Footer'



export default function Home() {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');

  return (
    <div className="min-h-screen all ">
      <Nav />
      <Hero />
      <main className="max-w-7xl mx-auto py-8">
        <div className="flex justify-start mb-10">
          <div className="flex bg-sky-100/50 p-1.5 rounded-full shadow-inner border border-sky-200">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-8 py-3 font-black transition-all duration-500 rounded-full text-sm uppercase tracking-widest cursor-pointer ${
                activeTab === 'daily' 
                ? 'bg-sky-900 text-white shadow-lg shadow-sky-900 scale-105' 
                : 'text-sky-800 hover:text-sky-900'
              }`}
            >
              Par Jour
            </button>
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-8 py-3 font-black transition-all duration-500 rounded-full text-sm uppercase tracking-widest cursor-pointer ${
                activeTab === 'hourly' 
                ? 'bg-sky-900 text-white shadow-lg shadow-sky-900 scale-105' 
                : 'text-sky-800 hover:text-sky-900'
              }`}
            >
              Toutes les 3 heures
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden min-h-150">
          <div 
            className={`transition-all duration-700 ease-in-out ${
              activeTab === 'daily' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12 absolute top-0 left-0 w-full pointer-events-none'
            }`}
          >
            <DailyCard />
          </div>

          <div 
            className={`transition-all duration-700 ease-in-out ${
              activeTab === 'hourly' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-12 absolute top-0 left-0 w-full pointer-events-none'
            }`}
          >
            <HourCard city="Angoulême" />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}