import React from "react";

const Pagination = ({ currentPage = 1, totalPages = 10,onPageChange}) => {

    const getPages = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
            pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

   const handlePageChange = (page) => {
    if (page === "..." || page < 1 || page > totalPages) return;
    onPageChange?.(page); 
  };

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 text-white select-none">
      {/* Prev Button */}
      <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`w-9 md:w-12 h-9 md:h-12 flex items-center justify-center aspect-square border border-[#D1D5DC] rounded-md transition-all mr-2  ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100/20 active:scale-95"} `} aria-label="Previous" >
        <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M11 1L2 9.24242L11 17" stroke="#D1D5DC" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2 text-sm md:text-base">
        {pages.map((page, index) => (
         <button key={index} type="button" onClick={() => typeof page === "number" ? handlePageChange(page) : null}  disabled={page === "..."} className={`w-9 md:w-12 h-9 md:h-12 flex items-center justify-center aspect-square rounded-md transition-all ${  page === currentPage  ? "bg-[#9C39FC] text-white" : page === "..." ? "text-gray-400 cursor-default"   : "border border-[#D1D5DC] hover:bg-gray-100/20 active:scale-95"  }`} >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}  className={`w-9 md:w-12 h-9 md:h-12 flex items-center justify-center aspect-square border border-[#D1D5DC] rounded-md transition-all ml-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100/20 active:scale-95"} `} aria-label="Next">
        <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M1 1L10 9.24242L1 17" stroke="#D1D5DC" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;