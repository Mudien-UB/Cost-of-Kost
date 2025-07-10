import React from 'react';
import Navigation from '../molecules/Navigation';
import { NavLink } from 'react-router';
import { MdHelpOutline, MdOutlineReportProblem, MdSettings } from 'react-icons/md';
import { BsMenuAppFill } from 'react-icons/bs';
import { BiMenuAltLeft } from 'react-icons/bi';
import { LuPanelLeftClose, LuPanelRightClose, LuPanelTopClose } from 'react-icons/lu';

export default function SideBar({ toggleSidebar }) {


  const [isOpen, setIsOpen] = React.useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  const dashboardRoutes = [
    { route: '/recording', name: 'Pencatatan Keuangan' },
    { route: '/finance-management', name: 'Manajemen Keuangan' },
    { route: '/finance-history', name: 'Histori Keuangan' },
    { route: '/analytics', name: 'Analisis Keuangan' },
  ]

  const baseRoutes = [
    {
      route: '/dashboard/report',
      name: 'Report',
      icon: <MdOutlineReportProblem className="text-2xl" />
    }
  ]

  return (
    <aside
      className={`bg-blue-950 text-white shadow-md transition-all duration-300 relative ${isOpen ? 'w-64' : 'w-16'
        } min-h-screen z-10`}
    >

      <nav className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex items-center justify-end p-4 transition-all duration-500 ease-in-out transform">
          <h1 className={`text-2xl font-bold justify-self-start mr-5 ${isOpen ? 'block' : 'hidden'}`}>Dashboard</h1>
          <button
            onClick={handleToggleSidebar}
            className={`p-2 rounded-lg hover:bg-blue-700 transition-all transform ease-in-out duration-1000`}
          >
            {isOpen ? <LuPanelLeftClose className="text-2xl " /> : <BiMenuAltLeft className="text-2xl self-start" />}
          </button>
        </div>

        <div className='h-full flex flex-col justify-between'>

          <Navigation isOpen={isOpen} routes={dashboardRoutes} />

          {isOpen && (
            <div className='flex my-5'>
              <p className="text-blue-200/50 text-sm text-center font-medium">© 2023 Your Company. All rights reserved.</p>
          </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
