import * as React from "react";

function GreenTickSvg(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M20 9.998l-2.264-2.514.354-3.365-3.31-.7L13.09.483 10 1.866 6.91.484 5.22 3.418l-3.31.701.354 3.365L0 9.998l2.264 2.514-.354 3.365 3.31.7 1.69 2.934 3.09-1.38 3.09 1.38 1.69-2.933 3.31-.701-.354-3.365L20 9.998zm-5.808-2.19l-5.02 5.624-3.487-3.488.83-.83 2.61 2.61 4.192-4.697.875.781z"
        fill="url(#prefix__paint0_radial_752_21350)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_752_21350"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(8.0474 8.64586 -17.27562 16.07981 7.866 5.474)"
        >
          <stop stopColor="#69EA72" />
          <stop offset={1} stopColor="#A9EF82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const MemoGreenTickSvg = React.memo(GreenTickSvg);
export default MemoGreenTickSvg;
