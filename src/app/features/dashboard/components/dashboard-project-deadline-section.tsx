import type { ProjectDeadlineResponse } from '@/types/dashboard.type';
import { useState } from 'react';
import SwitchBar from './common/switch-bar';
import ProjectStatusBar from './ui/project-status-bar';

type DashboardProjectDeadlineSectionProps = {
  data: ProjectDeadlineResponse | null;
};

function DashboardProjectDeadlineSection({
  data,
}: DashboardProjectDeadlineSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const endingSoon = data?.data.endingSoonProjects ?? [];
  const overdue = data?.data.overdueProjects ?? [];

  const currentList = selectedIndex === 0 ? endingSoon : overdue;

  const isEmpty = currentList.length === 0;

  // helper to format date nicely
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="custom-card h-full flex flex-col">
      <SwitchBar
        options={['Projects Ending Soon', 'Overdue Projects']}
        value={selectedIndex}
        onChange={setSelectedIndex}
      />

      <div className="mt-4 flex flex-col flex-1">
        <div className="flex justify-between p-2 py-3 text-white bg-slate-700 rounded-xl">
          <h1>Project Name</h1>
          <h1>Date</h1>
        </div>

        <div className="flex py-2 flex-col gap-2 flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="text-slate-400 text-center py-6">
              No {selectedIndex === 0 ? 'ending soon' : 'overdue'} projects
            </div>
          ) : (
            currentList.map((project) => (
              <ProjectStatusBar
                key={project.name + project.date}
                title={project.name}
                date={formatDate(project.date)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardProjectDeadlineSection;
