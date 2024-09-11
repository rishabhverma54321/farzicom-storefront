import * as React from "react";

function ProfileInfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 13" fill="none" {...props}>
      <path
        d="M6.5 12.334A5.833 5.833 0 106.5.667a5.833 5.833 0 000 11.667z"
        fill="#005BC2"
      />
      <path
        d="M6.5 9.125v.292m0-5.833v3.5-3.5z"
        stroke="#fff"
        strokeWidth={1.105}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoProfileInfoIcon = React.memo(ProfileInfoIcon);
export default MemoProfileInfoIcon;
