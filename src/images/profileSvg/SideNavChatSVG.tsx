import * as React from "react";

function SideNavChatSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 17" fill="none" {...props}>
      <path
        d="M16.5 3.5h-1.667V11H4v1.666c0 .459.375.834.833.834H14l3.333 3.333v-12.5A.836.836 0 0016.5 3.5zm-3.333 5V1a.836.836 0 00-.834-.833H1.5A.836.836 0 00.667 1v11.666L4 9.333h8.333a.836.836 0 00.834-.833z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoSideNavChatSVG = React.memo(SideNavChatSVG);
export default MemoSideNavChatSVG;
