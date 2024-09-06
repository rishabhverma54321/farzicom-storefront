import * as React from "react";

function LeftArrowSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 42 41" fill="none" {...props}>
      <g filter="url(#prefix__filter0_d)">
        <circle
          cx={25.5}
          cy={20.5}
          r={16.5}
          transform="rotate(-180 25.5 20.5)"
          fill="#fff"
        />
      </g>
      <path
        d="M28.317 24.927l-4.83-4.83 4.83-4.829"
        stroke="#56774D"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <filter
          id="prefix__filter0_d"
          x={0}
          y={0}
          width={42}
          height={41}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={-5} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0.629167 0 0 0 0 0.629167 0 0 0 0 0.629167 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

const MemoLeftArrowSVG = React.memo(LeftArrowSVG);
export default MemoLeftArrowSVG;
