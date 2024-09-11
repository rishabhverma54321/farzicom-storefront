import * as React from "react";

function PlusPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 39 39" fill="none" {...props}>
      <circle cx={19.5} cy={19.5} r={19.5} fill="#F7F7F7" />
      <path
        d="M25 21h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5h-5c-.55 0-1-.45-1-1s.45-1 1-1h5v-5c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
        fill="#000"
      />
    </svg>
  );
}

const MemoPlusPlix = React.memo(PlusPlix);
export default MemoPlusPlix;
