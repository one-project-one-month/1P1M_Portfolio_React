import { searchIconUrl } from "@/assets/icons/iconUrls";
import { forwardRef } from "react";

const SearchInput = forwardRef(({ placeholder = "Search...", className = "" ,value,onChange,props}, ref) => {
  return (
    <div
      className={`flex items-center gap-x-2 
        h-12 rounded-lg px-4 
        bg-[#FFFFFF17] border border-[#FFFFFF26] 
        text-white ${className}`}
    >
      <img src={searchIconUrl} alt="Search Icon" className="w-5 h-5 opacity-80" />

      <input
      {...props}
        ref={ref}
        value={value}
        onChange={onChange}
        type="search"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-white text-sm placeholder:text-[#6A7282]"
      />
    </div>
  );
});


export default SearchInput;
