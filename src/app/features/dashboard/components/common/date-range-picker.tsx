import Calendar from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import * as Popover from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';

type DateRange = {
  from?: Date;
  to?: Date;
};

type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
};

function formatMonthYear(date?: Date) {
  if (!date) return 'Select date';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  });
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="w-45  justify-between flex py-1 rounded-sm border-slate-400 text-sm  item-center text-white border px-2">
            <span className="mt-0.5">{formatMonthYear(value?.from)}</span>
            <CalendarIcon className="w-4" />
          </button>
        </Popover.Trigger>

        <Popover.Content className="" sideOffset={8}>
          <Calendar
            value={value?.from}
            className="max-w-80 p-3"
            headerClassName="text-lg"
            onSelect={(date) =>
              onChange?.({ from: date ?? undefined, to: value?.to })
            }
          />
        </Popover.Content>
      </Popover.Root>

      <span className="text-white">to</span>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="w-45 justify-between flex py-1 rounded-sm border-slate-400 text-sm  item-center text-white border px-2">
            <span className="mt-0.5">{formatMonthYear(value?.to)}</span>
            <CalendarIcon className="w-4" />
          </button>
        </Popover.Trigger>

        <Popover.Content sideOffset={8}>
          <Calendar
            value={value?.to}
            className="max-w-80 p-3"
            headerClassName="text-lg"
            onSelect={(date) => {
              console.log(date);
              onChange?.({ from: value?.from, to: date ?? undefined });
            }}
          />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
