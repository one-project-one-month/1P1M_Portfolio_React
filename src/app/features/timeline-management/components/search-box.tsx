import { Search } from 'lucide-react';
import React, { useState } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const searchPlaceholder = 'Search...';

  return (
    <>
      {/* Desktop Search Box */}
      <div className="w-full h-10 hidden md:flex items-center border border-white/20 bg-white/5 rounded-md overflow-hidden px-3">
        <Search />
        <input
          type="text"
          className="w-full h-full bg-transparent text-white border-none outline-none placeholder-[#6A7282] transition-all duration-200 px-3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      {/* Mobile Search Toggle Box */}
      <div className="flex md:hidden items-center justify-center">
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="rounded-md border border-white/20 bg-white/10 p-2"
          aria-label="Toggle Search"
        >
          <Search />
        </button>
      </div>

      {showMobileSearch && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 md:hidden p-4">
          <input
            className="w-full rounded bg-white/10 text-white border border-white/20 p-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={searchPlaceholder}
            autoFocus
          />
        </div>
      )}
    </>
  );
};

export default SearchBox;
