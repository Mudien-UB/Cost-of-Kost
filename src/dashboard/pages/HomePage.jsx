import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

export default function HomePage() {
  return (
    <DashboardLayout className="flex flex-col items-center justify-center bg-blue-50">
        <div className='bg-whites self-end bg-white shadow-md rounded-lg p-6 max-w-2xl'>
          <h1 className="text-2xl font-bold text-blue-800">Welcome to the Dashboard</h1>
          <p className="mt-4 text-gray-600">This is your home page content.</p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl h-screen'>
          <h1 className="text-2xl font-bold text-blue-800">Welcome to the Dashboard</h1>
          <p className="mt-4 text-gray-600">This is your home page content.</p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl h-screen'>
          <h1 className="text-2xl font-bold text-blue-800">Welcome to the Dashboard</h1>
          <p className="mt-4 text-gray-600">This is your home page content.</p>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl h-screen'>
          <h1 className="text-2xl font-bold text-blue-800">Welcome to the Dashboard</h1>
          <p className="mt-4 text-gray-600">This is your home page content.</p>
        </div>
    </DashboardLayout>
  )
}
