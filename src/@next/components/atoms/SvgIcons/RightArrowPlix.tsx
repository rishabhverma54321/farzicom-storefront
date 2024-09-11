import * as React from "react";

function RightArrowPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 63 53" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.992 23.955c1.344 1.406 1.344 3.684 0 5.09l-21.91 22.901a3.338 3.338 0 01-4.869 0c-1.344-1.405-1.344-3.684 0-5.09L51.246 30.1H0V22.9h51.246L35.213 6.143c-1.344-1.405-1.344-3.684 0-5.089a3.338 3.338 0 014.869 0l21.91 22.901z"
        fill="url(#prefix__paint0_radial_1:9760)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_1:9760"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-25.34921 -24.08327 48.1821 -50.7148 38.222 39.103)"
        >
          <stop stopColor="#69EA72" />
          <stop offset={1} stopColor="#A9EF82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const MemoRightArrowPlix = React.memo(RightArrowPlix);
export default MemoRightArrowPlix;
