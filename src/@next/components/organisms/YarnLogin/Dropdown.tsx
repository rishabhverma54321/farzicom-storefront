import * as React from "react";

function DropdownSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="12px" height="18px" viewBox="0 0 10 6" fill="none" {...props}>
      <path d="M1 1l4 4 4-4" stroke="#A33A34" strokeLinecap="round" />
    </svg>
  );
}

const Dropdown = React.memo(DropdownSVG);
export default Dropdown;
