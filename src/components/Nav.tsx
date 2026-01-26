import { useState } from "react";
import logo from "../assets/Kairos.png" 
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Nav() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city}`);
      setCity("");
    }
  };

  return (
    <div className="navbar px- flex justify-between items-center bg-base-100  max-sm:flex-col">
      <div className="flex items-center py-4">
        <Link to="/" className=" btn-ghost text-xl">
          <img className="h-35 w-auto object-contain" src={logo} alt="logo de Kairos"/>
        </Link>
      </div>

      <div className="flex gap-10 items-center">
        <Link to="/" className="hover:bg-sky-700 cursor-pointer text-white font-bold rounded-2xl bg-sky-900 px-7 py-3">Accueil</Link>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Rechercher une ville..." 
            className="input px-3 py-5 text-xl input-bordered w-full max-w-xs bg-sky-200 border-sky-700 focus:outline-none focus:border-blue-900 border-3 rounded-xl"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}
