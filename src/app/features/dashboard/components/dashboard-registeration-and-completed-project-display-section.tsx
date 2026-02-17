import type { RegisterationsAndCompletedProjectsResponse } from '@/types/dashboard.type';
import { useState } from 'react';
import RegisterationAndCompletedChart from './charts/registeration-and-completed-chart';
import SwitchBar from './common/switch-bar';

type DashboardRegisterationAndCompletedProjectDisplaySectionProps = {
  data: RegisterationsAndCompletedProjectsResponse | null;
};

function DashboardRegisterationAndCompletedProjectDisplaySection({
  data,
}: DashboardRegisterationAndCompletedProjectDisplaySectionProps) {
  const [switchIndex, setSwitchIndex] = useState<number>(0);

  return (
    <div className="custom-card">
      <SwitchBar
        options={['Monthly OPOM Registrations', 'Monthly Completed Projects']}
        onChange={(index) => setSwitchIndex(index)}
      />
      <div className="bg-slate-800 rounded-lg mt-3 p-3">
        <RegisterationAndCompletedChart
          chartData={
            switchIndex === 0
              ? (data?.data.projects ?? [])
              : (data?.data.registers ?? [])
          }
        />
      </div>
    </div>
  );
}

export default DashboardRegisterationAndCompletedProjectDisplaySection;
