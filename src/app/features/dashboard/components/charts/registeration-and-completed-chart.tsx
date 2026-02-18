import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

type RegisterationAndCompletedChartProps = {
  chartData: number[];
};

function RegisterationAndCompletedChart({
  chartData,
}: RegisterationAndCompletedChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        backgroundColor: '#9C39FC',
      },
    ],
  };

  return <Bar className="max-h-70" options={options} data={data} />;
}

export default RegisterationAndCompletedChart;
