import IconBarChart from '@/assets/icons/IconBarChart';
import IconPieChart from '@/assets/icons/IconPieChart';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ProjectStatusBarChart from './charts/project-status-bar-chart';
import ProjectStatusPieChart from './charts/project-status-pie-chart';
import { StatusSummary } from './ui/status';

function DashboardProjectStatusSection() {
  const [tab, setTab] = useState<'pie' | 'bar'>('bar');

  const toggleTab = () => {
    setTab((prev) => (prev === 'pie' ? 'bar' : 'pie'));
  };

  return (
    <div className="custom-card flex flex-col h-full text-white">
      <div className="flex items-center justify-between">
        <h1>Project Status (Jan 2026)</h1>
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleTab}
            className={cn(
              ' p-2 rounded-lg bg-transparent',
              tab === 'pie' && 'bg-primary-custom',
            )}
          >
            <IconPieChart />
          </button>
          <button
            onClick={toggleTab}
            className={cn(
              ' p-2 rounded-lg bg-transparent',
              tab === 'bar' && 'bg-primary-custom',
            )}
          >
            <IconBarChart />
          </button>
        </div>
      </div>
      <div className="bg-slate-800 flex flex-col flex-1 rounded-lg mt-3 p-3">
        {tab === 'pie' ? <ProjectStatusPieChart /> : <ProjectStatusBarChart />}
        <StatusSummary
          items={[
            {
              label: 'Active',
              count: 12,
              colorClass: 'bg-secondary-custom',
            },
            {
              label: 'Completed',
              count: 18,
              colorClass: 'bg-primary-custom',
            },
            {
              label: 'On Hold',
              count: 3,
              colorClass: 'bg-red-500',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default DashboardProjectStatusSection;
