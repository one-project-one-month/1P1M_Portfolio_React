import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string; // For the tooltip bubble
  arrowClassName?: string; // For the tooltip arrow
}

const Tooltip = ({
  content,
  children,
  className,
  arrowClassName,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center justify-start w-fit"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap">
          <div
            className={cn(
              'relative bg-[#64748B] text-white text-sm px-3 py-2 rounded-md shadow-xl border border-white/10',
              className,
            )}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#64748B]',
                arrowClassName,
              )}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
