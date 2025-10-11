// hooks/useBreakpoint.js
import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 576,//640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(() => {
    const width = window.innerWidth;
    return Object.entries(breakpoints)
      .reverse()
      .find(([_, breakpoint]) => width >= breakpoint)?.[0] || 'xs';
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoint = Object.entries(breakpoints)
        .reverse()
        .find(([_, breakpoint]) => width >= breakpoint)?.[0] || 'xs';

      setCurrentBreakpoint(breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
};