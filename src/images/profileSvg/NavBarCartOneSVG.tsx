import * as React from "react";

function NavBarCartOneSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 17" fill="none" {...props}>
      <path
        d="M5.833 13.413c-.916 0-1.658.75-1.658 1.667s.742 1.667 1.658 1.667c.917 0 1.667-.75 1.667-1.667s-.75-1.667-1.667-1.667zM.833.08v1.667H2.5l3 6.325-1.125 2.041a1.611 1.611 0 00-.208.8c0 .917.75 1.667 1.666 1.667h10v-1.667h-9.65a.206.206 0 01-.208-.208l.025-.1.75-1.358h6.208c.625 0 1.175-.342 1.459-.859L17.4 2.98a.836.836 0 00-.733-1.233H4.342L3.558.08H.833zm13.334 13.333c-.917 0-1.659.75-1.659 1.667s.742 1.667 1.659 1.667c.916 0 1.666-.75 1.666-1.667s-.75-1.667-1.666-1.667z"
        fill="#A33A34"
      />
    </svg>
  );
}

const MemoNavBarCartOneSVG = React.memo(NavBarCartOneSVG);
export default MemoNavBarCartOneSVG;
