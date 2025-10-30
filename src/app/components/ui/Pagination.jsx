import React from "react";
import RightIcon from "@/assets/icons/right-pagination.png";
import LeftIcon from "@/assets/icons/left-pagination.png";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const finalTotalPages = Math.max( 1, Number(totalPages) || 1);
  const cur = Math.min(Math.max(1, Number(currentPage) || 1), finalTotalPages);

  const renderPages = () => {
    if (finalTotalPages <= 6) {
      return Array.from({ length: finalTotalPages }, (_, i) => {
        const page = i + 1;
        const isCurrent = page === cur;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-[4px] 
              transition-colors duration-300 text-sm font-medium ${
                isCurrent
                  ? "bg-[#9C39FC] text-white font-semibold"
                  : "bg-[#FFFFFF17] text-white border border-[#FFFFFF26] hover:bg-[#FFFFFF28]"
              }`}
          >
            {page}
          </button>
        );
      });
    }

    // For many pages, build the pattern with ellipses, but clamp values so they never go <1 or >finalTotalPages
    const pages = [];

    if (cur <= 3) {
      // beginning
      pages.push(1, 2, 3, 4, "...", finalTotalPages);
    } else if (cur >= finalTotalPages - 2) {
      // end
      pages.push(
        1,
        "...",
        Math.max(1, finalTotalPages - 3),
        Math.max(1, finalTotalPages - 2),
        Math.max(1, finalTotalPages - 1),
        finalTotalPages
      );
    } else {
      // middle
      pages.push(
        1,
        "...",
        Math.max(1, cur - 1),
        cur,
        Math.min(finalTotalPages, cur + 1),
        "...",
        finalTotalPages
      );
    }

    // Render
    return pages.map((page, idx) => {
      if (page === "...") {
        return (
          <span
            key={`dots-${idx}`}
            className="w-10 h-10 flex items-center justify-center text-gray-500 select-none"
          >
            ...
          </span>
        );
      }

      const isCurrent = cur === page;

      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-[4px] 
                        transition-colors duration-300 text-sm font-medium cursor-pointer
                        ${
                          isCurrent
                            ? "bg-[#9C39FC] text-white font-semibold"
                            : "bg-[#FFFFFF17] text-white border border-[#FFFFFF26] hover:bg-[#FFFFFF28]"
                        }`}
        >
          {page}
        </button>
      );
    });
  };

  const ArrowButton = ({ icon, onClick, disabled, altText }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-[4px] transition-colors duration-300 
                ${
                  disabled
                    ? "bg-[#1C1F26] opacity-30 cursor-not-allowed"
                    : "bg-[#1C1F26] hover:bg-[#2A2E38] opacity-100"
                }`}
    >
      <img src={icon} alt={altText} className="" />
    </button>
  );

  if (finalTotalPages <= 1) return null ;

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <ArrowButton
        icon={LeftIcon}
        altText="Previous Page"
        onClick={() => onPageChange(Math.max(cur - 1, 1))}
        disabled={cur === 1}
      />

      {renderPages()}

      <ArrowButton
        icon={RightIcon}
        altText="Next Page"
        onClick={() => onPageChange(Math.min(cur + 1, finalTotalPages))}
        disabled={cur === finalTotalPages}
      />
    </div>
  );
}
