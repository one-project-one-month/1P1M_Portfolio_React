import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CalendarProps {
  onSelect?: (date: Date | null) => void;
  onRangeSelect?: (start: Date | null, end: Date | null) => void;
  mode?: 'single' | 'range';
  initialDate?: Date;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
}

export function Calendar({
  onSelect,
  onRangeSelect,
  mode = 'single',
  initialDate = new Date(),
  rangeStart: propsRangeStart = null,
  rangeEnd: propsRangeEnd = null,
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
      // Range mode
      if (!rangeStart || (rangeStart && rangeEnd)) {
        // Start new range
        setRangeStart(clickedDate);
        setRangeEnd(null);
        onRangeSelect?.(clickedDate, null);
      } else if (rangeStart && !rangeEnd) {
        // Complete range
        if (clickedDate < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(clickedDate);
          onRangeSelect?.(clickedDate, rangeStart);
        } else if (clickedDate.getTime() === rangeStart.getTime()) {
          // Same date clicked, reset
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

    // Previous month days (grayed out)
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

    // Current month days
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

    // Next month days (grayed out)
    const remainingDays = 42 - days.length; // 6 rows * 7 days
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
    <div className="flex w-[326px] flex-col gap-4 rounded-[30px] bg-white p-6 shadow-[0_0_15px_0_#9C39FC]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[25px] font-bold text-[#380675]">
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
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

type CalendarProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  // currentMonth stays internal state because it only tracks what the user is LOOKING at
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-md max-h-3/6 mx-auto mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 text-purple-400 rounded-full transition-colors hover:bg-purple-50"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 text-purple-400 rounded-full transition-colors hover:bg-purple-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-lg bg-white p-2">
        {/* Day names */}
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

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-0">{renderDays()}</div>
      </div>
    </div>
  );
}
      <div className="grid grid-cols-7 border-b border-gray-50 bg-gray-50/50">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 p-2">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          // Changed to check against the 'value' prop
          const isSelected = isSameDay(day, value);

          return (
            <button
              key={idx}
              type="button"
              // When clicked, we call the parent's onChange function
              onClick={() => onChange(day)}
              className={`
                relative h-12 w-full p-1 flex items-center justify-center rounded-lg text-sm
                transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                ${isSelected ? 'bg-purple-600 text-white font-medium' : 'hover:bg-purple-50'}
              `}
            >
              {format(day, 'd')}
              {isSameDay(day, new Date()) && !isSelected && (
                <div className="absolute bottom-1 w-0.5 h-0.5 bg-purple-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
