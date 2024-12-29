import React, { useState } from 'react';
import logo from "../assets/Logo.svg";

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="p-4" style={{ backgroundColor: '#EFBF04', color: '#000', fontFamily: 'Lora', fontWeight: 400 }}>
            <div className="flex items-center justify-between container">
                <div className="flex items-center">
                    <img src={logo} alt="Hopepepe logo" />
                </div>
                <div className="hidden lg:flex space-x-4">
                    <a href="#about" className="text-xl hover:text-yellow-500 hover:underline">About LMAG</a>
                    <a href="#investing" className="text-xl hover:text-yellow-500 hover:underline">Start Investing</a>
                    <a href="#collection" className="text-xl hover:text-yellow-500 hover:underline">LMAG Art</a>
                    <a href="#roadmap" className="text-xl hover:text-yellow-500 hover:underline">LMAG Roadmap</a>
                </div>
                <div className="hidden lg:flex space-x-2">
                    <button
                        className="allbtn text-white font-bold py-2 px-4 rounded-full"
                        style={{ backgroundColor: '#121212' }}
                    >
                        Buy LMAG
                    </button>
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
                        {menuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="lg:hidden mt-4 space-y-2">
                    <a href="#about" className="block text-xl hover:text-yellow-500 hover:underline">About LMAG</a>
                    <a href="#investing" className="block text-xl hover:text-yellow-500 hover:underline">Start Investing</a>
                    <a href="#collection" className="block text-xl hover:text-yellow-500 hover:underline">LMAG Art</a>
                    <a href="#roadmap" className="block text-xl hover:text-yellow-500 hover:underline">LMAG Roadmap</a>
                    <button
                        className="block w-full allbtn text-white font-bold py-2 px-4 rounded-full mt-2"
                        style={{ backgroundColor: '#121212' }}
                    >
                        <a href="#roadmap" >Buy LMAG</a>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Nav;
