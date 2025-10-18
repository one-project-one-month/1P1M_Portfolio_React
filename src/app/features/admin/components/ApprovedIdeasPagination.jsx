import React from "react";

function ApprovedIdeasPagination({
  pagination,
  pageNumbers,
  onGoToPage,
  onGoToPreviousPage,
  onGoToNextPage,
}) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-6 flex-shrink-0">
      {/* Page info */}
      <div className="text-gray-400 text-sm">
        Page {pagination.currentPage} of {pagination.totalPages}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={onGoToPreviousPage}
          disabled={!pagination.hasPrevious}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-colors ${
            pagination.hasPrevious
              ? "bg-[#2D3748] hover:bg-[#4A5568] text-white"
              : "bg-[#1A202C] text-gray-500 cursor-not-allowed"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onGoToPage(page)}
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-colors font-medium text-sm md:text-base ${
                page === pagination.currentPage
                  ? "bg-purple-600 text-white"
                  : "bg-[#2D3748] hover:bg-[#4A5568] text-white"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={onGoToNextPage}
          disabled={!pagination.hasNext}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-colors ${
            pagination.hasNext
              ? "bg-[#2D3748] hover:bg-[#4A5568] text-white"
              : "bg-[#1A202C] text-gray-500 cursor-not-allowed"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ApprovedIdeasPagination;
