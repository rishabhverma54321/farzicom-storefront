import * as React from "react";

function FastDeliverySVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 46 46" fill="none" {...props}>
      <circle cx={23} cy={23} r={23} fill="#E9EEBF" />
      <path
        d="M11 14.905L24.641 8 39 14.905m-28 0l14.359 6.905M11 14.904v14.5L25.359 37M39 14.905L25.359 21.81M39 14.904v14.5L25.359 37m0-15.19V37"
        stroke="#56774D"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoFastDeliverySVG = React.memo(FastDeliverySVG);
export default MemoFastDeliverySVG;
