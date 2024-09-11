import * as React from "react";

function HamburgerNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 14" fill="none" {...props}>
      <path
        d="M1 1h16M1 7h16M1 13h16"
        stroke="#1D2136"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoHamburgerNew = React.memo(HamburgerNew);
export default MemoHamburgerNew;
