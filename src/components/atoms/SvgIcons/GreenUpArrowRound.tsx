import * as React from "react";

function GreenUpArrowRound(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="14.5"
        cy="14.5"
        r="14.5"
        fill="url(#paint0_radial_1076_3803)"
      />
      <path
        d="M19.75 17.375C19.5039 17.375 19.2852 17.293 19.1211 17.1289L14.5 12.5078L9.85156 17.1289C9.52344 17.4844 8.94922 17.4844 8.62109 17.1289C8.26562 16.8008 8.26562 16.2266 8.62109 15.8984L13.8711 10.6484C14.1992 10.293 14.7734 10.293 15.1016 10.6484L20.3516 15.8984C20.707 16.2266 20.707 16.8008 20.3516 17.1289C20.1875 17.293 19.9688 17.375 19.75 17.375Z"
        fill="black"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1076_3803"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.4059 7.60423) rotate(48.475) scale(17.6013 35.0012)"
        >
          <stop stopColor="#69EA72" />
          <stop offset="1" stopColor="#A9EF82" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const MemoGreenUpArrowRound = React.memo(GreenUpArrowRound);
export default MemoGreenUpArrowRound;
