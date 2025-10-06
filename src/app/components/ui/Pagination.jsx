// import React from "react";

// const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange = () => {},}) => {

//   const getPages = () => {
//     const pages = [];
//     const maxVisible = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
      
//     }
//     return pages;
//   };

//   const pages = getPages();

//   return (
//     <div className="flex items-center gap-2 text-white select-none">
//       {/* Prev Button */}
//       <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`w-9 md:w-12 h-9 md:h-12 flex items-center justify-center aspect-square border border-[#D1D5DC] rounded-md transition-all mr-2  ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100/20 active:scale-95"} `} aria-label="Previous" >
//         <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
//           <path d="M11 1L2 9.24242L11 17" stroke="#D1D5DC" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
//         </svg>
//       </button>

//       {/* Page Numbers */}
//       <div className="flex gap-2 text-sm md:text-base">
//         {pages.map((page, index) => (
//          <button key={index} type="button" onClick={() => typeof page === "number" ? onPageChange(page) : null}  disabled={page === "..."} className={`w-9 md:w-12 h-9 md:h-12 flex items-center justify-center aspect-square rounded-md transition-all ${  page === currentPage  ? "bg-[#9C39FC] text-white" : page === "..." ? "text-gray-400 cursor-default"   : "border border-[#D1D5DC] hover:bg-gray-100/20 active:scale-95"  }`} >
//             {page}
//           </button>
//         ))}
//       </div>

//       {/* Next Button */}
//       <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}  className={`w-9 md:w-12 h-9 md:h-12 flex items-center justify-center aspect-square border border-[#D1D5DC] rounded-md transition-all ml-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100/20 active:scale-95"} `} aria-label="Next">
//         <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
//           <path d="M1 1L10 9.24242L1 17" stroke="#D1D5DC" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default Pagination;




// ---------------------------------------------------------------------------------------


import React from 'react'

const Pagination = () => {
  return (
    <div class="flex items-center gap-2">
            <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center active:scale-95 aspect-square bg-white/9 border border-[#D1D5DC] rounded-md hover:bg-gray-100/20 transition-all mr-4"  aria-label="Previous">
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L2 9.24242L11 17" stroke="#D1D5DC" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>

        <div class="flex gap-4 text-white text-sm md:text-base">
            <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center active:scale-95  aspect-square bg-white/9 border border-[#D1D5DC] rounded-md hover:bg-gray-100/20 transition-all">1</button>
            <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center active:scale-95 aspect-square bg-[#9C39FC] text-white rounded-md transition-all">2</button>
            <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center active:scale-95  aspect-square bg-white/9 border border-[#D1D5DC]DC] rounded-md hover:bg-gray-100/20 transition-all">3</button>
            <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center text-white transition-all">...</button>
            <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center active:scale-95  aspect-square bg-white/9 border border-[#D1D5DC] rounded-md hover:bg-gray-100/20 transition-all">99</button>
        </div>

        <button type="button" class="w-9 md:w-12 h-9 md:h-12 flex items-center justify-center active:scale-95 aspect-square bg-white/9 border border-[#D1D5DC] rounded-md hover:bg-gray-100/20 transition-all ml-4"  aria-label="Next">
            <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L10 9.24242L1 17" stroke="#D1D5DC" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    </div>
)
}

export default Pagination

