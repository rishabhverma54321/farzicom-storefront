import * as React from "react";

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="15"
      fill="none"
      viewBox="0 0 10 15"
      {...props}
    >
      <path
        fill="#5DD37C"
        d="M2 14.77a.99.99 0 01-.719-.28.964.964 0 010-1.407l5.282-5.312L1.28 2.489a.964.964 0 010-1.406.964.964 0 011.407 0l6 6a.964.964 0 010 1.406l-6 6A.97.97 0 012 14.77z"
      ></path>
    </svg>
  );
}

const MemoChevronRight = React.memo(ChevronRight);
export default MemoChevronRight;
