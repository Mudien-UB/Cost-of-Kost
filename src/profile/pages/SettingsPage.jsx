import React from 'react'
import { FaLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router'

export default function SettingsPage() {

  const navigate = useNavigate();

  const handleClick = (type) => {
    switch (type) {
      case 'profile':
        navigate('/profile/')
        break
      case 'terms':
        alert('Open Terms of Service')
        break
      case 'privacy':
        alert('Open Privacy Policy')
        break
      default:
        alert('Unknown action')
    }
  }

  const settings = [
    { label: 'Profile', type: 'profile' },
    { label: 'Terms of Service', type: 'terms' },
    { label: 'Privacy Policy', type: 'privacy' },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-blue-100">
        <button 
                className='text-blue-50 px-4 py-2 m-5 rounded-lg bg-blue-900/80 transition'
                onClick={() => window.history.back()}
              >
                <FaLeftLong className='text-xl' />
              </button>
        <h1 className="text-2xl font-bold text-blue-900 px-6 py-2 border-b border-blue-100">
          Settings
        </h1>
        <ul className="divide-y divide-blue-100">
          {settings.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item.type)}
              className="p-5 cursor-pointer hover:bg-blue-50 transition flex justify-between items-center"
            >
              <span className="text-blue-900">{item.label}</span>
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </li>
          ))}
          <li
          className="p-5 cursor-pointer hover:bg-blue-50 transition flex justify-between items-center"
          >
            <span className="text-blue-900">Versi</span>
            <p className="text-blue-800/50 font-medium">V1.1.1</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
