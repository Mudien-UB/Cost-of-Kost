import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';
import { LineChart } from '@mui/x-charts/LineChart';
import useAnalytics from '../../hooks/useAnalytics';

dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);

function getDateRange(rangeLabel) {
  const to = dayjs().format('YYYY-MM-DD');
  let from;
  switch (rangeLabel) {
    case '1minggu': from = dayjs().subtract(7, 'day'); break;
    case '1bulan': from = dayjs().subtract(1, 'month'); break;
    case '3bulan': from = dayjs().subtract(3, 'month'); break;
    case '6bulan': from = dayjs().subtract(6, 'month'); break;
    case '9bulan': from = dayjs().subtract(9, 'month'); break;
    case '1tahun': from = dayjs().subtract(1, 'year'); break;
    default: from = dayjs().subtract(1, 'month');
  }
  return { from: from.format('YYYY-MM-DD'), to };
}

function generateExpectedPeriods(from, to, granularity) {
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
}

function normalizeResponse(expectedPeriods, response) {
  const map = new Map();
  for (const item of response) {
    map.set(item.period, item.total);
  }
  return expectedPeriods.map(label => map.get(label) ?? 0);
}

export default function FinancialLineChart({ selectedRange, granularity }) {
  const { getExpenseOnRangeWithGranularity } = useAnalytics();
  const [chartData, setChartData] = useState({ series: [], xAxis: [] });
  const [yMax, setYMax] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { from, to } = getDateRange(selectedRange);
        const response = await getExpenseOnRangeWithGranularity({ from, to, granularity });

        if (!Array.isArray(response)) {
          throw new Error('Invalid data');
        }

        const expectedPeriods = generateExpectedPeriods(from, to, granularity);
        const totals = normalizeResponse(expectedPeriods, response);

        const maxTotal = Math.max(...totals);
        const roundedMax = Math.ceil((maxTotal * 1.2) / 100000) * 100000 + maxTotal / 4;
        setYMax(roundedMax);

        setChartData({
          series: [{ data: totals, showMark: false, area: true, color: '#06b6d4' }],
          xAxis: [{ data: expectedPeriods, scaleType: 'band' }],
        });

        setError(response.length <= 0 ? 'Data kosong' : null);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan');
        setChartData({ series: [], xAxis: [] });
        setYMax(0);
      }
    };

    fetchData();
  }, [selectedRange, granularity]);

  if (error) {
    return <p className="text-gray-500 p-10">{error}</p>;
  }

  return (
    <LineChart
      width={1100}
      height={350}
      margin={{ left: 80, right: 40, top: 40, bottom: 40 }}
      series={chartData.series}
      xAxis={chartData.xAxis}
      yAxis={[{
        min: 0,
        max: yMax > 0 ? yMax : undefined,
        valueFormatter: (val) => val.toLocaleString('id-ID'),
      }]}
      tooltip={{
        valueFormatter: (val) => val.toLocaleString('id-ID'),
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
  );
}
