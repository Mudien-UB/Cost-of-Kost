import { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import useAnalytics from '../../hooks/useAnalytics';

export default function CategoryTotalPieChart({ monthAt }) {
  const { getTotalPerCategory } = useAnalytics();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getTotalPerCategory({ monthAt });
        if (!Array.isArray(res)) throw new Error('Invalid data');
        console.log(res)
        setData(res);
        setError(null);
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getTotalPerCategory, monthAt]);

  if (loading) {
    return <p className="p-10 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  if (!data.length) {
    return <p className="p-10 text-gray-500">Tidak ada data untuk bulan ini.</p>;
  }

  // Format data untuk PieChart
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.total,
    label: item.name,
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          arcLabel: (item) =>
            `${item.label} (${new Intl.NumberFormat('id-ID', { notation: 'compact', compactDisplay: 'short' }).format(item.value)})`,
          arcLabelMinAngle: 35,
          arcLabelRadius: '60%',
        },
      ]}
      width={600}
      height={400}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
    />
  );
}
