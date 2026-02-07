import { useState } from 'react';

type EditableCellProps = {
  value: string;
  onChange?: (val: string) => void;
};

export const EditableCell = ({ value, onChange }: EditableCellProps) => {
  const [localValue, setLocalValue] = useState(value);

  return (
    <div className="relative group h-9">
      <p
        className="absolute inset-0 flex items-center truncate 
                    group-hover:opacity-0 transition"
      >
        {localValue}
      </p>

      <input
        className="absolute inset-0 w-full rounded-sm bg-[#FFFFFF17] border border-[#FFFFFF26]
                   px-2 py-1 opacity-0 pointer-events-none
                   group-hover:opacity-100 group-hover:pointer-events-auto
                   transition outline-none"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
};
