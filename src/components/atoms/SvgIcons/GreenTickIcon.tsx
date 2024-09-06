import * as React from "react";

function GreenTickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3333 1.07429L4.19048 10.2171L0 6.02667L1.07429 4.95238L4.19048 8.06095L12.259 0L13.3333 1.07429Z"
        fill="#39B54A"
      />
    </svg>
  );
}

const MemoGreenTickIcon = React.memo(GreenTickIcon);
export default MemoGreenTickIcon;
