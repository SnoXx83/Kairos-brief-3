import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router"
import About from './pages/About.tsx'
import Page404 from './pages/Page404.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* routes du navigateur */}
    <BrowserRouter>
      <Routes>
        {/* path = url ou trouver la page */}
        {/* element={<Home />} va chercher le composant  */}
        <Route path="/" element={<App />} />
        <Route path="/eva" element={<About />} />
        <Route path="*" element={<Page404 />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
