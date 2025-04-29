import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import CardContainer from '../components/molecules/CardContainer';

export default function FinanceManagementPage() {
  const [dailyExpense, setDailyExpense] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);
  const [savingPercentage, setSavingPercentage] = useState(0);
  const [financeHealthScore, setFinanceHealthScore] = useState(0.0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dummyData = {
    dailyExpenses: 35000,
    monthlyExpenses: 2500000,
    monthlyIncome: 5000000,
    totalSavingMonthly: 12000000,
  };

  const fetchData = () => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const simulateError = false;
      if (simulateError) {
        setError('Gagal mengambil data keuangan.');
        setIsLoading(false);
      } else {
        setDailyExpense(dummyData.dailyExpenses);
        setMonthlyExpenses(dummyData.monthlyExpenses);
        setMonthlyIncome(dummyData.monthlyIncome);
        setTotalSaving(dummyData.totalSavingMonthly);
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <DashboardLayout className="flex flex-col justify-start pt-16 min-h-screen">
      <div className="w-11/12 mx-auto mt-10">

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CardContainer title="Pengeluaran Hari Ini">
            {isLoading ? (
              <p className="text-center text-blue-600 text-xl">Memuat data...</p>
            ) : error ? (
              <p className="text-center text-red-600 text-xl">{error}</p>
            ) : (
              <h1 className="text-4xl font-bold text-blue-800">
                Rp. {dailyExpense.toLocaleString('id-ID')}
              </h1>
            )}
          </CardContainer>
          <CardContainer title="Total Pemasukan Bulan Ini">
            {isLoading ? (
              <p className="text-center text-blue-600 text-xl">Memuat data...</p>
            ) : error ? (
              <p className="text-center text-red-600 text-xl">{error}</p>
            ) : (
              <h1 className="text-4xl font-bold text-blue-800">
                Rp. {monthlyIncome.toLocaleString('id-ID')}
              </h1>
            )}
          </CardContainer>
          <CardContainer title="Persentase Hemat">
            {isLoading ? (
              <p className="text-center text-blue-600 text-xl">Memuat data...</p>
            ) : error ? (
              <p className="text-center text-red-600 text-xl">{error}</p>
            ) : (
              <h1 className="text-4xl font-bold text-blue-800">
                {savingPercentage.toFixed(2)}%
              </h1>
            )}
          </CardContainer>
          <CardContainer title="Nilai Finansial">
            {isLoading ? (
              <p className="text-center text-blue-600 text-xl">Memuat data...</p>
            ) : error ? (
              <p className="text-center text-red-600 text-xl">{error}</p>
            ) : (
              <h1 className="text-4xl font-bold text-blue-800">
                {financeHealthScore.toFixed(1)}/10
              </h1>
            )}
          </CardContainer>
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

      </div>
    </DashboardLayout>
  );
}
