import * as React from "react";

function ReadMoreSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 9 6" fill="none" {...props}>
      <path
        d="M1 1l3.5 3.5L8 1"
        stroke="#56774D"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoReadMoreSVG = React.memo(ReadMoreSVG);
export default MemoReadMoreSVG;
