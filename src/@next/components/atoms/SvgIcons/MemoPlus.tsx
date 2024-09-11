import React from "react";

export default function MemoPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      fill="none"
      viewBox="0 0 14 15"
      {...props}
    >
      <path
        fill="#CCC"
        d="M7.076.733a.755.755 0 00-.756.756l-.005 5.24H1.069a.756.756 0 000 1.513h5.246v5.245a.756.756 0 101.512 0V8.242h5.246a.757.757 0 000-1.513H7.827V1.484a.76.76 0 00-.75-.751z"
      ></path>
    </svg>
  );
}
