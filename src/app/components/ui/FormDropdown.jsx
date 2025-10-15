import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

function FormDropdown({ placeholder, menuList = [], className = "", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    if (onChange) onChange(item);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`h-12 w-full appearance-none rounded-lg px-4 pr-4 py-3
          bg-[#FFFFFF17] border border-[#FFFFFF26]
          text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500
          ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selected ? "text-white" : "text-gray-400"}`}>
          {selected ? selected.name : placeholder}
        </span>

        {/* custom react-icon */}
        <IoChevronDown size={18} className="text-[#F3F4F6]" />
      </button>
x
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border border-[#FFFFFF26] rounded-lg shadow-lg"
        >
          {menuList.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer overflow-hidden text-gray-700"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FormDropdown;
