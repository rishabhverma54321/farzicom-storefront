import * as React from "react";

function ProfileSupportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 17" fill="none" {...props}>
      <path
        d="M8.5 16.5a8 8 0 100-16 8 8 0 000 16z"
        stroke="#005BC2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.5a4 4 0 100-8 4 4 0 000 8zM11.5 5.5L14 3M11.5 11.5L14 14M5.5 11.5L3 14M5.5 5.5L3 3"
        stroke="#005BC2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoProfileSupportIcon = React.memo(ProfileSupportIcon);
export default MemoProfileSupportIcon;
