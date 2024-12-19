import React, { useState } from 'react'
import logo from "../assets/logo.jpeg"
function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="p-4 bg-black text-white ">
    <div className="flex items-center justify-between container">
        <div className="flex items-center">
            <img src={logo} alt="Hopepepe logo" className="h-12 w-12 rounded-2" />
            <span className="ml-2 text-3xl font-bold text_shadow">LMAG</span>
        </div>
        <div className="hidden lg:flex space-x-4">
            <a href="#" className="text-xl hover:text-yellow-500 hover:underline">Tokenomics</a>
            <a href="#" className="text-xl hover:text-yellow-500 hover:underline">RoadMap</a>
            <a href="#" className="text-xl hover:text-yellow-500 hover:underline">How To Buy</a>
            <a href="#" className="text-xl hover:text-yellow-500 hover:underline">Partners</a>
            <a href="#" className="text-xl hover:text-yellow-500 hover:underline">WhitePaper</a>
        </div>
        <div className="hidden lg:flex space-x-2">
            <button className="allbtn text-white font-bold py-2 px-4 rounded-full">Buy LMAG</button>
        </div>
        <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                {menuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
        </div>
    </div>
    {menuOpen && (
        <div className="lg:hidden mt-4 space-y-2">
            <a href="#" className="block text-xl hover:text-yellow-500 hover:underline">Tokenomics</a>
            <a href="#" className="block text-xl hover:text-yellow-500 hover:underline">RoadMap</a>
            <a href="#" className="block text-xl hover:text-yellow-500 hover:underline">How To Buy</a>
            <a href="#" className="block text-xl hover:text-yellow-500 hover:underline">Partners</a>
            <a href="#" className="block text-xl hover:text-yellow-500 hover:underline">WhitePaper</a>
            <button className="block w-full allbtn text-white font-bold py-2 px-4 rounded-full mt-2">Buy LMAG</button>
        </div>
    )}
</div>
  )
}

export default Nav