import * as React from "react";

function SavingsRupees(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 25 19" fill="none" {...props}>
      <rect width={23} height={19} rx={2} fill="#60B246" />
      <path
        d="M19.5 10.028c0-1.181.958-2.14 2.139-2.14h2.816c.025 0 .045.021.045.046v4.187c0 .025-.02.046-.046.046H21.64a2.139 2.139 0 01-2.139-2.14z"
        fill="#60B246"
        stroke="#60B246"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.27 11.056a1.028 1.028 0 100-2.056h-1.197a.371.371 0 00-.371.371v1.314c0 .205.166.37.37.37h1.198z"
        fill="#EEF6E8"
      />
      <path
        d="M14 6.333V5.278H8v1.055h1.91c.71 0 1.309.443 1.534 1.056H8v1.055h3.444c-.111.308-.32.575-.594.764a1.67 1.67 0 01-.94.292H8v1.274l3.047 2.948h1.542l-3.272-3.166h.592c.628-.001 1.237-.212 1.724-.596.487-.385.821-.92.948-1.516H14V7.39h-1.42a2.566 2.566 0 00-.503-1.056H14z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoSavingsRupees = React.memo(SavingsRupees);
export default MemoSavingsRupees;
