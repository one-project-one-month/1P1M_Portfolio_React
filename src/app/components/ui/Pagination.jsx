import React from "react";
import RightIcon from "@/assets/icons/right-pagination.png";
import LeftIcon from "@/assets/icons/left-pagination.png";

const FIXED_TOTAL_PAGES = 99;

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  // const finalTotalPages = Math.max(totalPages || 1, FIXED_TOTAL_PAGES);
  const finalTotalPages = totalPages > 0 ? totalPages : FIXED_TOTAL_PAGES; 

  const renderPages = () => {
    const fixedPages = [];
    if (currentPage <= 3) {
      fixedPages.push(1, 2, 3, 4, "...", finalTotalPages);
    } else if (currentPage >= finalTotalPages - 2) {
      fixedPages.push(
        1,
        "...",
        finalTotalPages - 3,
        finalTotalPages - 2,
        finalTotalPages - 1,
        finalTotalPages
      );
    } else {
      fixedPages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        finalTotalPages
      );
    }

    const pagesToRender = fixedPages;

    return pagesToRender.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`dots-${index}`}
            className="w-10 h-10 flex items-center justify-center text-gray-500 select-none"
          >
            ...
          </span>
        );
      }

      const isCurrent = currentPage === page;

      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-[4px] 
                        transition-colors duration-300 text-sm font-medium
                        ${
                          isCurrent
                            ? "bg-[#9C39FC] text-white font-semibold" // Active Page
                            : "bg-[#FFFFFF17] text-white border border-[#FFFFFF26] hover:bg-[#FFFFFF28]" // Inactive Page
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
      className={`w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors duration-300 
                ${
                  disabled
                    ? "bg-[#1C1F26] opacity-30 cursor-not-allowed" // Disabled state
                    : "bg-[#1C1F26] hover:bg-[#2A2E38] opacity-100" // Active state
                }`}
    >
      <img src={icon} alt={altText} className="w-[40px] h-[40px]" />
    </button>
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <ArrowButton
        icon={LeftIcon}
        altText="Previous Page"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />

      {renderPages()}

      <ArrowButton
        icon={RightIcon}
        altText="Next Page"
        onClick={() => onPageChange(Math.min(currentPage + 1, finalTotalPages))}
        disabled={currentPage === finalTotalPages}
      />
    </div>
  );
}
