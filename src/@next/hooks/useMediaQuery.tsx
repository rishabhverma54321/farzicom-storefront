import { useState, useCallback, useEffect } from "react";

const useMediaQuery = (
  width: number,
  widthType: "max-width" | "min-width" = "max-width"
) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(${widthType}: ${width}px)`);
    // media.addEventListener("change",updateTarget);
    media.onchange = e => {
      updateTarget(e);
    };

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    //return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};

export default useMediaQuery;
