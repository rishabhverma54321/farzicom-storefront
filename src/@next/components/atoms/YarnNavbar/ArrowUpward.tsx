import * as React from "react";

function ArrowUpwardSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="14px" height="14px" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M3.333 10l1.175 1.175 4.659-4.65v10.141h1.667V6.525l4.65 4.658L16.666 10 10 3.333 3.333 10z"
        fill="#33A532"
      />
    </svg>
  );
}

const ArrowUpward = React.memo(ArrowUpwardSVG);
export default ArrowUpward;
