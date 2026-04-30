import { useState, useEffect } from "react";

/**
 * Returns true if the screen width is less than or equal to the breakpoint.
 * @param breakpoint - The mobile breakpoint in pixels (defaults to 768px).
 */
export const useIsNative = (breakpoint = 768) => {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    
    if (typeof window === "undefined") return;

  
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    setIsNative(mediaQuery.matches);


    const handleResize = (event: MediaQueryListEvent) => {
      setIsNative(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);


    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [breakpoint]);

  return isNative;
};