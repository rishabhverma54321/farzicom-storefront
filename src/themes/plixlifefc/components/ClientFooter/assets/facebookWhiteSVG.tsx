import * as React from "react";

function facebookWhiteSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.65588 8.60953L8.04004 6.08502H5.59784V4.43859C5.59784 3.72514 5.92713 3.06657 7.02475 3.06657H8.1498V0.898777C8.1498 0.898777 7.13451 0.706694 6.17409 0.706694C4.17094 0.706694 2.8538 1.94151 2.8538 4.13675V6.08502H0.603689V8.60953H2.8538V14.7562H5.59784V8.60953H7.65588Z" fill="white"/>
    </svg>
  );
}

const MemofacebookWhiteSVG = React.memo(facebookWhiteSVG);
export default MemofacebookWhiteSVG;
