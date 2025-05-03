import React from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

export default function LandingPageLayout({ children, className = '' }) {
  return (
    <div className="w-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className={`flex-1 w-full min-h-screen px-4 py-6 pt-28 bg-blue-50 text-blue-600 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
