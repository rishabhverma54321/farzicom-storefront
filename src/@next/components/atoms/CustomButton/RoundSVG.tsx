import * as React from "react";

function Roundsvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 21 21" fill="none" {...props}>
      <circle cx={10.5} cy={10.5} r={10.5} fill="#616161" />
    </svg>
  );
}

const RoundSVG = React.memo(Roundsvg);
export default RoundSVG;
