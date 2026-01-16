import { useClickOutside } from '@/hooks/use-click-outside';
import type {
  DropdownItem,
  StatusDropdownProps,
} from '@/types/portfolio-management';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  Completed: 'bg-[#00B634]',
  'In Progress': 'bg-[#FF9900]',
  Unqualified: 'bg-[#7D7D7D]',
};

const StatusDropdown = ({
  placeholder,
  menuList = [],
  className = '',
  onChange,
  selectedValue,
}: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(
    selectedValue || null,
  );

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    setSelected(selectedValue || null);
  }, [selectedValue]);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    setIsOpen(false);
    onChange?.(item);
  };

  const getBackgroundColor = (statusName?: string) => {
    if (!statusName) return 'bg-[#FFFFFF17]';
    return statusColors[statusName] || 'bg-[#FFFFFF17]';
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`h-12 w-full appearance-none rounded-lg px-4 py-3
          ${getBackgroundColor(selected?.name)}
          border border-[#FFFFFF26]
          text-white flex items-center justify-between focus:outline-none 
          focus:ring-2 focus:ring-purple-500 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? 'text-white' : 'text-gray-400'}>
          {selected ? selected.name : placeholder}
        </span>
        <ChevronDown size={18} className="text-[#F3F4F6]" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[#1F2937] border border-[#FFFFFF26] rounded-lg shadow-lg max-h-60 overflow-auto">
          {menuList.map((item: DropdownItem) => (
            <li
              key={item.id}
              className={`px-4 py-3 cursor-pointer text-white hover:opacity-90 ${
                statusColors[item.name] || 'hover:bg-gray-700'
              }`}
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
