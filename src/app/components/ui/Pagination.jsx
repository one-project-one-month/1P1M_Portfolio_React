import React, { useState, useEffect } from "react";

import Pagination from "./components/Pagination";

// Example usage

// function App() {
//   const handlePageChange = (pageNumber) => {
//     console.log("Current page:", pageNumber);
//     // 🔹 fetch new data or navigate, e.g.:
//     // fetch(`/api/items?page=${pageNumber}`)
//   };

//   return (
//     <div>
//       <Pagination totalItems={45} itemsPerPage={3} onPageChange={handlePageChange} />
//     </div>
//   );
// }

function Pagination({ totalItems = 30, itemsPerPage = 3, onPageChange }) {
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const [displayNum, setDisplayNum] = useState([1, 2, 3, "...", totalPage]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔁 Call parent callback when currentPage changes
  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      if (nextPage > totalPage) return prevPage;

      setDisplayNum((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        if (
          newDisplay[0] === totalPage - 4 &&
          JSON.stringify(newDisplay) !== JSON.stringify([6, 7, 8, 9, 10])
        ) {
          newDisplay.splice(3, 1);
          newDisplay.splice(3, 0, nextPage + 1);
          return newDisplay;
        }
        if (!prevDisplay.includes(nextPage) && nextPage <= totalPage) {
          newDisplay.shift();
          newDisplay.splice(2, 0, nextPage);
          return newDisplay;
        }
        return prevDisplay;
      });

      return nextPage;
    });
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => {
      const prev = prevPage - 1;
      if (prev < 1) return prevPage;

      setDisplayNum((prevDisplay) => {
        const newDisplay = [...prevDisplay];
        if (newDisplay[0] === totalPage - 5 && !newDisplay.includes("...")) {
          newDisplay.splice(3, 1);
          newDisplay.splice(3, 0, "...");
          return newDisplay;
        }
        if (!prevDisplay.includes(prev) && prev >= 1) {
          newDisplay.splice(2, 1);
          newDisplay.unshift(prev);
          return newDisplay;
        }
        return prevDisplay;
      });

      return prev;
    });
  };

  const handleNum = (num) => setCurrentPage(num);

  const TotalClick = (num) => {
    setCurrentPage(num);
    setDisplayNum(() => {
      const newDisplay = [];
      for (let i = totalPage - 4; i <= totalPage; i++) {
        if (i > 0) newDisplay.push(i);
      }
      return newDisplay;
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020618]">
      <ul className="flex w-[376px] justify-between list-none p-0 m-0">
        {/* Prev Button */}
        <li
          onClick={() => currentPage > 1 && handlePrev()}
          className={`flex items-center justify-center w-10 h-10 rounded-md border border-white/15 font-semibold text-white text-[16px] select-none transition-all ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-[#B35CFF]"
          }`}
        >
          &lt;
        </li>

        {/* Page Numbers */}
        {displayNum.map((num, index) => (
          <li
            key={index}
            onClick={() =>
                num === "..." ? undefined : 
                num === totalPage ? TotalClick(num) : 
                handleNum(num)
                //   num === totalPage ? TotalClick(num) : handleNum(num)
            }
            className={`flex items-center justify-center w-10 h-10 rounded-md border border-white/15 font-semibold text-white text-[16px] select-none transition-all ${
              currentPage === num
                ? "bg-[#9C39FC] font-bold"
                : "cursor-pointer hover:bg-[#B35CFF]"
            }`}
          >
            {num}
          </li>
        ))}

        {/* Next Button */}
        <li
          onClick={() => currentPage < totalPage && handleNext()}
          className={`flex items-center justify-center w-10 h-10 rounded-md border border-white/15 font-semibold text-white text-[16px] select-none transition-all ${
            currentPage === totalPage
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-[#B35CFF]"
          }`}
        >
          &gt;
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
