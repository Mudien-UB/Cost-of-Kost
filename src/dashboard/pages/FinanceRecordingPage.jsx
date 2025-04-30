import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FormExpence from '../components/molecules/FormExpence';
import FormIncome from '../components/molecules/FormIncome';

export default function FinanceRecordingPage() {
  
  const [isExpense, setIsExpense] = useState(true);

  return (
    <DashboardLayout className="min-h-screen">
      <section className='w-full mt-16 flex flex-1 justify-center items-center'>

        {isExpense ? (
          <section className='w-full h-full flex flex-col gap-10 items-center'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm' onClick={() => setIsExpense(false)}>Add Income</button>
            <FormExpence /> 
          </section>
            ): (
              <section className='w-full h-full flex flex-col gap-10 items-center'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm' onClick={() => setIsExpense(true)}>Add Expenses</button>
                <FormIncome />
              </section>
            )}
      </section>
    </DashboardLayout>
  );
}
