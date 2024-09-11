import * as React from "react";

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 114 75" fill="none" {...props}>
      <circle cx={59} cy={40} r={34} fill="#56774D" />
      <path
        d="M48 42.946L54.34 49 69 35"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d="M96 17L112.5.5M96 56l17 18M2.5.5L19 17M1 74l18-17"
        stroke="#55774D"
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoIcon = React.memo(Icon);
export default MemoIcon;
