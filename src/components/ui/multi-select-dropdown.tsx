import { Check, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface DropdownItem {
  id: string | number;
  name: string;
  [key: string]: any;
}

interface Props {
  placeholder: string;
  menuList?: DropdownItem[];
  className?: string;
  onChange?: (selectedNames: string[]) => void;
  selectedValues?: string[];
}

export default function MultiSelectDropdown(props: Props) {
  const placeholder = props.placeholder;
  const menuList = props.menuList ?? [];
  const className = props.className ?? '';
  const onChange = props.onChange;
  const selectedValues = props.selectedValues ?? [];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(function () {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleToggleItem(itemName: string): void {
    const isSelected = selectedValues.includes(itemName);
    const newSelection = isSelected
      ? selectedValues.filter((name) => name !== itemName)
      : [...selectedValues, itemName];

    if (onChange) {
      onChange(newSelection);
    }
  }

  function handleRemoveItem(itemName: string, event: React.MouseEvent): void {
    event.stopPropagation();
    const newSelection = selectedValues.filter((name) => name !== itemName);
    if (onChange) {
      onChange(newSelection);
    }
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`min-h-12 w-full appearance-none rounded-lg px-4 py-2
          bg-[#FFFFFF17] border border-[#FFFFFF26]
          text-white flex items-center justify-between gap-2
          focus:outline-none focus:ring-2 focus:ring-purple-500
          ${className}`}
        onClick={function () {
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex-1 flex flex-wrap gap-1.5 items-center">
          {selectedValues.length === 0 ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            selectedValues.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-600/20 border border-purple-500/30 text-sm"
              >
                {name}
                <button
                  type="button"
                  onClick={(e) => handleRemoveItem(name, e)}
                  className="hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </span>
            ))
          )}
        </div>

        <ChevronDown size={18} className="text-[#F3F4F6] flex-shrink-0" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[#1f2937] border border-[#374151] rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {menuList.map(function (item) {
            const isSelected = selectedValues.includes(item.name);
            return (
              <li
                key={item.id}
                className="px-4 py-2 cursor-pointer text-white hover:bg-[#374151] flex items-center justify-between"
                onClick={function () {
                  handleToggleItem(item.name);
                }}
              >
                <span>{item.name}</span>
                {isSelected && <Check size={16} className="text-purple-500" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
