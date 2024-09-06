import * as React from "react";

function SideCirlcesPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 62 139" fill="none" {...props}>
      <circle cx={42.501} cy={42.4} r={41.4} stroke="#000" strokeWidth={2} />
      <path
        d="M83.901 94.659c0 23.431-18.557 42.386-41.4 42.386-22.842 0-41.4-18.955-41.4-42.386 0-23.431 18.558-42.386 41.4-42.386 22.843 0 41.4 18.955 41.4 42.386z"
        stroke="#000"
        strokeWidth={2}
      />
    </svg>
  );
}

const MemoSideCirlcesPlix = React.memo(SideCirlcesPlix);
export default MemoSideCirlcesPlix;
