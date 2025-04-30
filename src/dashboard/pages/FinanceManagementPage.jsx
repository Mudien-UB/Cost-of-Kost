import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import CardContainer from '../components/molecules/CardContainer';
import TransactionHistories from '../components/organisms/TransactionHistories';
import SummarizeFinance from '../components/organisms/SummarizeFinance';

const initialDailyData = [
  { id: 1, date: '2023-10-01 10:10', title: 'Ngopi', amount: 10000, category: 'Jajan' },
  { id: 2, date: '2023-10-01 10:10', title: 'Sarapan', amount: 30000, category: 'Makan' },
  { id: 3, date: '2023-10-01 10:10', title: 'Bensin', amount: 150000, category: 'Transportasi' },
  { id: 4, date: '2023-10-01 10:10', title: 'Tolak Angin', amount: 10000, category: 'Kesehatan' },
  { id: 5, date: '2023-10-01 10:10', title: 'Alat Mandi', amount: 25000, category: 'Belanja' },
  { id: 6, date: '2023-10-01 10:10', title: 'Sabun Cuci', amount: 15000, category: 'Belanja' },
  { id: 7, date: '2023-10-01 10:10', title: 'Makan Siang', amount: 50000, category: 'Makan' },
  { id: 8, date: '2023-10-01 10:10', title: 'Ngemil', amount: 10000, category: 'Jajan' },
  { id: 9, date: '2023-10-01 10:10', title: 'Minum', amount: 5000, category: 'Jajan' },
  { id: 10, date: '2023-10-01 10:10', title: 'Gorengan', amount: 5000, category: 'Jajan' },
];

const dummyData = {
  monthlyExpenses: 2500000,
  monthlyIncome: 5000000,
  totalSavingMonthly: 12000000,
};

export default function FinanceManagementPage() {
  const [dailyData, setDailyData] = useState(initialDailyData);
  const [dailyExpense, setDailyExpense] = useState(0);  
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [savingPercentage, setSavingPercentage] = useState(0);
  const [financeHealthScore, setFinanceHealthScore] = useState(0.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const simulateError = false;
      if (simulateError) {
        setError('Gagal mengambil data keuangan.');
        setIsLoading(false);
      } else {
        const updatedDailyExpense = dailyData.reduce((total, item) => total + item.amount, 0);
        setDailyExpense(updatedDailyExpense);
        setMonthlyExpenses(dummyData.monthlyExpenses + updatedDailyExpense);
        setMonthlyIncome(dummyData.monthlyIncome);
        setTotalSaving(dummyData.totalSavingMonthly);
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [dailyData]);

  useEffect(() => {
    if (monthlyIncome > 0 && monthlyExpenses >= 0) {
      const savingRatio = totalSaving / monthlyIncome;
      const surplusRatio = (monthlyIncome - monthlyExpenses) / monthlyIncome;
      const savingPercent = surplusRatio * 100;
      setSavingPercentage(savingPercent);

      const averageRatio = (savingRatio + surplusRatio) / 2;
      const normalizedScore = (averageRatio / 2) * 10;
      const finalScore = Math.max(1, Math.min(normalizedScore, 10));
      setFinanceHealthScore(finalScore);
    }
  }, [monthlyIncome, monthlyExpenses, totalSaving]);

  return (
    <DashboardLayout className="pt-16 min-h-screen">
      <div className="w-11/12 flex flex-col gap-6 mx-auto mt-10">

        <section className="w-full">
          <SummarizeFinance
            isLoading={isLoading}
            error={error}
            dailyExpense={dailyExpense}
            monthlyIncome={monthlyIncome}
            savingPercentage={savingPercentage}
            financeHealthScore={financeHealthScore}
            />
        </section>

        <section className='w-full'>
          <div className='bg-white shadow-md rounded-lg p-6 mt-10'>
            <h2 className="text-xl font-bold text-blue-900 my-5 text-center">
              Versi terbaik dari dirimu sedang kamu bangun hari ini.
            </h2>
            <p className="text-md font-medium text-blue-900/60 px-10 leading-relaxed">
              Kamu mungkin belum sampai tujuan, tapi kamu sudah jauh dari titik awal. Kamu sedang belajar mengatur hidup dan keuangan—dan itu adalah sebuah pencapaian. Setiap langkah kecil yang kamu ambil hari ini akan membawa perubahan besar di masa depan.
              <br /><br />
              Teruslah konsisten, karena kedisiplinan hari ini adalah kebebasan esok hari.
            </p>
          </div>
        </section>

        <section className='w-full'>
          <TransactionHistories data={dailyData} />
        </section>

      </div>
    </DashboardLayout>
  );
}
