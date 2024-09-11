import * as React from "react";

function ArrowDownwardSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="14px" height="14px" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.666 10l-1.175-1.175-4.658 4.65V3.334H9.166v10.141l-4.65-4.658L3.334 10 10 16.667 16.666 10z"
        fill="#E31D38"
      />
    </svg>
  );
}

const ArrowDownward = React.memo(ArrowDownwardSVG);
export default ArrowDownward;
