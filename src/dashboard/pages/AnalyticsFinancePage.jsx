import * as React from 'react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';
import useAnalytics from '../hooks/useAnalytics';
import DashboardLayout from '../layouts/DashboardLayout';
import { LineChart } from '@mui/x-charts/LineChart';

dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);

export default function AnalyticsFinancePage() {
  const { getExpenseOnRangeWithGranularity } = useAnalytics();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({ series: [], xAxis: [] });
  const [selectedRange, setSelectedRange] = useState('1bulan');
  const [granularity, setGranularity] = useState('DAILY');
  const [yMax, setYMax] = useState(0); 

  const ranges = ['1minggu', '1bulan', '3bulan', '6bulan', '9bulan', '1tahun'];

  const getGranularityForRange = (range) => {
    switch (range) {
      case '1minggu':
      case '1bulan':
        return 'DAILY';
      case '3bulan':
      case '6bulan':
      case '9bulan':
      case '1tahun':
        return 'MONTHLY';
      default:
        return 'DAILY';
    }
  };

  const getDateRange = (rangeLabel) => {
    const to = dayjs().format('YYYY-MM-DD');
    let from;
    switch (rangeLabel) {
      case '1minggu':
        from = dayjs().subtract(7, 'day');
        break;
      case '1bulan':
        from = dayjs().subtract(1, 'month');
        break;
      case '3bulan':
        from = dayjs().subtract(3, 'month');
        break;
      case '6bulan':
        from = dayjs().subtract(6, 'month');
        break;
      case '9bulan':
        from = dayjs().subtract(9, 'month');
        break;
      case '1tahun':
        from = dayjs().subtract(1, 'year');
        break;
      default:
        from = dayjs().subtract(1, 'month');
    }
    return { from: from.format('YYYY-MM-DD'), to };
  };

  const generateExpectedPeriods = (from, to, granularity) => {
    const periods = [];
    let current = dayjs(from);
    const end = dayjs(to);

    while (current.isSameOrBefore(end)) {
      if (granularity === 'DAILY') {
        periods.push(current.format('YYYY-MM-DD'));
        current = current.add(1, 'day');
      } else if (granularity === 'MONTHLY') {
        periods.push(current.format('YYYY-MM'));
        current = current.add(1, 'month');
      }
    }

    return Array.from(new Set(periods));
  };

  const normalizeResponse = (expectedPeriods, response) => {
    const map = new Map();
    for (const item of response) {
      map.set(item.period, item.total);
    }
    return expectedPeriods.map((label) => map.get(label) ?? 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { from, to } = getDateRange(selectedRange);
        const response = await getExpenseOnRangeWithGranularity({
          from,
          to,
          granularity,
        });

        const expectedPeriods = generateExpectedPeriods(from, to, granularity);

        if (!response || !Array.isArray(response)) {
          throw new Error('Invalid data');
        }

        const totals = normalizeResponse(expectedPeriods, response);

        const maxTotal = Math.max(...totals);
        const roundedMax = Math.ceil((maxTotal * 1.2) / 100000) * 100000 + maxTotal / 4;
        setYMax(roundedMax);

        setChartData({
          series: [
            {
              data: totals,
              showMark: false,
              area: true,
              color: '#06b6d4',
            },
          ],
          xAxis: [
            {
              data: expectedPeriods,
              scaleType: 'band',
            },
          ],
        });
        if(response.length <= 0){
          setError('data empty')
        }else{
          setError(null);
        }
      } catch (err) {
        setError(err);
        setChartData({ series: [], xAxis: [] });
        setYMax(0);
      }
    };

    fetchData();
  }, [getExpenseOnRangeWithGranularity, selectedRange, granularity]);

  return (
    <DashboardLayout className="pt-16 min-h-screen">
      <section className="flex flex-col items-center">
        <div className="w-full px-10 py-6 bg-white shadow-md rounded-xl flex flex-col items-center gap-6">
          <h2 className='text-2xl md:text-4xl font-bold text-blue-900/80' >Grafik Pengeluaran</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedRange(range);
                  setGranularity(getGranularityForRange(range));
                }}
                className={`px-4 py-2 rounded border font-medium transition-colors ${
                  selectedRange === range
                    ? 'bg-blue-800/80 text-white'
                    : 'bg-white text-blue-800/80 hover:bg-blue-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {error ? (
            <h2 className="text-gray-500 p-10">
              Tidak ada data pada {selectedRange} ini
            </h2>
          ) : (
            <LineChart
              width={1100}
              height={350}
              margin={{ left: 80, right: 40, top: 40, bottom: 40 }}
              series={chartData.series}
              xAxis={chartData.xAxis}
              yAxis={[
                {
                  min: 0,
                  max: yMax > 0 ? yMax : undefined,
                  valueFormatter: (value) => value.toLocaleString('id-ID'),
                },
              ]}
              tooltip={{
                valueFormatter: (value) => value.toLocaleString('id-ID'),
              }}
              sx={{
                '.MuiLineElement-root': { strokeWidth: 2 },
                '.MuiAreaElement-root': {
                  fill: 'url(#areaGradient)',
                  opacity: 0.25,
                },
              }}
              slotProps={{
                legend: { hidden: false, position: { vertical: 'top', horizontal: 'middle' } },
              }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#193cb8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#193cb8" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </LineChart>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
