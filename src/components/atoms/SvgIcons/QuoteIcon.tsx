import * as React from "react";

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="12"
      fill="none"
      viewBox="0 0 22 12"
    >
      <path
        fill="#820906"
        d="M0 12a22.96 22.96 0 011.694-6.62C2.58 3.294 3.724 1.501 5.128 0h6.136c-1.1 1.594-2 3.479-2.702 5.655C7.891 7.801 7.51 9.915 7.418 12H0zm10.165 0a22.96 22.96 0 011.694-6.62c.885-2.085 2.03-3.878 3.434-5.38h6.136c-1.1 1.594-2 3.479-2.702 5.655-.672 2.146-1.053 4.26-1.145 6.345h-7.417z"
      ></path>
    </svg>
  );
}

const MemoQuoteIcon = React.memo(QuoteIcon);
export default MemoQuoteIcon;
