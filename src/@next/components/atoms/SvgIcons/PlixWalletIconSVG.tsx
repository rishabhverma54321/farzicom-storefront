import * as React from "react";

function PlixWalletIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 31 31" fill="none" {...props}>
      <circle cx={15.5} cy={15.5} r={15.5} fill="#fff" />
      <path
        d="M20.613 11.703h-9.687a.717.717 0 00-.727.727.7.7 0 00.727.726h9.687c.394 0 .727.333.727.727v6.297a.717.717 0 01-.727.726H9.957c-.696 0-1.21-.514-1.21-1.21V11.46c0-.666.514-1.211 1.21-1.211h11.14a.717.717 0 00.727-.727.737.737 0 00-.726-.726H9.957a2.668 2.668 0 00-2.664 2.664v8.234a2.649 2.649 0 002.664 2.664h10.656a2.19 2.19 0 002.18-2.18v-6.296c0-1.18-1-2.18-2.18-2.18zm-.726 5.328a.996.996 0 00-.969-.968.975.975 0 00-.969.968c0 .545.424.969.969.969a.975.975 0 00.969-.969z"
        fill="#69DE7A"
      />
    </svg>
  );
}

const MemoPlixWalletIconSVG = React.memo(PlixWalletIconSVG);
export default MemoPlixWalletIconSVG;
