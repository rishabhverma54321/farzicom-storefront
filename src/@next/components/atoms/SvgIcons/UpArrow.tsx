import * as React from "react";

function UpArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 10" fill="none" {...props}>
      <path
        d="M16.5 8.5L9 1 1.5 8.5"
        stroke="#56774D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoUpArrow = React.memo(UpArrow);
export default MemoUpArrow;
