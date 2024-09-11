import * as React from "react";

function p2SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="38" height="24" fill="none" data-src="/images/p2.svg"><path fill="url(#pattern0-102)" d="M0 0h38v24H0z"></path><defs><pattern id="pattern0-102" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlinkHref="#image0_128:4228" transform="scale(.02632 .04167)"></use></pattern><image id="image0_128:4228" width="38" height="24" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAAB2klEQVRIDe2Xu04CQRSGD500IIkvoIW1lwcQH0BeQH0AL7Um2mqiFYmFdFhpRyeVdlqY2BFiYQdWdtDZLGu+yf4rIbs6mBAo9iTLzJydc+ab/8wmjJlZzszyZlY0s9KUHxjmLLJ8u93eCoKgE07ZYIBFcMVZgJImsJhZAdFKcs5KGx2nDMy7IJli3lJFE1MVu7x6Cnf2GuHC8oV7ajevce7nl47zrZSvw85Hz/UX16ruffPhPVxar8Zx9Hv9rziWGHKenD3GvqROKpgmt94+XaJypS5XeHB073zAAsJCbEKQWlibU+Bdo+Xm8r6yfSt3YvsnGFHaJX12T2IUos/ijIGUkqjEhkYNGHKhFjG/mReYErEwACRFNYzFGPMO0I1K3Y3xnZ7/lEvKEy/liEkzLzCVC3WkHmXDAOCRAadS4ycGk484KQtkmnmBqXw61DofUgGVRk0qM1fx2oRaqT4ay9gLjInDJUJBTCXRF4aau/uN8PC4GX+ZqKJzyHtAVf7VzZrLk/TjDSYFSC5TeQClRHyZWpgWcEzlH/4gBIeaSeYNlhQ8SV8GNq66mWL/VawwGAz64wZPan4QBF0zm+evtS4j3Ukt5psXqOgywq3NGVcmLgDTvr6hFFC5bwpca1Of9NbcAAAAAElFTkSuQmCC">
  </image></defs></svg>
  );
}

const Memop2SVG = React.memo(p2SVG);
export default Memop2SVG;
