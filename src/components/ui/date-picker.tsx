import { CalendarMinus2Icon } from 'lucide-react';
import { useState } from 'react';
import ModalWrapper from '../modal-wrapper';
import Calendar from './calendar';

type DatePickerProps = {
  label?: string;
};

const DatePicker = ({ label }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);

  const hanldeDatePicker = () => {
    setIsOpen(true);
  };

  return (
    <button
      onClick={hanldeDatePicker}
      className="flex border-[#FFFFFF26]  w-full  bg-white/9 py-3 rounded-md items-center justify-around text-white border
     focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <div />

      {date ? (
        <h3 className="">{date.toLocaleDateString()}</h3>
      ) : (
        <h3 className=" text-white/50 text-center">{label}</h3>
      )}
      <CalendarMinus2Icon size={17} color="#8B2FE0" />

      <ModalWrapper isOpen={isOpen} onOpenChange={setIsOpen}>
        <Calendar value={date} onChange={(date) => setDate(date)} />
      </ModalWrapper>
    </button>
  );
};

export default DatePicker;
