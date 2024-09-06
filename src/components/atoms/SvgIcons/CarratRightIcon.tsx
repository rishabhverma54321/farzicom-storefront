import * as React from "react";

function CaretRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="15"
      fill="none"
      viewBox="0 0 8 15"
    >
      <path
        fill="#FEFFED"
        d="M.027 13.322c0 .865.961 1.297 1.557.672l5.862-6.152a1.021 1.021 0 000-1.394L1.584.296C.988-.33.027.103.027.969V13.32z"
      ></path>
    </svg>
  );
}

const MemoCaretRightIcon = React.memo(CaretRightIcon);
export default MemoCaretRightIcon;