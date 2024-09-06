import * as React from "react";

function TruckComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 23 14" fill="none" {...props}>
      <path
        d="M3.5 1h12v5h5L22 7.5v4H3.5"
        stroke="#575757"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 2.5s2-.5 3 0 2 3.5 2 3.5"
        stroke="#575757"
        strokeLinejoin="round"
      />
      <circle cx={8.5} cy={11.5} r={2} fill="#fff" stroke="#575757" />
      <circle cx={16.5} cy={11.5} r={2} fill="#fff" stroke="#575757" />
      <path
        d="M3 4h6M1 7.5h5"
        stroke="#575757"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Truck = React.memo(TruckComponent);
export default Truck;
