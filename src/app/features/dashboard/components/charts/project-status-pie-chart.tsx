import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Active', 'Completed', 'On Hold'],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: ['#00C951', '#9C39FC', '#FB2C36'],
      borderWidth: 0,
    },
  ],
};

const option = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: '60%',
};

type ProjectStatusPieChartProps = {
  chartData: number[];
  total: number;
};

function ProjectStatusPieChart({
  chartData,
  total,
}: ProjectStatusPieChartProps) {
  const data = {
    labels: ['Active', 'Completed', 'On Hold'],
    datasets: [
      {
        data: chartData,
        backgroundColor: ['#00C951', '#9C39FC', '#FB2C36'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <p className="text-xs text-slate-400 text-center">Total Projects</p>
          <p className="text-center font-bold">{total}</p>
        </div>
        <Doughnut className="max-w-45 max-h-45" data={data} options={option} />
      </div>
    </div>
  );
}

export default ProjectStatusPieChart;
