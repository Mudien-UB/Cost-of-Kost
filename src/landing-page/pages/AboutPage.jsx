import React from 'react'
import LandingPageLayout from '../layouts/LandingPageLayout'

export default function AboutPage() {
  return (
    <LandingPageLayout className="bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen">
      <main className="w-11/12 max-w-5xl mx-auto flex flex-col items-center pt-16">

        <div className="flex flex-col items-center gap-6 text-center">
          <img 
            src="/images/logo.png" 
            alt="EduSims Logo" 
            className="w-32 sm:w-40 md:w-48 aspect-square rounded-2xl shadow-xl transition-transform duration-300 hover:scale-110" 
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 tracking-tight">
            Cost of Kost: EduSims
          </h1>
          <p className="text-blue-600 text-base sm:text-lg font-medium">
            Simulasi keuangan kost yang edukatif & menyenangkan
          </p>
        </div>

        <section className="mt-16 w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4">Apa itu EduSims?</h3>
          <p className="text-gray-700 text-justify text-base sm:text-lg leading-relaxed indent-8">
            <strong>EduSims</strong> adalah aplikasi web edukatif yang membantumu memproyeksikan pengeluaran kost dengan cerdas dan menyenangkan.
            Cocok untuk pelajar, mahasiswa, hingga pekerja yang ingin merencanakan tempat tinggal dengan sistematis.
          </p>
        </section>

        <section className="mt-12 w-full">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4">Latar Belakang</h3>
          <p className="text-gray-700 text-justify text-base sm:text-lg leading-relaxed indent-8">
            Banyak mahasiswa mengalami krisis keuangan karena minimnya literasi finansial. Mereka kerap kehabisan uang sebelum akhir bulan.
            Aplikasi lain terasa terlalu kaku dan menekan. <strong>EduSims</strong> hadir sebagai aplikasi yang ringan, nyaman, dan edukatif untuk membantu pencatatan serta simulasi keuangan kost tanpa tekanan angka saldo.
          </p>
        </section>
      </main>
    </LandingPageLayout>
  )
}
