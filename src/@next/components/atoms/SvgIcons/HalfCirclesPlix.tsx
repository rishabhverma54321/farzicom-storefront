import * as React from "react";

function HalfCirclesPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 110 85" fill="none" {...props}>
      <path
        d="M1.01 83.613c.532-29.362 24.5-53 53.99-53 29.49 0 53.458 23.638 53.991 53H1.009z"
        stroke="#000"
        strokeWidth={2}
      />
      <path
        d="M1.01 54C1.541 24.638 25.51 1 55 1c29.49 0 53.458 23.638 53.991 53H1.009z"
        stroke="#000"
        strokeWidth={2}
      />
    </svg>
  );
}

const MemoHalfCirclesPlix = React.memo(HalfCirclesPlix);
export default MemoHalfCirclesPlix;
