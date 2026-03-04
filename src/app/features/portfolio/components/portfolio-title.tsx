import { Button } from '@/components/ui/button';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
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
  initSelectedFilter = 'all',
  onFilterChange,
}: PortfolioTitleProps) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >(() =>
    filterConfig.reduce<Record<string, string>>((acc, filter, index) => {
      const defaultValue =
        index === 0 ? initSelectedFilter : (filter.options[0]?.value ?? '');
      acc[filter.key] = defaultValue;
      return acc;
    }, {}),
  );
  const [openFilterIndex, setOpenFilterIndex] = useState<number | null>(null);

  const menuRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleFilterToggle = (index: number) => {
    setOpenFilterIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSelect = (filterKey: string, option: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterKey]: option }));
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
    <div className="w-full pt-6 pb-8 space-y-4">
      {/* Row 1: Title + Create button */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white">
            {title}
          </h1>
          <div className="w-1/2 h-1 absolute -bottom-1.5 left-0 bg-[#FFBA00] rounded-full" />
        </div>

        {onCreate && (
          <Button
            variant="primary"
            size="primary"
            className="h-10 px-6 text-sm"
            onClick={onCreate}
          >
            Create
          </Button>
        )}
      </div>

      {/* Row 2: Search bar + Filter pills */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showSearch && (
          <div className="relative flex-1 min-w-0">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full h-10 bg-white/5 text-white text-sm pl-10 pr-4 rounded-lg border border-white/10 outline-none placeholder-white/30 transition-colors duration-200 focus:border-[#9C39FC]/50 focus:bg-white/[0.07]"
              onChange={onSearchChange}
            />
          </div>
        )}

        {/* Filter pills */}
        {showFilter && (
          <div className="flex items-center gap-2 shrink-0">
            {filterConfig.map((filter, index) => (
              <div
                key={filter.key}
                ref={(el) => {
                  menuRef.current[index] = el;
                }}
                className="relative select-none"
              >
                <button
                  className={`flex items-center gap-1.5 h-10 px-3.5 rounded-lg text-sm transition-colors duration-200 border ${
                    openFilterIndex === index
                      ? 'bg-white/10 border-[#9C39FC]/40 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20'
                  }`}
                  onClick={() => handleFilterToggle(index)}
                >
                  <SlidersHorizontal size={14} />
                  <span className="hidden sm:inline">{filter.label}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${openFilterIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>

                {openFilterIndex === index && (
                  <div className="absolute left-0 sm:right-0 sm:left-auto min-w-40 bg-[#0C1029] border border-white/10 rounded-lg shadow-2xl mt-1.5 z-20 overflow-hidden py-1">
                    {filter.options.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                          option.value === selectedFilters[filter.key]
                            ? 'text-[#FFBA00] bg-white/5'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => handleSelect(filter.key, option.value)}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${option.value === selectedFilters[filter.key] ? 'bg-[#FFBA00]' : 'bg-transparent'}`}
                        />
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioTitle;
