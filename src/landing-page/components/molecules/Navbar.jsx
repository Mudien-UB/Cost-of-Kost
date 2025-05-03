import React from 'react';
import { NavLink } from 'react-router';

export default function Navbar({ isOpen, onLinkClick }) {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:flex md:space-x-6 font-bold text-lg md:text-center text-left`}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={onLinkClick}
          className={({ isActive }) =>
          {
            return `text-blue-900/50 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors duration-200 
            ${ isActive ? 'bg-blue-50 text-blue-900' : ''}
            ${isOpen ? 'block' : 'hidden'} md:block`
          }
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
