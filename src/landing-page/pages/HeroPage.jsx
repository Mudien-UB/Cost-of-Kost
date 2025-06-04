import React from 'react';
import LandingPageLayout from '../layouts/LandingPageLayout';
import { useNavigate } from 'react-router';

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <LandingPageLayout className="flex items-center justify-center bg-blue-50">
      <div className="w-11/12 mx-auto px-10 py-12 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 leading-tight">
            Selamat Datang di <span className="text-blue-500">Cost of Kost: EduSims App</span>
          </h1>
          <p className="text-lg text-blue-900/50 font-medium leading-relaxed max-w-xl">
            EduSims adalah aplikasi berbasis web yang dirancang untuk membantu mahasiswa dalam
            merencanakan pengeluaran bulanan secara edukatif, interaktif, dan menyenangkan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <button
              onClick={() => navigate('/auth/register')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:brightness-110 transition duration-300"
            >
              Mulai Sekarang
            </button>
            <button
              onClick={() => navigate('/auth/login')}
              className="bg-white text-blue-600 border border-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300"
            >
              Masuk
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute -z-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40 top-0"></div>
          <img
            src="/images/logo.png"
            alt="Hero"
            className="w-48 md:w-64 rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </LandingPageLayout>
  );
}
