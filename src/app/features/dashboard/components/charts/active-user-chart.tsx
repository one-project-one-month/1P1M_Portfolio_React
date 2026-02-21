import { cn } from '@/lib/utils';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import MonthDropdown from '../common/month-dropdown';

ChartJS.register(ArcElement, Tooltip, Legend);

type ActiveUserChartProps = {
  size?: number;
  data: number[];
  colors?: string[];
  label?: string;
  className?: string;
  cutout?: string;
  month?: string;
};

export default function ActiveUserChart({
  size = 210,
  data,
  colors = ['#3B82F6', '#60A5FA', '#BFDBFE'],
  label,
  className,
  month = 'January',
  cutout = '85%',
}: ActiveUserChartProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const normalize = (values: number[]) => {
    const total = values.reduce((a, b) => a + b, 0);
    return total === 0 ? values : values.map((v) => (v / total) * 100);
  };

  const chartData = {
    datasets: [
      {
        data: normalize(data),
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 9,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
    responsive: true,
    spacing: 8,
  };

  if (!ready) return null;

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size / 2 }}
    >
      {/* Half donut */}
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size / 2,
          top: 0,
          left: 0,
        }}
      >
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Center text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {label && <p className="text-xs font-medium text-gray-400">{label}</p>}
        <MonthDropdown value={month} onChange={() => {}} />
      </div>
    </div>
  );
}
