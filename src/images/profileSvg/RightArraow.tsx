import * as React from "react";

function RightArraow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 11 11" fill="none" {...props}>
      <path
        d="M5.5.833l-.823.823 3.255 3.26H.833v1.167h7.1L4.676 9.345l.823.823L10.166 5.5 5.5.833z"
        fill="#000"
      />
    </svg>
  );
}

const MemoRightArraow = React.memo(RightArraow);
export default MemoRightArraow;
