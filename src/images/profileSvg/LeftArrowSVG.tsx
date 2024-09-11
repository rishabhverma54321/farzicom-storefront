import * as React from "react";

function LeftArrowSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M17.667 7.917H4.483L10.54 1.86 9.001.333.334 9l8.667 8.667 1.527-1.528-6.045-6.055h13.184V7.917z"
        fill="#A33A34"
      />
    </svg>
  );
}

const MemoLeftArrowSVG = React.memo(LeftArrowSVG);
export default MemoLeftArrowSVG;
