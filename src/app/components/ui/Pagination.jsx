
import PaginationBtn from "./PaginationBtn"

import { arrowLeftIconUrl, arrowRightIconUrl } from "@/assets/icons/iconUrls";

const Pagination=({currentPage,total})=>{
    const range=[];

function getPageNumbers(current, totalPages) {
 
  const delta = 1;

  // Case 1: Show all pages if total ≤ 5
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
  }
  // Case 2: When current page > 1
  else if (current !== 1) {
    range.push(1); // always show first
    range.push(current); // current page
    if (current + delta < totalPages - 1) {
      range.push(current + delta);
      range.push("...");
    } else if (current + delta === totalPages - 1) {
      range.push(current + delta);
    }
    range.push(totalPages); // always show last
  }
  // Case 3: When current page = 1
  else {
    range.push(1);
    range.push(2);
    range.push(3);
    if (totalPages > 4) range.push("...");
    range.push(totalPages);
  }

  return range;
}

 getPageNumbers(currentPage,total)


    return(


    
        <div className="flex gap-x-3">
            <PaginationBtn >
                <img src={arrowLeftIconUrl} />
            </PaginationBtn>


            {range.map((page)=>(
                <PaginationBtn >{page}</PaginationBtn>
            ))}
            <PaginationBtn>
                <img src={arrowRightIconUrl} />
            </PaginationBtn>
        </div>
    )
}

export default Pagination;