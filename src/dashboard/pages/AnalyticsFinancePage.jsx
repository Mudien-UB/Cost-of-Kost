import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import FinancialLineChart from '../components/organisms/FinancialLineChart';
import CategoryTotalPieChart from '../components/organisms/CategoryTotalPieChart';
import dayjs from 'dayjs';

const ranges = ['1minggu', '1bulan', '3bulan', '6bulan', '9bulan', '1tahun'];

function getGranularityForRange(range) {
  if (range === '1minggu' || range === '1bulan') return 'DAILY';
  return 'MONTHLY';
}

const months = [
  { value: 1, label: 'Januari' },
  { value: 2, label: 'Februari' },
  { value: 3, label: 'Maret' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mei' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'Agustus' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Desember' },
];




export default function AnalyticsFinancePage() {
  const [selectedRange, setSelectedRange] = useState('1bulan');
  const [granularity, setGranularity] = useState('DAILY');

  const currentYear = dayjs().year();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1); // month: 1-12

  const selectedMonthAt = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`;


  return (
    <DashboardLayout className="pt-16 min-h-screen">
      <section className="flex flex-col gap-10 items-center">
        <div className="w-full px-10 py-6 bg-white shadow-md rounded-xl flex flex-col items-center gap-6">
          <h2 className="text-xl md:text-3xl font-bold text-blue-900/80 mt-10">
            Total Pengeluaran per Kategori
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            <label className="text-blue-900/80 font-medium">
              Pilih Bulan dan Tahun:
            </label>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <CategoryTotalPieChart monthAt={selectedMonthAt} />

        </div>

        <div className="w-full px-10 py-6 bg-white shadow-md rounded-xl flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-900/80">
            Grafik Pengeluaran
          </h2>

          <div className="flex flex-wrap gap-2 justify-center">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedRange(range);
                  setGranularity(getGranularityForRange(range));
                }}
                className={`px-4 py-2 rounded border font-medium transition-colors ${selectedRange === range
                  ? 'bg-blue-800/80 text-white'
                  : 'bg-white text-blue-800/80 hover:bg-blue-50'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>

          <FinancialLineChart selectedRange={selectedRange} granularity={granularity} />
        </div>

      </section>
    </DashboardLayout>
  );

}
