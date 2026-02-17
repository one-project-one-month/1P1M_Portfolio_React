import { Button } from '@/components/ui/button';
import { Flex } from '@radix-ui/themes';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

export type FilterConfig = {
  key: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export interface PortfolioTitleProps {
  title?: string;
  onCreate?: (() => void) | false;
  showSearch?: boolean;
  showFilter?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  filterConfig?: FilterConfig[];
  initSelectedFilter?: string;
  onFilterChange?: (key: string, value: string) => void;
}

const PortfolioTitle = ({
  title = 'Page Title',
  onCreate = false,
  showSearch = true,
  showFilter = true,
  searchPlaceholder = 'Search...',
  onSearchChange,
  filterConfig = [],
  onFilterChange,
}: PortfolioTitleProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  const menuRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleFilterToggle = (index: number) => {
    setOpenFilterIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSelect = (filterKey: string, option: string) => {
    setSelectedFilter(option);
    if (onFilterChange) onFilterChange(filterKey, option);
    setOpenFilterIndex(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.some((el) => el?.contains(event.target as Node))
    ) {
      setOpenFilterIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full flex md:flex-row flex-col justify-between items-center gap-8 pt-6 pb-10">
      {/* Title & Desktop Search Section */}
      <div className="flex w-2/3 h-11 justify-between items-center gap-5">
        <div className="relative text-nowrap">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white">
            {title}
          </h1>
          <div className="w-1/2 h-1.5 absolute -bottom-2 left-0 bg-[#FFBA00] rounded"></div>
        </div>

        {showSearch && (
          <>
            {/* Desktop Search */}
            <div className="w-full h-full hidden md:flex items-center border border-white/20 bg-white/5 rounded-md overflow-hidden px-3">
              <SearchIcon color="#6A7282" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full h-full bg-transparent text-white px-3 border-none outline-none placeholder-[#6A7282] transition-all duration-200"
                onChange={onSearchChange}
              />
            </div>

            {/* Mobile Search Toggle */}
            <div className="flex md:hidden items-center justify-center">
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="p-2 rounded-md border border-white/20 bg-white/10"
                aria-label="Toggle Search"
              >
                <SearchIcon color="#F9FAFB" />
              </button>
            </div>
          </>
        )}

        {/* Mobile Search Input Overlay */}
        {showMobileSearch && showSearch && (
          <div className="absolute -bottom-4 left-0 w-full flex md:hidden items-center border border-white/20 bg-white/10 rounded-md overflow-hidden px-3 z-10">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full h-10 bg-transparent text-white px-3 border-none outline-none placeholder-[#6A7282]"
              onChange={onSearchChange}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Actions Section (Create & Filter) */}
      <div className="flex justify-center items-center gap-4">
        {showFilter && (
          <Flex gap="4" className="flex">
            {filterConfig.map((filter, index) => (
              <div
                ref={(el) => {
                  menuRef.current[index] = el;
                }}
                className="relative text-[#F9FAFB] select-none"
              >
                <div
                  className="flex justify-center items-center border border-[#99A1AF] rounded-full px-4 py-2 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => handleFilterToggle(index)}
                >
                  <FilterIcon />
                  <p className="ms-2">{filter.label}</p>
                </div>
                {openFilterIndex === index && (
                  <div className="absolute right-0 w-46.75 bg-[#080D22] border border-white/10 cursor-pointer rounded-lg shadow-xl mt-2 z-20 overflow-hidden">
                    {filter.options.map((option) => (
                      <div
                        key={option.value}
                        className={`relative flex items-center gap-2 ps-10 px-4 py-2 hover:bg-white/10 transition-colors ${option.value === selectedFilter ? 'text-[#FFBA00]' : ''}`}
                        onClick={() => handleSelect(filter.key, option.value)}
                      >
                        {option.value === selectedFilter && <CheckIcon />}
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Flex>
        )}

        {onCreate && (
          <Button
            variant="primary"
            size="primary"
            className="h-11 w-full md:w-auto"
            onClick={onCreate}
          >
            Create
          </Button>
        )}
      </div>
    </div>
  );
};

// Internal Sub-components for cleaner JSX
const SearchIcon = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0776 14.0999L16.6444 16.6666M15.9036 9.6509C15.9036 13.14 13.0847 15.9685 9.60733 15.9685C6.12998 15.9685 3.31104 13.14 3.31104 9.6509C3.31104 6.16179 6.12998 3.33331 9.60733 3.33331C13.0847 3.33331 15.9036 6.16179 15.9036 9.6509Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 17H14"
      stroke="#F9FAFB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 12H17"
      stroke="#F9FAFB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 7H19.5"
      stroke="#F9FAFB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 absolute left-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default PortfolioTitle;
