import * as React from "react";

function PlixPluxNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5417 4.58333H6.41667V0.458333C6.41667 0.229167 6.1875 0 5.95833 0H5.04167C4.78385 0 4.58333 0.229167 4.58333 0.458333V4.58333H0.458333C0.200521 4.58333 0 4.8125 0 5.04167V5.95833C0 6.21615 0.200521 6.41667 0.458333 6.41667H4.58333V10.5417C4.58333 10.7995 4.78385 11 5.04167 11H5.95833C6.1875 11 6.41667 10.7995 6.41667 10.5417V6.41667H10.5417C10.7708 6.41667 11 6.21615 11 5.95833V5.04167C11 4.8125 10.7708 4.58333 10.5417 4.58333Z"
        fill="url(#paint0_radial_752_22234)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_752_22234"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(4.32636 2.88436) rotate(48.475) scale(6.67637 13.2763)"
        >
          <stop stopColor="#69EA72" />
          <stop offset="1" stopColor="#A9EF82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const MemoPlixPluxNew = React.memo(PlixPluxNew);
export default MemoPlixPluxNew;
