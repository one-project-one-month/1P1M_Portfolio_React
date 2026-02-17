import type { InactiveUsersResponse } from '@/types/dashboard.type';
import { ChevronRight } from 'lucide-react';
import ActiveUserChart from './charts/active-user-chart';

type DashboardActiveUserSectionProps = {
  data: InactiveUsersResponse | null;
};

function DashboardActiveUserSection({ data }: DashboardActiveUserSectionProps) {
  const month = new Date(data?.data.date ?? '').toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });

  return (
    <div className="custom-card flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center text-white justify-between">
          <h1>Inactive Users (Active Projects)</h1>
          <ChevronRight className="bg-slate-700 w-6 h-6 rounded-full" />
        </div>
        <p className="text-sm text-slate-400">
          Users with no recent activity in ongoing projects
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center bg-slate-800 rounded-lg p-3">
        <ActiveUserChart
          label="Inactive Users in"
          data={[
            data?.data.inactiveUsers ?? 0,
            100 - (data?.data.inactiveUsers ?? 0),
          ]}
          size={300}
          cutout="90%"
          colors={['#FB2C36', '#D9D9D9']}
          month={month}
        />
        <div className="flex gap-x-8 text-white text-center justify-center items-center">
          <div>
            <p className="font-semibold">{data?.data.totalUsers ?? 0}</p>
            <p className="text-sm text-slate-400">Total Users</p>
          </div>
          <div>
            <p className="font-semibold">{data?.data.inactiveUsers ?? 0}</p>
            <p className="text-sm text-slate-400">Inactive Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardActiveUserSection;
