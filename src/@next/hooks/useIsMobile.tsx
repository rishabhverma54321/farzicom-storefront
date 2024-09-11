import { useWindowWidth } from "@hooks/useWindowWidth";
import { largeScreen } from "@styles/constants";

export const useIsMobile = () => {
  const breakpoint = largeScreen;
  const [width] = useWindowWidth();

  return width < breakpoint;
};
