import * as React from "react";

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 18" fill="none" {...props}>
      <path fill="#E5E5E5" d="M0 0h18v18H0z" />
      <rect
        x={-4732.5}
        y={-3099.5}
        width={15692}
        height={6896}
        rx={20.5}
        fill="#ECECEC"
        stroke="#07F"
        strokeWidth={3}
      />
      <g clipPath="url(#prefix__clip0)">
        <path fill="#EFF0F0" d="M-1031-774H409v900h-1440z" />
        <g filter="url(#prefix__filter0_d)" clipPath="url(#prefix__clip1)">
          <g clipPath="url(#prefix__clip2)">
            <g filter="url(#prefix__filter1_d)">
              <rect
                x={-263}
                y={-688}
                width={650}
                height={732}
                rx={8}
                fill="#fff"
              />
              <rect
                x={-263}
                y={-290}
                width={650}
                height={304}
                rx={8}
                fill="#fff"
              />
              <path fill="#F4F8F9" d="M-263-22h650v36h-650z" />
            </g>
            <g filter="url(#prefix__filter2_d)">
              <path fill="#fff" d="M-263-26h650v70h-650z" />
              <path
                d="M9 17A8 8 0 109 1a8 8 0 000 16z"
                stroke="#005BC2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 13a4 4 0 100-8 4 4 0 000 8zM12 6l2.5-2.5M12 12l2.5 2.5M6 12l-2.5 2.5M6 6L3.5 3.5"
                stroke="#005BC2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path
            fill="#fff"
            transform="translate(-1031 -774)"
            d="M0 0h1440v900H0z"
          />
        </clipPath>
        <clipPath id="prefix__clip1">
          <path
            fill="#fff"
            transform="translate(-938 -688)"
            d="M0 0h1320v788H0z"
          />
        </clipPath>
        <clipPath id="prefix__clip2">
          <rect x={-263} y={-688} width={650} height={732} rx={8} fill="#fff" />
        </clipPath>
        <filter
          id="prefix__filter0_d"
          x={-279}
          y={-704}
          width={682}
          height={764}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={8} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter1_d"
          x={-279}
          y={-703}
          width={682}
          height={764}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={8} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter2_d"
          x={-307}
          y={-72}
          width={738}
          height={158}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={-2} />
          <feGaussianBlur stdDeviation={22} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

const MemoChatIcon = React.memo(ChatIcon);
export default MemoChatIcon;
