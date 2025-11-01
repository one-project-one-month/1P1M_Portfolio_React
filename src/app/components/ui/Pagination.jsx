import React from "react";
import RightIcon from "@/assets/icons/right-pagination.png";
import LeftIcon from "@/assets/icons/left-pagination.png";

export default function Pagination({ totalPages = 1, currentPage, onPageChange }) {
  const finalTotalPages = Math.max(totalPages, 1);

  const getPageNumbers = () => {
    if (finalTotalPages <= 6) {
      // Render all pages if small total
      return Array.from({ length: finalTotalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", finalTotalPages];
    }

    if (currentPage >= finalTotalPages - 2) {
      return [
        1,
        "...",
        finalTotalPages - 3,
        finalTotalPages - 2,
        finalTotalPages - 1,
        finalTotalPages,
      ];
    }

    // Middle section
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      finalTotalPages,
    ];
  };

  const ArrowButton = ({ icon, onClick, disabled, alt }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors duration-200 
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-[#2A2E38]"} bg-[#1C1F26]`}
    >
      <img src={icon} alt={alt} className="w-[40px] h-[40px]" />
    </button>
  );

  if (finalTotalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <ArrowButton
        icon={LeftIcon}
        alt="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-[4px] text-sm font-medium transition-colors 
              ${
                currentPage === page
                  ? "bg-[#9C39FC] text-white font-semibold"
                  : "bg-[#FFFFFF17] text-white border border-[#FFFFFF26] hover:bg-[#FFFFFF28]"
              }`}
          >
            {page}
          </button>
        )
      )}

      <ArrowButton
        icon={RightIcon}
        alt="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === finalTotalPages}
      />
    </div>
  );
}
