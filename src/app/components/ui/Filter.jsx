import React from "react";
import filterIcon from "@/assets/icons/filter.png";

export default function FilterDropdown({
  isOpen,
  onToggle,
  onSelect,
  filters = [],
}) {
  return (
    <div className="relative inline-block text-left">
      {/* Filter Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 py-2 px-[14px]
        bg-gray-800 border border-[#FAFAFA] rounded-[28px] shadow-sm
        hover:bg-gray-700 transition-all duration-200"
      >
        <img src={filterIcon} alt="Filter" className="w-6 h-6" />
        <span className="font-bold leading-5 text-[#FAFAFA]">
          Filters
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-gray-800
          border border-gray-700 rounded-xl shadow-lg z-10"
        >
          {filters.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className="w-full text-left px-4 py-2 text-white
              hover:bg-gray-700 rounded-lg transition-colors duration-150"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
