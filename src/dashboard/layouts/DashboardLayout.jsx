import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import SideBar from '../components/organisms/SideBar';

export default function DashboardLayout({ children ,className}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <SideBar toggleSidebar={toggleSidebar} />
        
          <main
            className={`transition-all duration-300 flex-1 ${isSidebarOpen ? 'pl-64' : 'pl-16'} px-4 py-6 ${className}`}
          >
            {children}
          </main>
      </div>
          <Footer />
        
    </div>
  );
}
