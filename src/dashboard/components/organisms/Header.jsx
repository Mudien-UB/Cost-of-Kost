import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';
import { MdSettings } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../authentication/hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = useSelector((state) => state.Auth?.user) || {};

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleUserClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/profile/settings');
  };

  const handleLogOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 z-20 w-full h-16 px-6 py-4 flex items-center justify-between bg-blue-200 shadow-md">
      <h1
        title='cost of kost'
        className="text-2xl font-bold text-blue-900/50 cursor-pointer"
        onClick={handleLogoClick}
      >
        Cost of Kost: EduSims App
      </h1>

      <div className="flex items-center gap-6">
        <MdSettings
          className="text-3xl text-blue-900/50 cursor-pointer"
          onClick={handleSettingsClick}
          title="Pengaturan"
        />

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleUserClick}
          title={user?.username}
        >
          <BiUserCircle className="text-3xl text-blue-900/50 "/>
          <h4 className="text-blue-900/80 font-medium">
            {user?.username}
          </h4>
        </div>


        <LuLogOut
          className="text-3xl text-red-700/60 cursor-pointer"
          onClick={handleLogOut}
          title="Keluar"
        />
      </div>
    </header>
  );
}
