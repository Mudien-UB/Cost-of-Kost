import React from 'react';
import { BiBell,BiUserCircle } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';
import { useNavigate } from 'react-router';

export default function Header() {

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/dashboard');
  }
  const handleUserClick = () => {
    console.log('user icon clicked')
    alert(`The user authenticated is ${user.name}`);
    // navigate('/profile');
  }
  
  const user = {
    name: 'Muhammad Fulan',
  }
  

  return (
    <header className="w-full h-16 px-6 py-4 flex items-center justify-between bg-blue-200 shadow-md fixed top-0 left-0 z-20">
      <h1 className="text-2xl font-bold text-blue-900/50 cursor-default" onClick={handleLogoClick}>{user.name}</h1>
      <div className="flex gap-10 px-10 items-center">
        <CgDarkMode className='text-3xl text-blue-900/50 cursor-pointer' />
        <BiBell className="text-3xl text-blue-900/50 cursor-pointer" 
          onClick={handleUserClick}
        />
        <BiUserCircle className="text-3xl text-blue-900/50 cursor-pointer"
          onClick={handleUserClick}
        />
      </div>
    </header>
  );  
}
