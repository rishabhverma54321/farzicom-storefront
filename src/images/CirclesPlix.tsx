import * as React from "react";

function CirclesPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 77 25" fill="none" {...props}>
      <circle cx={12.5} cy={12.5} r={12} stroke="#9DEC9B" />
      <circle cx={24.5} cy={12.5} r={12} stroke="#9DEC9B" />
      <circle cx={64.5} cy={12.5} r={12.5} fill="#9DEC9B" />
    </svg>
  );
}

const MemoCirclesPlix = React.memo(CirclesPlix);
export default MemoCirclesPlix;
