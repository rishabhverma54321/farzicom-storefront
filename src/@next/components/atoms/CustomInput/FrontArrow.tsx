import * as React from "react";

function FrontArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-arrow-narrow-left"
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
      <path d="M5 12h14M5 12l4 4M5 12l4-4" />
    </svg>
  );
}

const MemoFrontArrow = React.memo(FrontArrow);
export default MemoFrontArrow;
