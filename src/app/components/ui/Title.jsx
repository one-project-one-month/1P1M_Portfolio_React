import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'

const Title = ({
  title = "Page Title",
  onCreate = false,
  showSearch = true,
  showFilter = true,
  searchPlaceholder = "Search...",
  onSearchChange,
  filterOptions = [ "Popular", "Newest", "Oldest"],
  initSelectedFilter = "Popular",
  onFilterChange
}) => {
    const [selectedFilter, setSelectedFilter] = useState(initSelectedFilter);
    const [isOpen, setIsOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const menuRef = useRef(null);



    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const handleSelect = (option) => {
    setSelectedFilter(option);
    if (onFilterChange) onFilterChange(option);
  };

  return (
    
    <div className='relative w-full flex justify-between items-center gap-8 py-10'>

      <div className="flex w-2/3 h-11 justify-between items-center gap-8">
        <div className='relative text-nowrap'>
          <h1 className='text-3xl text-white'>{title}</h1>
          <div className="w-1/2 h-1.5 absolute -bottom-2 left-0 bg-[#FFBA00] rounded"></div>
        </div>

        {showSearch && (
          <div className="w-full h-full hidden md:flex items-center border border-white/20 bg-white/9 rounded-md overflow-hidden px-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0776 14.0999L16.6444 16.6666M15.9036 9.6509C15.9036 13.14 13.0847 15.9685 9.60733 15.9685C6.12998 15.9685 3.31104 13.14 3.31104 9.6509C3.31104 6.16179 6.12998 3.33331 9.60733 3.33331C13.0847 3.33331 15.9036 6.16179 15.9036 9.6509Z" stroke ="#6A7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <input
              type="text"
              placeholder={searchPlaceholder}
              className='w-full h-full bg-transparent text-white px-3 border-none outline-none placeholder-[#6A7282] transition-all duration-200'
              onChange={onSearchChange}
            />
          </div>
        )}

        {showSearch && (
          <div className="flex md:hidden items-center justify-center">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 rounded-md border border-white/20 bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.0776 14.0999L16.6444 16.6666M15.9036 9.6509C15.9036 13.14 13.0847 15.9685 9.60733 15.9685C6.12998 15.9685 3.31104 13.14 3.31104 9.6509C3.31104 6.16179 6.12998 3.33331 9.60733 3.33331C13.0847 3.33331 15.9036 6.16179 15.9036 9.6509Z" stroke="#F9FAFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {showMobileSearch && (
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

      <div className="flex justify-center items-center gap-4">
        {onCreate && (
          <Button
            variant='primary'
            size="primary"
            className='h-[44px]'
            onClick={onCreate}
          >
            Create
          </Button>
        )}

        {showFilter && (
          <div ref={menuRef} className="relative text-[#F9FAFB] select-none">
            <div className="flex justify-center items-center border border-[#99A1AF] rounded-full px-4 py-2 cursor-pointer" onClick={()=> setIsOpen(!isOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17H14" stroke="#F9FAFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 12H17" stroke="#F9FAFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 7H19.5" stroke="#F9FAFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <p className='ms-2'>Filters</p>
            </div>

            {isOpen && (
              <div className="absolute right-0 w-[187px] bg-[#080D22] cursor-pointer rounded-lg shadow-md mt-2">
                {filterOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`rounded border border-[#99A1AF] rounded flex items-center gap-2 ps-8 px-2 py-1`}
                    onClick={() => handleSelect(option)}
                  >
                    {option === selectedFilter && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Title
