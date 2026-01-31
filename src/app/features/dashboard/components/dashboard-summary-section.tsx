import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

type DashboardSummarySectionProps = {
  className?: string;
};

function DashboardSummarySection({ className }: DashboardSummarySectionProps) {
  return (
    <div
      className={cn('flex gap-x-3 items-center w-full text-white', className)}
    >
      <div className="w-50 h-full  flex flex-col justify-between custom-card">
        <div className="flex items-center justify-between">
          <h1>Total</h1>
          <ChevronRight className="bg-slate-700 w-6 h-6 rounded-full" />
        </div>
        <div>
          <p className="text-lg font-semibold">1, 000</p>
          <p className="text-xs text-slate-400">Projects</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between h-full custom-card">
        <div className="flex items-center justify-between">
          <h1>OPOM (Jan 2026)</h1>
          <ChevronRight className="bg-slate-700 w-6 h-6 rounded-full" />
        </div>
        <div className="grid grid-cols-3">
          <div>
            <p className="text-lg font-semibold">1, 000</p>
            <p className="text-xs text-slate-400">Projects</p>
          </div>
          <div>
            <p className="text-lg font-semibold">1, 000</p>
            <p className="text-xs text-slate-400">Projects</p>
          </div>
          <div>
            <p className="text-lg font-semibold">1, 000</p>
            <p className="text-xs text-slate-400">Projects</p>
          </div>
        </div>
      </div>
      <div className="w-50 h-full flex flex-col items-center gap-y-5 custom-card">
        <h1 className="text-xs mt-2 text-slate-400">
          New Registration Starts In
        </h1>
        <div className="flex justify-center items-center gap-x-1">
          <span className=" relative px-1 pb-0.5 text-xl rounded-sm bg-slate-700 font-bold">
            00
            <span className="absolute font-normal -bottom-5 text-xs left-1/2 -translate-x-1/2">
              Days
            </span>
          </span>
          <span className="font-bold text-lg">:</span>
          <span className=" px-1 pb-0.5 relative text-xl rounded-sm bg-slate-700 font-bold">
            00
            <span className="absolute font-normal -bottom-5 text-xs left-1/2 -translate-x-1/2">
              Hours
            </span>
          </span>
          <span className="font-bold text-lg">:</span>
          <span className=" px-1 pb-0.5 relative text-xl rounded-sm bg-slate-700 font-bold">
            00
            <span className="absolute font-normal -bottom-5 text-xs left-1/2 -translate-x-1/2">
              Mins
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummarySection;
