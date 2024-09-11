import * as React from "react";

function PlusSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M0 6h12M6 0v12" stroke="#282C3F" strokeWidth={1.7} />
    </svg>
  );
}

const MemoPlusSVG = React.memo(PlusSVG);
export default MemoPlusSVG;
