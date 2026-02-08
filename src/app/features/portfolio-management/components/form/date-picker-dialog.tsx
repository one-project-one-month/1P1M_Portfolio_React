import { Calendar } from '@/components/ui/calendar';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface DatePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSelect: (date: string) => void;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const DatePickerDialog = ({
  isOpen,
  onClose,
  selectedDate,
  onSelect,
}: DatePickerDialogProps) => {
  const [internalDate, setInternalDate] = useState<Date | null>(selectedDate);

  useEffect(() => {
    setInternalDate(selectedDate);
  }, [selectedDate, isOpen]);

  const handleDone = () => {
    const dateToSave = internalDate || new Date();
    // Format date as "Nov 15, 2025"
    const formattedDate = dateToSave.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    onSelect(formattedDate);
    onClose();
  };

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] translate-x-[-50%] translate-y-[-50%] flex max-w-max flex-col items-center gap-6 rounded-xl border-0 bg-[#0F172B] p-3 shadow-2xl animate-in zoom-in-95 duration-200 focus:outline-none">
          <Calendar
            mode="single"
            initialDate={internalDate || new Date()}
            onSelect={setInternalDate}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-12 pb-2">
            <button
              onClick={onClose}
              className="flex w-[101px] items-center justify-center rounded-md border border-[#9C39FC] bg-white/10 px-4 py-2.5 text-xl text-white/50 transition-colors hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="flex w-[101px] items-center justify-center rounded-md border border-[#9C39FC] bg-[#9C39FC] px-4 py-2.5 text-xl text-white transition-colors hover:bg-[#9C39FC]/90"
            >
              Done
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default DatePickerDialog;
