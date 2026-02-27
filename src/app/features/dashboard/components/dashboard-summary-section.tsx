import { cn } from '@/lib/utils';
import type { DashboardSummary } from '@/types/dashboard.type';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type DashboardSummarySectionProps = {
  className?: string;
  data: DashboardSummary | null;
};

function DashboardSummarySection({
  className,
  data,
}: DashboardSummarySectionProps) {
  const summary = data?.data ?? null;

  const nextRegisterDate = summary?.nextRegister;
  const endtime = nextRegisterDate ? new Date(nextRegisterDate) : null;


  const dayRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: number;

    const updateClock = () => {

      if (!endtime || isNaN(endtime.getTime())) {
        if (dayRef.current) dayRef.current.textContent = '00';
        if (hourRef.current) hourRef.current.textContent = '00';
        if (minRef.current) minRef.current.textContent = '00';
        return;
      }




      const total = endtime.getTime() - Date.now();

      if (total <= 0) {
        clearInterval(interval);

        if (dayRef.current) dayRef.current.textContent = '00';
        if (hourRef.current) hourRef.current.textContent = '00';
        if (minRef.current) minRef.current.textContent = '00';

        return;
      }

      const days = String(Math.floor(total / (1000 * 60 * 60 * 24))).padStart(
        2,
        '0',
      );
      const hours = String(
        Math.floor((total / (1000 * 60 * 60)) % 24),
      ).padStart(2, '0');
      const minutes = String(Math.floor((total / 1000 / 60) % 60)).padStart(
        2,
        '0',
      );

      if (dayRef.current) dayRef.current.textContent = days;
      if (hourRef.current) hourRef.current.textContent = hours;
      if (minRef.current) minRef.current.textContent = minutes;
    };
    updateClock();
    interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn('flex gap-x-3 items-center w-full text-white', className)}
    >
      <div className="w-50 h-full  flex flex-col justify-between custom-card">
        <div className="flex items-center justify-between">
          <h1>Total</h1>
          <Link to={'/admin/portfolio-management'}>
            <ChevronRight className="bg-slate-700 w-6 h-6 rounded-full" />
          </Link>
        </div>
        <div>
          <p className="text-lg font-semibold">{summary?.totalProjects ?? 0}</p>
          <p className="text-xs text-slate-400">Projects</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between h-full custom-card">
        <div className="flex items-center justify-between">
          <h1>{summary?.currentTitle}</h1>

          <Link to={'/admin/portfolio-management'}>
            <ChevronRight className="bg-slate-700 w-6 h-6 rounded-full" />
          </Link>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <p className="text-lg font-semibold">
              {summary?.currentActiveUsers ?? 0}
            </p>
            <p className="text-xs text-slate-400">Active Users</p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {summary?.currentTeams ?? 0}
            </p>
            <p className="text-xs text-slate-400">Team</p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {summary?.currentProjects ?? 0}
            </p>
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
            <span ref={dayRef}>00</span>
            <span className="absolute font-normal -bottom-5 text-xs left-1/2 -translate-x-1/2">
              Days
            </span>
          </span>
          <span className="font-bold text-lg">:</span>
          <span className=" px-1 pb-0.5 relative text-xl rounded-sm bg-slate-700 font-bold">
            <span ref={hourRef}>00</span>
            <span className="absolute font-normal -bottom-5 text-xs left-1/2 -translate-x-1/2">
              Hours
            </span>
          </span>
          <span className="font-bold text-lg">:</span>
          <span className=" px-1 pb-0.5 relative text-xl rounded-sm bg-slate-700 font-bold">
            <span ref={minRef}>00</span>
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
