import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Navbar from '../molecules/Navbar';
import { useNavigate } from 'react-router';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navigate = useNavigate();

  return (
    <header className="w-full bg-blue-200 px-4 py-6 shadow-md fixed top-0 z-50">
      <div className="w-full md:w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-900/50 cursor-default">
            Cost of Kost : EduSims
          </h1>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FiX size={28} className='text-blue-900/60  ' /> : <FiMenu size={28} className='text-blue-900/60  ' />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Navbar isOpen={true} onLinkClick={closeMenu} />
          <div className="flex items-center space-x-4 font-bold text-lg">
            
            <button onClick={() => navigate('/auth/register')} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Daftar
            </button>
            <button onClick={() => navigate('/auth/login')} className="text-blue-900/50 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors duration-200">
              Masuk
            </button> 
          </div>
        </div>
      </div>

      <div className="md:hidden mt-4">
        <Navbar isOpen={menuOpen} onLinkClick={closeMenu} />
        {menuOpen && (
          <div className="flex flex-col items-center space-y-2 mt-2 font-bold text-lg">
            
            <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full text-center">
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className="text-blue-900/50 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors duration-200 w-full text-center">
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
