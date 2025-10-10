import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

function Filter({ placeholder, menuList = [], className = "", onChange }) {
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
    <div className="relative " ref={dropdownRef}>
      <button
        type="button"
        className={`h-12 w-full appearance-none rounded-[28px] px-4 pr-4 py-3
          border border-white 
          text-white flex items-center justify-betwee gap-x-1 focus:outline-none 
          ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selected ? "text-white" : "text-white font-bold text-sm"}`}>
          {selected ? selected.name : placeholder}
        </span>

        {/* custom react-icon */}
        <IoChevronDown size={14} className="text-[#F3F4F6]" />
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full  border-[#FFFFFF26] rounded-lg shadow-lg"
        >
          {menuList.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer my-0.5 overflow-hidden border-white border rounded-md w-full  text-white"
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

export default Filter;
