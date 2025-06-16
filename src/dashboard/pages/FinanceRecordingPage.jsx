import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FormExpence from '../components/organisms/FormExpence';
import FormIncome from '../components/organisms/FormIncome';
import { PiNotePencilFill } from 'react-icons/pi';

export default function FinanceRecordingPage() {
  const [isExpense, setIsExpense] = useState(true);

  const handleToggle = () => {
    setIsExpense((prev) => !prev);
  };

  const buttonText = isExpense ? 'Catat Pemasukan' : 'Catat Pengeluaran';
  const FormComponent = isExpense ? <FormExpence /> : <FormIncome />;

  return (
    <DashboardLayout className="min-h-screen text-black">
      <section className="w-full mt-16 flex flex-1 justify-center items-center px-4">
        <section className="w-full h-full flex flex-col gap-10 items-center">
          <button
            className="flex flex-row-reverse items-center gap-2 bg-blue-800 font-bold hover:opacity-90 text-white px-4 py-2 rounded text-sm transition-all duration-200"
            onClick={handleToggle}
          >
            {buttonText} <PiNotePencilFill className="text-base" />
          </button>

          {FormComponent}
        </section>
      </section>
    </DashboardLayout>
  );
}
