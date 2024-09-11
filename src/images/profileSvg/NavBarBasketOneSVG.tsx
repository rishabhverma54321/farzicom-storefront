import * as React from "react";

function NavBarBasketOneSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 16" fill="none" {...props}>
      <path
        d="M14.342 5.913L10.692.446A.827.827 0 0010 .096a.814.814 0 00-.692.359l-3.65 5.458H1.667a.836.836 0 00-.834.833c0 .075.009.15.034.225l2.116 7.725c.192.7.834 1.217 1.6 1.217h10.834c.766 0 1.408-.517 1.608-1.217l2.117-7.725.025-.225a.836.836 0 00-.834-.833h-3.991zm-6.842 0L10 2.246l2.5 3.667h-5zm2.5 6.666c-.917 0-1.667-.75-1.667-1.666 0-.917.75-1.667 1.667-1.667s1.667.75 1.667 1.667c0 .916-.75 1.666-1.667 1.666z"
        fill="#A33A34"
      />
    </svg>
  );
}

const MemoNavBarBasketOneSVG = React.memo(NavBarBasketOneSVG);
export default MemoNavBarBasketOneSVG;
