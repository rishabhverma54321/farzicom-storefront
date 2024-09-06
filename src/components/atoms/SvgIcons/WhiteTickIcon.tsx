import * as React from "react";

function WhiteTickComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z"
        fill="#FEFFED"
      />
    </svg>
  );
}

const MemoWhiteTick = React.memo(WhiteTickComponent);
export default MemoWhiteTick;
