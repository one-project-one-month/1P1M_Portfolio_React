import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from './delete-dialog';

interface CalendarProps {
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  onSelect?: (date: Date | null) => void;
  onRangeSelect?: (start: Date | null, end: Date | null) => void;
  mode?: 'single' | 'range';
  initialDate?: Date;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  className?: string;
  headerClassName?: string;
}

export function Calendar({
  onSelect,
  onRangeSelect,
  mode = 'single',
  initialDate = new Date(),
  rangeStart: propsRangeStart = null,
  rangeEnd: propsRangeEnd = null,
  className,
  headerClassName,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null,
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(propsRangeStart);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(propsRangeEnd);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );

    if (mode === 'single') {
      setSelectedDate(clickedDate);
      onSelect?.(clickedDate);
    } else {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(clickedDate);
        setRangeEnd(null);
        onRangeSelect?.(clickedDate, null);
      } else if (rangeStart && !rangeEnd) {
        if (clickedDate < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(clickedDate);
          onRangeSelect?.(clickedDate, rangeStart);
        } else if (clickedDate.getTime() === rangeStart.getTime()) {
          setRangeStart(null);
          setRangeEnd(null);
          onRangeSelect?.(null, null);
        } else {
          setRangeEnd(clickedDate);
          onRangeSelect?.(rangeStart, clickedDate);
        }
      }
    }
  };

  const isDateSelected = (day: number) => {
    if (mode === 'single' && selectedDate) {
      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()
      );
    } else if (mode === 'range') {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      if (rangeStart && rangeEnd) {
        return date >= rangeStart && date <= rangeEnd;
      } else if (rangeStart) {
        return date.getTime() === rangeStart.getTime();
      }
    }
    return false;
  };

  const isDateInRange = (day: number) => {
    if (mode !== 'range' || !rangeStart || !rangeEnd) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date > rangeStart && date < rangeEnd;
  };

  const isRangeStart = (day: number) => {
    if (mode !== 'range' || !rangeStart) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.getTime() === rangeStart.getTime();
  };

  const isRangeEnd = (day: number) => {
    if (mode !== 'range' || !rangeEnd) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.getTime() === rangeEnd.getTime();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonthDays = getDaysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${i}`}
          className="flex h-9 w-9 items-center justify-center rounded-md text-sm opacity-30"
          disabled
        >
          {prevMonthDays - i}
        </button>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const selected = isDateSelected(day);
      const inRange = isDateInRange(day);
      const isStart = isRangeStart(day);
      const isEnd = isRangeEnd(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`flex h-9 w-9 items-center justify-center text-sm transition-colors ${
            selected && mode === 'single'
              ? 'rounded-md bg-[#9C39FC] text-white'
              : isStart || isEnd
                ? 'rounded-md bg-[#9C39FC] text-white'
                : inRange
                  ? 'bg-[#9C39FC]/20 text-white'
                  : 'rounded-md text-[#0F172B] hover:bg-[#9C39FC]/10'
          }`}
        >
          {day}
        </button>,
      );
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="flex h-9 w-9 items-center justify-center rounded-md text-sm opacity-30"
          disabled
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <div
      className={cn(
        'flex w-[326px] flex-col gap-4 rounded-[30px] bg-white p-6 shadow-[0_0_15px_0_#9C39FC]',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2
          className={cn(
            'text-[25px] font-bold text-[#380675]',
            headerClassName,
          )}
        >
          {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#380675] transition-colors hover:bg-[#9C39FC]/10"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={nextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#380675] transition-colors hover:bg-[#9C39FC]/10"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-2">
        <div className="mb-4 grid grid-cols-7 gap-0">
          {dayNames.map((day) => (
            <div
              key={day}
              className="flex h-6 items-center justify-center text-sm text-[#62748E]"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">{renderDays()}</div>
      </div>
    </div>
  );
}

export default Calendar;
