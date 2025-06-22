import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import SummarizeFinance from '../components/organisms/SummarizeFinance';
import useFinance from '../hooks/useFinance';
import { useNavigate } from 'react-router';
import ListContainer from '../components/molecules/ListContainer';
import { BiChevronsRight } from 'react-icons/bi';
import useAnalytics from '../hooks/useAnalytics';

export default function FinanceManagementPage() {
  const [error, setError] = useState(null);
  const [listExpenses, setListExpenses] = useState([]);
  const [totalDailyExpense, setTotalDailyExpense] = useState(0.0);
  const [insightData, setInsightData] = useState(null);

  const navigate = useNavigate();

  // Renamed variables to avoid conflict
  const {
    loading: loadingAnalytics,
    resetStatus: resetAnalyticsStatus,
    status: statusAnalytics,
    getFinancialInsight
  } = useAnalytics();

  const {
    loading: loadingFinance,
    errorMessage: financeError,
    resetStatus: resetFinanceStatus,
    getListExpense
  } = useFinance();

  useEffect(() => {
    const getExpense = async () => {
      try {
        const expensesData = await getListExpense({
          from: new Date().toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0]
        });
        if (expensesData) {
          setListExpenses(expensesData.content);
          setTotalDailyExpense(
            expensesData.content.reduce((acc, item) => acc + item.amount, 0)
          );
        }
      } catch (err) {
        console.log(err)
      } finally {
        resetFinanceStatus();
      }
    };
    getExpense();
  }, []);

  useEffect(() => {
    const getInsightData = async () => {
      try {
        const financialInsight = await getFinancialInsight();
        console.log(financialInsight)
        if (financialInsight) {
          setInsightData(financialInsight);
        }
      } catch (err) {
        console.log(err)
      } finally {
        resetAnalyticsStatus();
      }
    };
    getInsightData();
  }, []);

  return (
    <DashboardLayout className="pt-16 min-h-screen">
      <div className="w-11/12 flex flex-col gap-6 mx-auto mt-10">

        <section className="w-full">
          <SummarizeFinance
            isLoading={loadingAnalytics || loadingFinance}
            error={error}
            dailyExpense={insightData?.totalExpenseToday || 0}
            monthlyExpense={insightData?.totalExpenseThisMonth || 0}
            savingPercentage={insightData?.todaySavingPercentage || 0}
            financeHealthScore={insightData?.financialHealthScore || "Belum ada data"}
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

        <section className='bg-white px-6 py-5 mt-6 shadow-md rounded-2xl w-full mx-auto'>
          <h1 className="text-2xl text-center font-bold text-blue-900/70 mb-4">Pengeluaran hari ini</h1>
          <div className="flex flex-col gap-1 mt-2 border-t-2 border-blue-900/20 w-full rounded-md inset-shadow-sm inset-shadow-blue-950/10">
            {Array.isArray(listExpenses) && listExpenses.length > 0 ? (
              <>
                {listExpenses.map((item, index) => (
                  <ListContainer
                    key={item.id}
                    index={index + 1}
                    className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                    OnDelete={() => console.log('Delete', item.id)}
                  >
                    <div className="grid grid-cols-2">
                      <div className="flex p-0 items-center gap-10">
                        <h1 className="text-lg font-bold text-blue-900/60">{item.expenseDate}</h1>
                        <div>
                          <h3 className="text-lg font-bold text-blue-900/60">{item.reason}</h3>
                          <p className="text-sm font-bold text-blue-900/50">{item.categoryName}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <h1 className="text-lg font-bold text-blue-900/60">
                          {`Rp ${item.amount.toLocaleString('id-ID')}`}
                        </h1>
                      </div>
                    </div>
                  </ListContainer>
                ))}
                <div
                  className="border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => navigate("/dashboard/finance-history")}
                >
                  <div className="flex items-center justify-center px-10 gap-2 text-blue-700/60 py-4 w-full">
                    <span className="font-semibold">Lihat Selengkapnya</span>
                    <BiChevronsRight className="text-xl" />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-blue-900/50 py-6 font-medium">
                Kosong
              </div>
            )}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
