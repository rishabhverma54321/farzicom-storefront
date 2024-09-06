import * as React from "react";

function DownArrowBig(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="15"
      viewBox="0 0 24 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 2C21.5 2.5 15.125 8.875 12 12L2 2"
        stroke="#2C2C2C"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoDownArrowBig = React.memo(DownArrowBig);
export default MemoDownArrowBig;
