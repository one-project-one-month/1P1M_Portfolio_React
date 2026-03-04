import type { TitleProps } from '@/types/title-props';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './button';

const Title = ({
  title = 'Page Title',
  onCreate = false,
  showSearch = true,
  showOrder = false,
  showFilter = true,
  searchPlaceholder = 'Search...',
  onSearchChange,
  selectedFilter,
  setSelectedFilter,
  selectedOrder,
  filterOptions,
  orderOptions = ['Popular', 'Newest', 'Oldest'],
  onFilterChange,
  onOrderChange,
}: TitleProps) => {
  const [isOpen, setIsOpen] = useState({
    order: false,
    filter: false,
  });

  const orderMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        orderMenuRef.current &&
        !orderMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen((prev) => ({ ...prev, order: false }));
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen((prev) => ({ ...prev, filter: false }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOrderSelect = (option: string) => {
    if (onOrderChange) onOrderChange(option);
    setIsOpen((prev) => ({ ...prev, order: false }));
  };

  const handleFilterSelect = (option: string) => {
    if (setSelectedFilter) setSelectedFilter(option);
    if (onFilterChange) onFilterChange(option);
    setIsOpen((prev) => ({ ...prev, filter: false }));
  };

  return (
    <div className="w-full py-6 space-y-4">
      {/* Row 1: Title + Create button */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
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

      {/* Row 2: Search bar + Filter pills — always full width */}
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
        <div className="flex items-center gap-2 shrink-0">
          {showOrder && (
            <div ref={orderMenuRef} className="relative select-none">
              <button
                className={`flex items-center gap-1.5 h-10 px-3.5 rounded-lg text-sm transition-colors duration-200 border ${
                  isOpen.order
                    ? 'bg-white/10 border-[#9C39FC]/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20'
                }`}
                onClick={() => setIsOpen({ ...isOpen, order: !isOpen.order })}
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">Order</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isOpen.order ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen.order && (
                <div className="absolute left-0 sm:right-0 sm:left-auto min-w-40 bg-[#0C1029] border border-white/10 rounded-lg shadow-2xl mt-1.5 z-20 overflow-hidden py-1">
                  {orderOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        option === selectedOrder
                          ? 'text-[#FFBA00] bg-white/5'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => handleOrderSelect(option)}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${option === selectedOrder ? 'bg-[#FFBA00]' : 'bg-transparent'}`}
                      />
                      <span className="capitalize">{option}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {showFilter && (
            <div ref={filterMenuRef} className="relative select-none">
              <button
                className={`flex items-center gap-1.5 h-10 px-3.5 rounded-lg text-sm transition-colors duration-200 border ${
                  isOpen.filter
                    ? 'bg-white/10 border-[#9C39FC]/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/20'
                }`}
                onClick={() => setIsOpen({ ...isOpen, filter: !isOpen.filter })}
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">Status</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isOpen.filter ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen.filter && (
                <div className="absolute left-0 sm:right-0 sm:left-auto min-w-40 bg-[#0C1029] border border-white/10 rounded-lg shadow-2xl mt-1.5 z-20 overflow-hidden py-1">
                  {filterOptions?.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                        option.value === selectedFilter
                          ? 'text-[#FFBA00] bg-white/5'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => handleFilterSelect(option.value)}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${option.value === selectedFilter ? 'bg-[#FFBA00]' : 'bg-transparent'}`}
                      />
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;
