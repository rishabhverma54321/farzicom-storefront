import * as React from "react";

function ArrowActiveSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 34 34" fill="none" {...props}>
      <circle cx={17} cy={17} r={16.5} fill="#56774D" stroke="#fff" />
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

const MemoArrowActiveSVG = React.memo(ArrowActiveSVG);
export default MemoArrowActiveSVG;
