import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

export default function ExpensesReminderPage() {
  return (
    <DashboardLayout className={`pt-16 min-h-screen`}>
            <section className='flex flex-1 justify-center items-center'>
                    <div className='bg-white shadow-md rounded-lg text-center p-6 max-w-md w-full'>
                        <h1 className="text-2xl text-blue-600 font-bold mb-4">Welcome to the Expenses Reminder Page </h1>
                        <p className="text-gray-700">Ini adalah halaman setting pengingat pengeluaran rutin anda</p>
                    </div>
            </section>
        </DashboardLayout>
  )
}
