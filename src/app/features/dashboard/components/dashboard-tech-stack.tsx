import type { RoleDistributionAndTechStackResponse } from '@/types/dashboard.type';
import { useState } from 'react';
import SwitchBar from './common/switch-bar';
import ProgressBar from './ui/progress-bar';

type DashboardTechStackProps = {
  data: RoleDistributionAndTechStackResponse | null;
};

function DashboardTechStack({ data }: DashboardTechStackProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const roles = data?.data.roles ?? [];
  const techStacks = data?.data.techStacks ?? [];

  const currentList = selectedIndex === 0 ? roles : techStacks;

  const isEmpty = currentList.length === 0;

  return (
    <div className="h-full custom-card flex flex-col">
      <SwitchBar
        options={['Role Distribution', 'Tech Stack']}
        value={selectedIndex}
        onChange={setSelectedIndex}
      />

      <div className="bg-slate-800 gap-3 flex flex-col flex-1 rounded-lg mt-3 p-3">
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center text-slate-400 text-sm">
            No {selectedIndex === 0 ? 'role distribution' : 'tech stack'} data
          </div>
        ) : (
          currentList.map((item) => (
            <ProgressBar
              key={item.label}
              label={item.label}
              value={Math.round(item.rate)}
              barClassName="bg-primary-custom"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardTechStack;
