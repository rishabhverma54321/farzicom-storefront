import * as React from "react";

function DownArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 10" fill="none" {...props}>
      <path
        d="M1.5 1L9 8.5 16.5 1"
        stroke="#56774D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoDownArrow = React.memo(DownArrow);
export default MemoDownArrow;
