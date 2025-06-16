import React from 'react'
import LandingPageLayout from '../layouts/LandingPageLayout'
import FormContact from '../components/molecules/FormContact'
import { BsFacebook, BsInstagram } from 'react-icons/bs'

export default function ContactPage() {
  return (
    <LandingPageLayout className="bg-blue-50">
      <main className="w-11/12 h-[calc(100vh-200px)] mx-auto flex flex-col md:flex-row items-center justify-center text-center">
        <div className="w-full md:w-1/2 flex flex-col items-center mb-8">
          <h3 className="text-3xl font-bold text-blue-700 mb-2">Hubungi Kami</h3>
          <div className="w-16 h-1 bg-blue-700 mx-auto mb-6 transition-all duration-300 hover:w-24" />

          <div className="w-1/2 flex justify-center gap-6 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Kunjungi Instagram kami"
              aria-label="Instagram"
              className="flex flex-col items-center text-blue-700 hover:text-blue-800 transition"
            >
              <BsInstagram className="text-3xl mb-1" />
              <span className="font-medium text-lg">Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Kunjungi Facebook kami"
              aria-label="Facebook"
              className="flex flex-col items-center text-blue-700 hover:text-blue-800 transition"
            >
              <BsFacebook className="text-3xl mb-1" />
              <span className="font-medium text-lg">Facebook</span>
            </a>
          </div>
          <p className="text-blue-900/50 font-medium sm:text-lg">
            Kami sangat menghargai masukan dan saran dari Anda. Jika Anda memiliki pertanyaan, komentar, atau ingin berdiskusi lebih lanjut, jangan ragu untuk menghubungi kami melalui form yang tersedia
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col md:justify-between items-center gap-10 text-center md:text-left">
          
          <FormContact />
        </div>
      </main>
    </LandingPageLayout>
  )
}
