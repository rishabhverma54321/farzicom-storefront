import * as React from "react";

function GoBackArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 27 14" fill="none" {...props}>
      <path
        d="M2 7h24M7 1L1 7l6 6"
        stroke="#2E3642"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoGoBackArrow = React.memo(GoBackArrow);
export default MemoGoBackArrow;
