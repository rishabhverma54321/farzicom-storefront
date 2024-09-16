import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(540); // Default width for server-side

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window?.innerWidth);
      };

      // Set initial width on client-side mount
      handleResize();

      // Add resize listener
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return [width];
};
