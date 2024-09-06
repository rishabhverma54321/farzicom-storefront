import * as React from "react";

function RightArrowSVG4(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 42 41" fill="none" {...props}>
      <g filter="url(#prefix__filter0_d_1_3)">
        <circle cx={16.5} cy={20.5} r={16.5} fill="#fff" />
        <circle cx={16.5} cy={20.5} r={16} stroke="#F9F9F9" />
      </g>
      <path
        d="M13.683 16.073l4.83 4.83-4.83 4.829"
        stroke="#686B78"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <defs>
        <filter
          id="prefix__filter0_d_1_3"
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
          <feOffset dx={5} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0.629167 0 0 0 0 0.629167 0 0 0 0 0.629167 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_3" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1_3"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

const MemoRightArrowSVG4 = React.memo(RightArrowSVG4);
export default MemoRightArrowSVG4;
