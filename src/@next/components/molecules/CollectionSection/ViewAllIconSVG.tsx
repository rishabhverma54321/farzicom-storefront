import * as React from "react";

function ViewAllIconSVG(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 7 11" fill="none" {...props}>
      <path
        d="M1 1l4 4.5L1 10"
        stroke="#1D2136"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoViewAllIconSVG = React.memo(ViewAllIconSVG);
export default MemoViewAllIconSVG;
