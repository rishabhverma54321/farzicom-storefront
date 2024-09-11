import * as React from "react";

function GTCArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 30 10" fill="none" {...props}>
      <path
        d="M1.5 5H28M24 1l4 4-4 4"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoGTCArrow = React.memo(GTCArrow);
export default MemoGTCArrow;
