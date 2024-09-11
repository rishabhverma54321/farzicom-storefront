import * as React from "react";

function NavBarTruckOneSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 14" fill="none" {...props}>
      <path
        d="M16.667 3.58h-2.5V.247H2.5C1.583.247.833.997.833 1.913v9.167H2.5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5h5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5h1.667V6.913l-2.5-3.333zM5 12.33c-.692 0-1.25-.558-1.25-1.25S4.308 9.83 5 9.83s1.25.558 1.25 1.25-.558 1.25-1.25 1.25zm11.25-7.5l1.633 2.083h-3.716V4.83h2.083zM15 12.33c-.692 0-1.25-.558-1.25-1.25s.558-1.25 1.25-1.25 1.25.558 1.25 1.25-.558 1.25-1.25 1.25z"
        fill="#A33A34"
      />
    </svg>
  );
}

const MemoNavBarTruckOneSVG = React.memo(NavBarTruckOneSVG);
export default MemoNavBarTruckOneSVG;
