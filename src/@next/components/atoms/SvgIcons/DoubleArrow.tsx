import * as React from "react";

function DoubleArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 9" fill="none" {...props}>
      <path
        d="M1.5 1L5 4.5 1.5 8M7 1l3.5 3.5L7 8"
        stroke="#56774D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoDoubleArrow = React.memo(DoubleArrow);
export default MemoDoubleArrow;
