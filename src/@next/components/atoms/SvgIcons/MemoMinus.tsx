import React from "react";

export default function MemoMinus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="2"
      fill="none"
      viewBox="0 0 14 2"
      {...props}
    >
      <path
        stroke="#CCC"
        strokeLinecap="round"
        strokeWidth="1.3"
        d="M1 1h12"
      ></path>
    </svg>
  );
}
