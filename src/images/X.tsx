import * as React from "react";

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.071 5.657L1.414 0 0 1.414l5.657 5.657L0 12.728l1.414 1.414 5.657-5.657 5.657 5.657 1.414-1.414L8.485 7.07l5.657-5.657L12.728 0 7.07 5.657z"
        fill="#C4C4C4"
      />
    </svg>
  );
}

const MemoX = React.memo(X);
export default MemoX;
