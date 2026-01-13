import { useEffect, useRef, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

export interface DropdownItem {
  id: string | number;
  name: string;
  [key: string]: any;
}

interface Props {
  placeholder: string;
  menuList?: DropdownItem[];
  className?: string;
  onChange?: (item: DropdownItem) => void;
  selectedValue?: DropdownItem | null;
}

export default function FormDropdown(props: Props) {
  var placeholder = props.placeholder;
  var menuList = props.menuList ?? [];
  var className = props.className ?? '';
  var onChange = props.onChange;
  var selectedValue = props.selectedValue ?? null;

  var [isOpen, setIsOpen] = useState<boolean>(false);
  var [selected, setSelected] = useState<DropdownItem | null>(selectedValue);
  var dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      setSelected(selectedValue);
    },
    [selectedValue],
  );

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

  function handleSelect(item: DropdownItem): void {
    setSelected(item);
    setIsOpen(false);

    if (onChange) {
      onChange(item);
    }
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`h-12 w-full appearance-none rounded-lg px-4 py-3
          bg-[#FFFFFF17] border border-[#FFFFFF26]
          text-white flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-purple-500
          ${className}`}
        onClick={function () {
          setIsOpen(!isOpen);
        }}
      >
        <span className={selected ? 'text-white' : 'text-gray-400'}>
          {selected ? selected.name : placeholder}
        </span>

        <IoChevronDown size={18} className="text-[#F3F4F6]" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-[#FFFFFF26] rounded-lg shadow-lg">
          {menuList.map(function (item) {
            return (
              <li
                key={item.id}
                className="px-4 py-2 cursor-pointer overflow-hidden text-gray-700 hover:bg-gray-100"
                onClick={function () {
                  handleSelect(item);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
