import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type StatusFilterOption =
  | 'All'
  | 'Planning'
  | 'In Progress'
  | 'Completed'
  | 'Unqualified';

export type OrderFilterOption = 'All' | 'Popular' | 'Newest' | 'Oldest';

type FilterOption = StatusFilterOption | OrderFilterOption;

type DropdownType = 'status' | 'order';

interface FilterDropdownProps<T extends FilterOption> {
  type: DropdownType;
  value?: T;
  onChange?: (value: T) => void;
  options: T[];
  label: string;
  icon?: React.ReactNode;
}

const STATUS_OPTIONS: StatusFilterOption[] = [
  'All',
  'Planning',
  'In Progress',
  'Completed',
  'Unqualified',
];

const ORDER_OPTIONS: OrderFilterOption[] = [
  'All',
  'Popular',
  'Newest',
  'Oldest',
];

function FilterDropdown<T extends FilterOption>({
  value,
  onChange,
  options,
  label,
  icon,
}: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T>(value || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (option: T) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="h-9 px-3 rounded-2xl border border-white flex items-center gap-1.5 bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span className="text-sm font-medium text-white">{label}</span>
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
              <span className="text-sm font-normal leading-5 tracking-normal py-1 text-[#F9FAFB]">
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const StatusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 17H14"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7 12H17"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.5 7H19.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

interface StatusFilterDropdownProps {
  value?: StatusFilterOption;
  onChange?: (status: StatusFilterOption) => void;
}

export const StatusFilterDropdown = ({
  value = 'All',
  onChange,
}: StatusFilterDropdownProps) => {
  return (
    <FilterDropdown<StatusFilterOption>
      type="status"
      value={value}
      onChange={onChange}
      options={STATUS_OPTIONS}
      label="Status"
      icon={<StatusIcon />}
    />
  );
};

interface OrderFilterDropdownProps {
  value?: OrderFilterOption;
  onChange?: (order: OrderFilterOption) => void;
}

export const OrderFilterDropdown = ({
  value = 'All',
  onChange,
}: OrderFilterDropdownProps) => {
  return (
    <FilterDropdown<OrderFilterOption>
      type="order"
      value={value}
      onChange={onChange}
      options={ORDER_OPTIONS}
      label="Order"
      icon={<StatusIcon />}
    />
  );
};

export default StatusFilterDropdown;
