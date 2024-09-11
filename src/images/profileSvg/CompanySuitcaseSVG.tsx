import * as React from "react";

function CompanySuitcaseSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 17" fill="none" {...props}>
      <path
        d="M15.667 4h-3.334V2.333A1.66 1.66 0 0010.667.667H7.333a1.66 1.66 0 00-1.666 1.666V4H2.333C1.408 4 .675 4.742.675 5.667l-.008 9.166A1.66 1.66 0 002.333 16.5h13.334a1.66 1.66 0 001.666-1.667V5.667A1.66 1.66 0 0015.667 4zm-5 0H7.333V2.333h3.334V4z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoCompanySuitcaseSVG = React.memo(CompanySuitcaseSVG);
export default MemoCompanySuitcaseSVG;
