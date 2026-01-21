import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type FilterStatus = 'All' | 'Completed' | 'In Progress' | 'Unqualified';

interface StatusFilterDropdownProps {
  value?: FilterStatus;
  onChange?: (status: FilterStatus) => void;
}

const StatusFilterDropdown = ({
  value = 'All',
  onChange,
}: StatusFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<FilterStatus>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: FilterStatus[] = [
    'All',
    'Completed',
    'In Progress',
    'Unqualified',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (status: FilterStatus) => {
    setSelected(status);
    onChange?.(status);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="h-9 px-4 rounded-lg border border-[#9C39FC] flex items-center gap-1.5 bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-white">Filter by Status</span>
        <ChevronDown
          className={`w-5 h-5 text-[#9C39FC] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[162px] bg-transparent z-50 space-y-0.5">
          {options.map((option) => (
            <button
              key={option}
              className="w-full px-2 py-1 flex items-center gap-3 bg-[#090E23] hover:bg-[#1E293B] transition-colors border border-[#99A1AF] rounded-md"
              onClick={() => handleSelect(option)}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {selected === option && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <span
                className={`text-sm font-normal leading-5 tracking-normal py-1 text-[#F9FAFB]`}
              >
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusFilterDropdown;
