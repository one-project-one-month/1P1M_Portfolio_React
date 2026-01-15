import { useClickOutside } from '@/hooks/use-click-outside';
import type { DropdownProps, MenuItem } from '@/types/dropdown-props';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Dropdown = ({
  placeholder,
  menuList = [],
  className = '',
  onChange,
  selectedValue,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(
    selectedValue || null,
  );

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    setSelected(selectedValue || null);
  }, [selectedValue]);

  const handleSelect = (item: MenuItem) => {
    setSelected(item);
    setIsOpen(false);
    onChange?.(item);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`h-12 w-full appearance-none rounded-lg px-4 py-3
          bg-[#FFFFFF17] border border-[#FFFFFF26]
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
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {menuList.map((item: MenuItem) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
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

export default Dropdown;
