import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

type DashboardHeaderProps = {
  className?: string;
};

function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <div className={cn('flex justify-between items-start', className)}>
      <div>
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="text-gray-400">
          Overview of users, projects and activities
        </p>
      </div>
      <Button className="text-sm h-10 rounded-md">
        Export to CSV
        <Download size={18} />
      </Button>
    </div>
  );
}

export default DashboardHeader;
