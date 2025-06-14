import React from 'react';
import { BiBell, BiUserCircle } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';
import { LuLogOut } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../authentication/hooks/useAuth';
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const user = useSelector((state) => state.Auth?.user) || {};

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleUserClick = () => {
    alert(`Pengguna saat ini: ${user?.username || "Tidak diketahui"}`);
  };

  const handleLogOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="w-full h-16 px-6 py-4 flex items-center justify-between bg-blue-200 shadow-md fixed top-0 left-0 z-20">
      <h1 
        className="text-2xl font-bold text-blue-900/50 cursor-pointer" 
        onClick={handleLogoClick}
      >
        {user?.username || "Pengguna"}
      </h1>
      <div className="flex gap-6 items-center">
        <CgDarkMode className="text-3xl text-blue-900/50 cursor-pointer" />
        <BiBell className="text-3xl text-blue-900/50 cursor-pointer" onClick={handleUserClick} />
        <BiUserCircle className="text-3xl text-blue-900/50 cursor-pointer" onClick={handleUserClick} />
        <LuLogOut className="text-3xl text-red-700/60 cursor-pointer" onClick={handleLogOut} />
      </div>
    </header>
  );
}
