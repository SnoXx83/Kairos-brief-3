import Nav from '../components/Nav'
import Hero from '../components/Hero'
import DailyCard from '../components/DailyCard'
import HourCard from '../components/HourCard'
import { useState } from "react";


export default function Home() {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <Hero />

      <main className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex justify-start mb-10">
          <div className="flex bg-sky-100/50 p-1.5 rounded-full shadow-inner border border-sky-200">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-8 py-3 font-black transition-all duration-500 rounded-full text-sm uppercase tracking-widest ${
                activeTab === 'daily' 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 scale-105' 
                : 'text-sky-400 hover:text-sky-600'
              }`}
            >
              Par Jour
            </button>
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-8 py-3 font-black transition-all duration-500 rounded-full text-sm uppercase tracking-widest ${
                activeTab === 'hourly' 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 scale-105' 
                : 'text-sky-400 hover:text-sky-600'
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
    </div>
  );
}