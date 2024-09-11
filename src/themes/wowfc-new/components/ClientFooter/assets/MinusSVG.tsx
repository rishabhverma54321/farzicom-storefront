import * as React from "react";

function MinusSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 2" fill="none" {...props}>
      <path d="M0 1h12" stroke="#282C3F" strokeWidth={1.7} />
    </svg>
  );
}

const MemoMinusSVG = React.memo(MinusSVG);
export default MemoMinusSVG;
