import { useState } from 'react';

const CustomHamburger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    if (!document.startViewTransition) {
      setIsOpen(!isOpen);
      return;
    }

    document.startViewTransition(() => {
      setIsOpen(!isOpen);
    });
  };
  return (
    <button
      onClick={handleToggle}
      className="flex flex-col gap-1.5 transition-all ease-in-out md:hidden"
    >
      <div
        className={`w-6 bg-white h-0.5 rounded-md transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        style={{ viewTransitionName: 'bar-1' }}
      />

      <div
        className={`w-6 bg-white h-0.5 rounded-md ${isOpen && '-translate-x-2 opacity-0 '}`}
        style={{ viewTransitionName: 'bar-2' }}
      />

      <div
        className={`w-6 bg-white h-0.5 rounded-md transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
        style={{ viewTransitionName: 'bar-3' }}
      />
    </button>
  );
};

export default CustomHamburger;
