import * as React from "react";

function DropdownIndicator(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 9 6" fill="none" {...props}>
      <path d="M1 1l3.5 3.5L8 1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

const MemoDropdownIndicator = React.memo(DropdownIndicator);
export default MemoDropdownIndicator;
