import * as React from "react";

function CloseOverlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M15.513 13.298c.65.6.65 1.651 0 2.252-.3.3-.699.45-1.098.45-.45 0-.849-.15-1.148-.45l-5.242-5.255-5.292 5.255c-.3.3-.699.45-1.098.45-.45 0-.849-.15-1.148-.45a1.545 1.545 0 010-2.252l5.242-5.304L.487 2.74a1.546 1.546 0 010-2.252c.599-.65 1.647-.65 2.246 0l5.292 5.254L13.267.488a1.537 1.537 0 012.246 0c.65.6.65 1.651 0 2.252l-5.242 5.304 5.242 5.254z"
        fill="#C1C1C1"
      />
    </svg>
  );
}

const MemoCloseOverlay = React.memo(CloseOverlay);
export default MemoCloseOverlay;
