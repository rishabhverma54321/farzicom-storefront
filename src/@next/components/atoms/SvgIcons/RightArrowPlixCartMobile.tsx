import * as React from "react";

function RightArrowPlixCartMobile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 5 9" fill="none" {...props}>
      <path
        d="M0 8.249c0 .535.625.803 1.012.416l3.81-3.81a.61.61 0 000-.862L1.011.183A.587.587 0 000 .6v7.649z"
        fill="#69ea72"
      />
    </svg>
  );
}

const MemoRightArrowPlixCartMobile = React.memo(RightArrowPlixCartMobile);
export default MemoRightArrowPlixCartMobile;
