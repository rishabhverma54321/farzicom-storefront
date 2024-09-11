import * as React from "react";

function SideNavCrossSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoSideNavCrossSVG = React.memo(SideNavCrossSVG);
export default MemoSideNavCrossSVG;
