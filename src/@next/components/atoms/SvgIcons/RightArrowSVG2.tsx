import * as React from "react";

function RightArrowSVG2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-arrow-narrow-right"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12h14M15 16l4-4M15 8l4 4" />
    </svg>
  );
}

const MemoRightArrowSVG2 = React.memo(RightArrowSVG2);
export default MemoRightArrowSVG2;
