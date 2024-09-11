import * as React from "react";

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 26 26" fill="none" {...props}>
      <path
        d="M8.938 21.938a.813.813 0 100-1.626.813.813 0 000 1.625zM20.313 21.938a.813.813 0 100-1.626.813.813 0 000 1.625zM2.438 4.063h3.25l2.437 13.812h13"
        stroke="#BEBEBE"
        strokeWidth={1.683}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.125 14.625h12.667a.406.406 0 00.398-.326l1.463-7.313a.406.406 0 00-.399-.486H6.5"
        stroke="#BEBEBE"
        strokeWidth={1.683}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoCartIcon = React.memo(CartIcon);
export default MemoCartIcon;
