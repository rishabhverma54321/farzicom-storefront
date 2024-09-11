import * as React from "react";

function MenuSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#616161" />
    </svg>
  );
}

const Menu = React.memo(MenuSVG);
export default Menu;
