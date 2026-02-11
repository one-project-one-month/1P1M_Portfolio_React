import { CalendarMinus2Icon } from 'lucide-react';
import { useState } from 'react';
import ModalWrapper from '../modal-wrapper';
import Calendar from './calendar';

type DatePickerProps = {
  label?: string;
  value?: string;
  onChange?: (date: string) => void;
};

const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateSelect = (selectedDate: Date | null) => {
    if (selectedDate && onChange) {
      // const formatted = selectedDate.toISOString().split('T')[0];
      const formatted = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1,
      ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`; // Fix date shift issue by creating date at noon to avoid timezone conversion

      onChange(formatted);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex border-[#FFFFFF26] w-full bg-white/5 py-3 rounded-md items-center justify-between px-4 text-white border focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <span className={value ? 'text-white' : 'text-white/50'}>
          {value || label}
        </span>
        <CalendarMinus2Icon size={17} color="#8B2FE0" />
      </button>

      <ModalWrapper isOpen={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 bg-[#121212] rounded-2xl border border-white/10">
          <Calendar
            value={value ? new Date(value) : null}
            onSelect={handleDateSelect}
          />
          <div className="flex gap-x-4 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2 rounded-xl border border-white/20 text-white/60"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2 rounded-xl bg-[#8B2FE0] text-white"
            >
              Done
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default DatePicker;
