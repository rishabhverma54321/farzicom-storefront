import * as React from "react";

function MinusPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 39 39" fill="none" {...props}>
      <circle cx={19.5} cy={19.5} r={19.5} fill="#F7F7F7" />
      <path
        d="M26 20H14c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
        fill="#000"
      />
    </svg>
  );
}

const MemoMinusPlix = React.memo(MinusPlix);
export default MemoMinusPlix;
