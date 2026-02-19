import IconBarChart from '@/assets/icons/IconBarChart';
import IconPieChart from '@/assets/icons/IconPieChart';
import { cn } from '@/lib/utils';
import type { ProjectStatusResponse } from '@/types/dashboard.type';
import { useState } from 'react';
import ProjectStatusBarChart from './charts/project-status-bar-chart';
import ProjectStatusPieChart from './charts/project-status-pie-chart';
import { StatusSummary } from './ui/status';

type DashboardProjectStatusSectionProps = {
  data: ProjectStatusResponse | null;
};

function DashboardProjectStatusSection({
  data,
}: DashboardProjectStatusSectionProps) {
  const [tab, setTab] = useState<'pie' | 'bar'>('pie');

  const toggleTab = () => {
    setTab((prev) => (prev === 'pie' ? 'bar' : 'pie'));
  };

  const { active, totalProjects, onHold, completed } = data?.data ?? {};

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
        {tab === 'pie' ? (
          <ProjectStatusPieChart
            chartData={[active ?? 0, completed ?? 0, onHold ?? 0]}
            total={totalProjects ?? 0}
          />
        ) : (
          <ProjectStatusBarChart
            chartData={[active ?? 0, completed ?? 0, onHold ?? 0]}
          />
        )}
        <StatusSummary
          items={[
            {
              label: 'Active',
              count: active ?? 0,
              colorClass: 'bg-secondary-custom',
            },
            {
              label: 'Completed',
              count: completed ?? 0,
              colorClass: 'bg-primary-custom',
            },
            {
              label: 'On Hold',
              count: onHold ?? 0,
              colorClass: 'bg-red-500',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default DashboardProjectStatusSection;
