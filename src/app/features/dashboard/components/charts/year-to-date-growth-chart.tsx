import type { YearToDateGrowthResponse } from '@/types/dashboard.type';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
      ticks: { color: 'white' },
      grid: { display: false, drawBorder: false },
    },
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 20, color: 'white' },
    },
  },
};

type YearToDateGrowthChartProps = {
  chartData: YearToDateGrowthResponse | null;
  check: { hasRegisters: boolean; hasProjects: boolean };
};

function YearToDateGrowthChart({
  chartData,
  check,
}: YearToDateGrowthChartProps) {
  const data = {
    labels,
    datasets: [
      check.hasProjects && {
        label: 'Projects',
        data: chartData?.data.projects ?? [],
        borderColor: '#9C39FC',
        backgroundColor: 'white',
      },
      check.hasRegisters && {
        label: 'Registers',
        data: chartData?.data.register ?? [],
        borderColor: '#00C951',
        backgroundColor: 'white',
      },
    ],
  };

  return <Line className="max-h-76" options={options} data={data} />;
}

export default YearToDateGrowthChart;
