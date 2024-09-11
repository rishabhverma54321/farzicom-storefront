import * as React from "react";

function NavCallSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" {...props}>
      <path
        d="M3.612 6.569a11.653 11.653 0 005.069 5.07l1.692-1.693a.765.765 0 01.785-.185 8.774 8.774 0 002.746.439c.423 0 .77.346.77.769v2.685c0 .423-.347.769-.77.769C6.68 14.423.827 8.569.827 1.346c0-.423.346-.77.77-.77h2.691c.424 0 .77.347.77.77 0 .961.154 1.885.438 2.746.085.27.023.57-.192.785L3.612 6.569z"
        fill="#33A532"
      />
    </svg>
  );
}

const MemoNavCallSVG = React.memo(NavCallSVG);
export default MemoNavCallSVG;
