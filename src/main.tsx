import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* routes du navigateur */}
    <BrowserRouter>
      <Routes>
        {/* path = url ou trouver la page */}
        {/* element={<Home />} va chercher le composant  */}
        <Route path="/" element={<Home />} />
        <Route path="/eva" element={<About />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
