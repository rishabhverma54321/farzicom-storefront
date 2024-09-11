import * as React from "react";

function Downsvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="11.75px"
      height="8.5px"
      viewBox="0 0 8 5"
      fill="none"
      {...props}
    >
      <path d="M.25.5L4 4.25 7.75.5H.25z" fill="#909191" />
    </svg>
  );
}

const DownSVG = React.memo(Downsvg);
export default DownSVG;
