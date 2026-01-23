import React from 'react'
import logo from "../assets/Kairos.png" 

export default function Nav() {
  return (
    <div className="navbar px-10 flex justify-around items-center  bg-base-100 shadow-sm  max-sm:flex-col">
      <div className="flex items-center py-4">
        <a className="btn h-25  btn-ghost text-xl">
          <img className="h-25 w-auto object-contain" src={logo} alt="logo de Kairos" />
        </a>
        
      </div>
      <div className="flex gap-10 items-center">
        <a className="hover:text-primary cursor-pointer">Accueil</a>
        <input type="text" placeholder="Search" className="input px-2 input-bordered w-full max-w-xs"/>
      </div>
    </div>
  )
}
