import { cn } from '@/lib/utils';
import { useState } from 'react';

type SwitchBarProps = {
  options: string[];
  value?: number;
  onChange?: (index: number) => void;
  className?: string;
  itemClassName?: string;
};

function SwitchBar({
  options,
  value,
  onChange,
  className,
  itemClassName,
}: SwitchBarProps) {
  const [internalValue, setInternalValue] = useState(0);
  const selected = value ?? internalValue;

  const handleSelect = (index: number) => {
    setInternalValue(index);
    onChange?.(index);
  };

  return (
    <div
      className={cn(
        'flex w-full gap-4 overflow-x-auto whitespace-nowrap',
        className,
      )}
    >
      {options.map((opt, index) => {
        const isActive = index === selected;

        return (
          <button
            key={opt}
            onClick={() => handleSelect(index)}
            className={cn(
              ' pb-2 px-3 transition-colors',
              'shrink-0',
              isActive
                ? 'border-b-3 border-primary-custom font-semibold text-white'
                : 'text-slate-400 hover:text-white',
              itemClassName,
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default SwitchBar;
