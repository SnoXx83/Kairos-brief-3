import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router"
import About from './pages/About.tsx'
import Page404 from './pages/Page404.tsx'
import WeatherDetails from './components/WeatherDetails.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* routes du navigateur */}
    <BrowserRouter>
    {/* Layout */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/weather/:cityName" element={<WeatherDetails />} />
      </Routes>
      {/* </ Layout> */}
    </BrowserRouter>
  </StrictMode>
)
