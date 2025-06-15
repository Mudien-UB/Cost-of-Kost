import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import TransactionHistories from '../components/organisms/TransactionHistories';
import SummarizeFinance from '../components/organisms/SummarizeFinance';
import useFinance from '../hooks/useFinance';

const dummyData = {
  monthlyExpenses: 2500000,
  monthlyIncome: 5000000,
  totalSavingMonthly: 12000000,
};

export default function FinanceManagementPage() {
  const [error, setError] = useState(null);
  const [listExpenses, setListExpenses] = useState([]);
  
  const {
    loading,
    errorMessage,
    resetStatus,
    getListExpense
  } = useFinance();

  useEffect(() => {
    const getExpense = async () => {
      
      try {
        const resData = await getListExpense({
        from: new Date().toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
      });
        if (resData) {
          setListExpenses(resData);
        }
      } catch (err) {
        setError(errorMessage);
      }finally{
        resetStatus();
      }
    };

    getExpense();
    console.log(listExpenses)
  }, []);

  // contoh hitung data untuk summary
  const totalDailyExpense = dummyData.monthlyExpenses / 30;
  const savingPercentage = ((dummyData.monthlyIncome - dummyData.monthlyExpenses) / dummyData.monthlyIncome) * 100;
  const financeHealthScore = Math.min(100, (dummyData.totalSavingMonthly / dummyData.monthlyIncome) * 10);

  return (
    <DashboardLayout className="pt-16 min-h-screen">
      <div className="w-11/12 flex flex-col gap-6 mx-auto mt-10">

        <section className="w-full">
          <SummarizeFinance
            isLoading={loading}
            error={error}
            dailyExpense={totalDailyExpense}
            monthlyIncome={dummyData.monthlyIncome}
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
          <TransactionHistories data={listExpenses} title="Pengeluaran hari ini" />
        </section>

      </div>
    </DashboardLayout>
  );
}
