import * as React from "react";

function GreenArrowRightPlixTwo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 29 23" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.536 10.396c.619.61.619 1.598 0 2.208L18.45 22.543c-.619.61-1.622.61-2.24 0a1.546 1.546 0 010-2.209l7.38-7.272H0V9.938h23.59l-7.38-7.272a1.546 1.546 0 010-2.209 1.601 1.601 0 012.24 0l10.086 9.939z"
        fill="url(#prefix__paint0_radial_1:8385)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_1:8385"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-11.6688 -10.45108 20.8099 -23.23458 17.594 16.97)"
        >
          <stop stopColor="#69EA72" />
          <stop offset={1} stopColor="#A9EF82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const MemoGreenArrowRightPlixTwo = React.memo(GreenArrowRightPlixTwo);
export default MemoGreenArrowRightPlixTwo;
