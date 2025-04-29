import React from 'react';

export default function Footer() {
  return (
    <footer className="px-6 py-4 bg-blue-100 shadow-inner mt-auto z-20 relative">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-sm">© 2023 Your Company. All rights reserved.</p>
        <nav className="flex space-x-4">
          <a href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}
