import * as React from "react";

function RightChevronComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 6 10" fill="none" {...props}>
      <path d="M1 1l4 4-4 4" stroke="#2E3642" strokeLinecap="round" />
    </svg>
  );
}

const RightChevron = React.memo(RightChevronComponent);
export default RightChevron;
