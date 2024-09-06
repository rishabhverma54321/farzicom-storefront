import * as React from "react";

function ArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 34 34" fill="none" {...props}>
      <circle cx={17} cy={17} r={16.5} fill="#EB9220" stroke="#fff" />
      <path
        d="M15 21.25l4.5-4.5-4.5-4.5"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoArrowUp = React.memo(ArrowUp);
export default MemoArrowUp;
