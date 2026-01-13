import React from 'react';

interface HamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CustomHamburger: React.FC<HamburgerProps> = ({ isOpen=false, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label="Toggle Menu"
      className="flex flex-col gap-1.5 transition-all ease-in-out md:hidden z-101"
    >
      <div
        className={`w-6 bg-white h-0.5 rounded-md transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
        style={{ viewTransitionName: 'bar-1' }}
      />
      <div
        className={`w-6 bg-white h-0.5 rounded-md transition-all duration-300 ${
          isOpen ? '-translate-x-2 opacity-0' : 'opacity-100'
        }`}
        style={{ viewTransitionName: 'bar-2' }}
      />
      <div
        className={`w-6 bg-white h-0.5 rounded-md transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
        style={{ viewTransitionName: 'bar-3' }}
      />
    </button>
  );
};

export default CustomHamburger;