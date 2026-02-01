import { cn } from '@/lib/utils';

type ProgressBarProps = {
  label: string;
  value: number; // 0 - 100
  className?: string;
  labelClassName?: string;
  barClassName?: string;
  trackClassName?: string;
  percentClassName?: string;
};

function ProgressBar({
  label,
  value,
  className,
  labelClassName,
  barClassName,
  trackClassName,
  percentClassName,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn(className)}>
      <h1 className={cn('text-sm mb-1 text-slate-400 w-24', labelClassName)}>
        {label}
      </h1>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            'relative flex-1 h-5 bg-slate-700 overflow-hidden',
            trackClassName,
          )}
        >
          <div
            className={cn(
              'h-full transition-all duration-300 bg-primary-custom',
              barClassName,
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>

        <span
          className={cn(
            'text-sm font-semibold text-white w-10 text-right',
            percentClassName,
          )}
        >
          {clampedValue}%
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
