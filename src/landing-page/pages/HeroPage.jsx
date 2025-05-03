import React from 'react';
import LandingPageLayout from '../layouts/LandingPageLayout';
import { useNavigate } from 'react-router';

export default function HeroPage() {

  const navigate = useNavigate();

  return (
    <LandingPageLayout className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full">

        <main className="w-full sm:w-1/2 bg-white/80 backdrop-blur-md shadow-xl rounded-xl text-center px-8 py-12 z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-800">
            Selamat Datang di EduSims
          </h1>

          <p className="text-md sm:text-lg text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed">
            EduSims adalah aplikasi berbasis web yang dirancang untuk membantu mahasiswa
            dalam merencanakan pengeluaran bulanan secara edukatif, interaktif, dan menyenangkan.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:brightness-110 transition duration-300"
            >
              Mulai Sekarang
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 border border-blue-500 px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition duration-300"
            >
              Login
            </button>
          </div>
        </main>
      </div>
    </LandingPageLayout>
  );
}
