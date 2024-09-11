import * as React from "react";

function OrderConfirmedComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      className="order-confirmed-icon"
      {...props}
    >
      <circle cx={16} cy={16} r={16} fill="#49B9A5" />
      <path
        d="M9.38 15.724l4.689 4.69 8.828-8.828"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const OrderConfirmed = React.memo(OrderConfirmedComponent);
export default OrderConfirmed;
