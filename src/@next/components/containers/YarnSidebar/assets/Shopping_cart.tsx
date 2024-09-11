import * as React from "react";

function Shopping_cartSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M5.833 15.07c-.916 0-1.658.75-1.658 1.666 0 .917.742 1.667 1.658 1.667.917 0 1.667-.75 1.667-1.667 0-.916-.75-1.666-1.667-1.666zm-5-13.334v1.667H2.5l3 6.325-1.125 2.042a1.611 1.611 0 00-.208.8c0 .916.75 1.666 1.666 1.666h10V12.57h-9.65a.206.206 0 01-.208-.209l.025-.1.75-1.358h6.208c.625 0 1.175-.342 1.459-.858L17.4 4.636a.836.836 0 00-.733-1.233H4.342l-.784-1.667H.833zM14.167 15.07c-.917 0-1.659.75-1.659 1.666 0 .917.742 1.667 1.659 1.667.916 0 1.666-.75 1.666-1.667 0-.916-.75-1.666-1.666-1.666z"
        fill="#616161"
      />
    </svg>
  );
}

const Shopping_cart = React.memo(Shopping_cartSVG);
export default Shopping_cart;
