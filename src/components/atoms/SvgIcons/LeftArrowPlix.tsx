import * as React from "react";

function LeftArrowPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 63 53" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.008 29.045c-1.344-1.406-1.344-3.684 0-5.09l21.91-22.901a3.338 3.338 0 014.869 0c1.344 1.405 1.344 3.684 0 5.09L11.754 22.9H63V30.1H11.754l16.033 16.758c1.344 1.405 1.344 3.684 0 5.089a3.338 3.338 0 01-4.869 0L1.008 29.045z"
        fill="url(#prefix__paint0_radial_1:9761)"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial_1:9761"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(43.533 -5.014 37.977) scale(34.9655 69.9536)"
        >
          <stop stopColor="#69EA72" />
          <stop offset={1} stopColor="#A9EF82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const MemoLeftArrowPlix = React.memo(LeftArrowPlix);
export default MemoLeftArrowPlix;
