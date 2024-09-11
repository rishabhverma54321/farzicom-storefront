import * as React from "react";

function ArrowDownSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 34 34" fill="none" {...props}>
      <circle cx={17} cy={17} r={16.5} stroke="#E5E5E5" />
      <path d="M12 15l4.5 4.5L21 15" stroke="#C9C9C9" strokeLinecap="round" />
    </svg>
  );
}

const MemoArrowDownSVG = React.memo(ArrowDownSVG);
export default MemoArrowDownSVG;
