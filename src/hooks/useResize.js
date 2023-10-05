import { useEffect, useState } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isLargeScreen: width > 768,
    isMediumScreen: width > 450 && width <= 768,
    isSmallScreen: width <= 450,
  };
};
