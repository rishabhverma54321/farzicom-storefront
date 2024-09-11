import * as React from "react";

function ChevronDownNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="9"
      fill="none"
      viewBox="0 0 16 9"
    >
      <path
        fill="#BEBEBE"
        d="M8 9a.99.99 0 01-.719-.281l-6-6a.964.964 0 010-1.406.964.964 0 011.407 0L8 6.593l5.281-5.28a.964.964 0 011.406 0 .964.964 0 010 1.406l-6 6A.97.97 0 018 9z"
      ></path>
    </svg>
  );
}

const MemoChevronDownNew = React.memo(ChevronDownNew);
export default MemoChevronDownNew;
