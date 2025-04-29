import React from 'react';
import { BiUserCircle } from 'react-icons/bi';

export default function Header() {
  
  const user = {
    name: 'Muhammad Fulan',
  }
  
  const handleClick = () => {
    console.log('user icon clicked')
    alert(`The user authenticated is ${user.name}`);
  }

  return (
    <header className="w-full h-16 px-6 py-4 flex items-center justify-between bg-blue-200 shadow-md fixed top-0 left-0 z-20">
      <h1 className="text-2xl font-bold text-blue-900/50">{user.name}</h1>
      <div className="flex gap-10 items-center">
        <BiUserCircle className="text-3xl text-blue-900/50 cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </header>
  );  
}
