import * as React from "react";

function RightChevronPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 8 14" fill="none" {...props}>
      <path
        d="M1.531.5L7.25 6.469c.125.156.219.343.219.531a.737.737 0 01-.219.5l-5.719 5.969A.746.746 0 01.47 13.5c-.313-.281-.313-.75-.031-1.063l5.25-5.468L.438 1.53A.746.746 0 01.468.47.746.746 0 011.532.5z"
        fill="#69DE7A"
      />
    </svg>
  );
}

const MemoRightChevronPlix = React.memo(RightChevronPlix);
export default MemoRightChevronPlix;
