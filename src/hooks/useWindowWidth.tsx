import { useState, useEffect } from "react";

export const useWindowWidth = () => {
    const [width, setWidth] = useState(window?.innerWidth || 540);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window?.innerWidth);
      };
      handleResize();
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window?.innerWidth);
      };
      window?.addEventListener("resize", handleResize);

      return () => {
        window?.removeEventListener("resize", handleResize);
      };
    });

    return [width];
};
