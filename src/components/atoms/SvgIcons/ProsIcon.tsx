import * as React from "react";

function ProsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="21"
      fill="none"
      viewBox="0 0 22 21"
    >
      <path
        fill="#F7002E"
        d="M11 0C5.225 0 .5 4.725.5 10.5S5.225 21 11 21s10.5-4.725 10.5-10.5S16.775 0 11 0zm0 18.9c-4.63 0-8.4-3.77-8.4-8.4 0-4.63 3.77-8.4 8.4-8.4 4.63 0 8.4 3.77 8.4 8.4 0 4.63-3.77 8.4-8.4 8.4zm4.82-13.041l-6.92 6.92-2.72-2.71L4.7 11.55l4.2 4.2 8.4-8.4-1.48-1.491z"
      ></path>
    </svg>
  );
}

const MemoProsIcon = React.memo(ProsIcon);
export default MemoProsIcon;