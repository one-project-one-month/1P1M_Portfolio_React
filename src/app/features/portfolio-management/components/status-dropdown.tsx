import { useClickOutside } from '@/hooks/use-click-outside';
import type {
  DropdownItem,
  StatusDropdownProps,
} from '@/types/portfolio-management';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          h-12 w-full rounded-lg px-4
          flex items-center justify-between
          border border-white/15
          bg-white/5 backdrop-blur-md
          text-sm text-white
          transition-all duration-200
          hover:bg-white/10
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
          ${className}
        `}
      >
        <span className={selected ? 'text-white' : 'text-gray-400'}>
          {selected?.name || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`text-gray-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          className="
            absolute z-20 mt-2 w-full
            rounded-lg border border-white/10
            bg-[#0F172A]/90 backdrop-blur-xl
            shadow-xl
            overflow-hidden
          "
        >
          {menuList.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="
                px-4 py-3 text-sm text-white
                cursor-pointer
                transition-colors
                hover:bg-white/10
              "
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
