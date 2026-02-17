import type { YearToDateGrowthResponse } from '@/types/dashboard.type';
import { useState } from 'react';
import YearToDateGrowthChart from './charts/year-to-date-growth-chart';
import CheckboxWithText from './common/checkbox-with-text';
import { DateRangePicker } from './common/date-range-picker';

type DashboardYearToDateGrowthSectionProps = {
  data: YearToDateGrowthResponse | null;
};

function DashboardYearToDateGrowthSection({
  data,
}: DashboardYearToDateGrowthSectionProps) {
  const [range, setRange] = useState({
    from: new Date(2026, 0),
    to: new Date(2026, 11),
  });

  const [check, setCheck] = useState({ hasProjects: true, hasRegisters: true });

  const handleProjectCheckToggle = () => {
    setCheck((prev) => {
      return { ...prev, hasProjects: !prev.hasProjects };
    });
  };

  const handleRegisterCheckToggle = () => {
    setCheck((prev) => {
      return { ...prev, hasRegisters: !prev.hasRegisters };
    });
  };

  return (
    <div className="custom-card">
      <div>
        <h1 className="text-base text-white">Year-to-Date Growth</h1>
        <p className="text-xs text-gray-400">
          Cumulative count of projects and registered users for the selected
          period.
        </p>
      </div>
      <div className="bg-slate-800 rounded-lg mt-3 p-2">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <CheckboxWithText
              label="Projects"
              checked={check.hasProjects}
              onCheckedChange={handleProjectCheckToggle}
              textClassName="text-white"
              color="purple"
            />
            <CheckboxWithText
              label="OPOM Register"
              checked={check.hasRegisters}
              onCheckedChange={handleRegisterCheckToggle}
              textClassName="text-white"
              color="green"
            />
          </div>
          <div>
            <DateRangePicker value={range} onChange={setRange as any} />
          </div>
        </div>
        <YearToDateGrowthChart chartData={data} check={check} />
      </div>
    </div>
  );
}

export default DashboardYearToDateGrowthSection;
