import React, { type ReactNode } from "react";
import RightIcon from "@/assets/icons/right-pagination.png";
import LeftIcon from "@/assets/icons/left-pagination.png";

interface PaginationProps {
  totalPages: number | string;
  currentPage: number | string;
  onPageChange: (pageIndex: number) => void;
}

interface ArrowButtonProps {
  icon: string;
  onClick: () => void;
  disabled: boolean;
  altText: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps): React.ReactElement | null {
  const finalTotalPages = Math.max(1, Number(totalPages) || 1);
  
  
  const cur = Math.min(
    Math.max(1, Number(currentPage) + 1 || 1),
    finalTotalPages
  );

  const renderPages = (): ReactNode[] => {

    const baseButtonClasses = "w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors duration-300 text-sm font-medium";
    const activeClasses = "bg-[#9C39FC] text-white font-semibold";
    const inactiveClasses = "bg-[#FFFFFF17] text-white border border-[#FFFFFF26] hover:bg-[#FFFFFF28] cursor-pointer";

    if (finalTotalPages <= 6) {
      return Array.from({ length: finalTotalPages }, (_, i) => {
        const page = i + 1;
        const isCurrent = page === cur;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page - 1)}
            className={`${baseButtonClasses} ${isCurrent ? activeClasses : inactiveClasses}`}
          >
            {page}
          </button>
        );
      });
    }

    const pages: (number | string)[] = [];
    if (cur <= 3) {
      pages.push(1, 2, 3, 4, "...", finalTotalPages);
    } else if (cur >= finalTotalPages - 2) {
      pages.push(
        1,
        "...",
        Math.max(1, finalTotalPages - 3),
        Math.max(1, finalTotalPages - 2),
        Math.max(1, finalTotalPages - 1),
        finalTotalPages
      );
    } else {
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
          onClick={() => onPageChange(Number(page) - 1)}
          className={`${baseButtonClasses} ${isCurrent ? activeClasses : inactiveClasses}`}
        >
          {page}
        </button>
      );
    });
  };

  const ArrowButton = ({ icon, onClick, disabled, altText }: ArrowButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center rounded-[4px] transition-colors duration-300 ${
        disabled
          ? "bg-[#1C1F26] opacity-30 cursor-not-allowed"
          : "bg-[#1C1F26] hover:bg-[#2A2E38] cursor-pointer opacity-100"
      }`}
    >
      <img src={icon} alt={altText} />
    </button>
  );

  if (finalTotalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <ArrowButton
        icon={LeftIcon}
        altText="Previous Page"
        onClick={() => onPageChange(Math.max(cur - 2, 0))}
        disabled={cur === 1}
      />

      {renderPages()}

      <ArrowButton
        icon={RightIcon}
        altText="Next Page"
        onClick={() => onPageChange(Math.min(cur, finalTotalPages - 1))}
        disabled={cur === finalTotalPages}
      />
    </div>
  );
}