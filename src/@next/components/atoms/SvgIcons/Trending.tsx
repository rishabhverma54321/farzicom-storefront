import * as React from "react";

function Trending(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 9" fill="none" {...props}>
      <path
        d="M8.03 6.31c.14.141.332.22.53.22H9a.75.75 0 00.53-.22l3.53-3.53 1.72 1.72V0h-4.5L12 1.72 8.78 4.94 6.53 2.69A.75.75 0 006 2.47h-.44a.75.75 0 00-.53.22L0 7.72l1.06 1.06 4.72-4.72 2.25 2.25z"
        fill="#000"
      />
    </svg>
  );
}

const MemoTrending = React.memo(Trending);
export default MemoTrending;
