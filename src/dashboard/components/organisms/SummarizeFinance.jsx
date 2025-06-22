import React from 'react';
import CardContainer from '../molecules/CardContainer';

export default function SummarizeFinance({
  isLoading,
  error,
  dailyExpense,
  monthlyExpense,
  savingPercentage,
  financeHealthScore,
}) {
  const renderContent = (value) => {
    if (isLoading) {
      return <p className="text-center text-blue-600 text-xl">Memuat data...</p>;
    }
    if (error) {
      return <p className="text-center text-red-600 text-xl">{error}</p>;
    }
    return value;
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <CardContainer title="Pengeluaran Hari Ini">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800">
          Rp. {dailyExpense.toLocaleString('id-ID')}
        </h1>
      </CardContainer>

      <CardContainer title="Total Pengeluaran Bulan Ini">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800">
          Rp. {monthlyExpense.toLocaleString('id-ID')}
        </h1>
      </CardContainer>

      <CardContainer title="Persentase Hemat">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800">
          {savingPercentage.toFixed(1)}%
        </h1>
      </CardContainer>

      <CardContainer title="Nilai Finansial">
        {typeof financeHealthScore === 'number' ? (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800">
              {financeHealthScore.toFixed(1)}/10
            </h1>
          
        ) : (
          <h2 className="text-xl sm:text-2xl md:text-3xl text-blue-800/50 font-bold">{financeHealthScore}</h2>
        )}
      </CardContainer>

    </section>
  );
}
