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
