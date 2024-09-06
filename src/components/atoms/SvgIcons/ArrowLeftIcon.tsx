import * as React from "react";

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="19"
      fill="none"
      viewBox="0 0 22 19"
    >
      <path
        fill="#FEFFED"
        d="M21.953 10c0 .844-.656 1.5-1.453 1.5H6.11l4.921 4.969c.61.562.61 1.547 0 2.11A1.454 1.454 0 0110 19c-.422 0-.797-.14-1.078-.422l-7.5-7.5a1.445 1.445 0 010-2.11l7.5-7.5a1.445 1.445 0 012.11 0c.609.563.609 1.548 0 2.11L6.108 8.5H20.5c.797 0 1.453.703 1.453 1.5z"
      ></path>
    </svg>
  );
}

const MemoArrowLeftIcon = React.memo(ArrowLeftIcon);
export default MemoArrowLeftIcon;