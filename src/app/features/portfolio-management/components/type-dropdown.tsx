import { useClickOutside } from '@/hooks/use-click-outside';
import type { DropdownItem } from '@/types/portfolio-management';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TypeDropdownProps {
  placeholder: string;
  menuList: DropdownItem[];
  selectedValue?: DropdownItem | null;
  onChange?: (item: DropdownItem) => void;
}

const TypeDropdown = ({
  placeholder,
  menuList = [],
  selectedValue,
  onChange,
}: TypeDropdownProps) => {
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
      <button
        type="button"
        className="h-12 w-full rounded-lg px-4 py-3 bg-[#9C39FC] hover:bg-[#8B31E0] border border-[#9C39FC] text-white flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium text-base">
          {selected ? selected.name : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp size={20} className="text-white" />
        ) : (
          <ChevronDown size={20} className="text-white" />
        )}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[#334155] border border-[#475569] rounded-lg shadow-xl max-h-80 overflow-auto">
          {menuList.map((item: DropdownItem, index) => (
            <li key={item.id}>
              <button
                className="w-full px-6 py-4 cursor-pointer text-white hover:bg-[#475569] transition-colors text-center text-sm font-normal leading-5 tracking-normal"
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </button>
              {index < menuList.length - 1 && (
                <div className="h-px bg-[#475569]" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeDropdown;
