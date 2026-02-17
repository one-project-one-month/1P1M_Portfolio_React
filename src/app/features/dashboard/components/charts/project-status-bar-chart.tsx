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

const labels = ['Active', 'Completed', 'On Hold'];

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
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 20, color: 'white' },
      beginAtZero: true,
    },
  },
};

type ProjectStatusBarChartProps = {
  chartData: number[];
};

function ProjectStatusBarChart({ chartData }: ProjectStatusBarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartData,
        backgroundColor: ['#00C951', '#9C39FC', '#FB2C36'],
      },
    ],
  };

  return (
    <div className="flex-1 relative">
      <Bar options={options} data={data} />
    </div>
  );
}

export default ProjectStatusBarChart;
