import * as React from "react";

function CartPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="15"
      fill="none"
      viewBox="0 0 14 15"
    >
      <path
        fill="#FEFFED"
        d="M13.844 7.125c0 .598-.498 1.096-1.063 1.096H8v4.781c0 .564-.498 1.03-1.063 1.03-.597 0-1.062-.466-1.062-1.03V8.221H1.094C.496 8.22.03 7.723.03 7.125c0-.564.465-1.03 1.063-1.03h4.781v-4.78c0-.598.465-1.096 1.063-1.096C7.502.219 8 .717 8 1.314v4.782h4.781c.565-.034 1.063.465 1.063 1.029z"
      ></path>
    </svg>
  );
}

const MemoCartPlusIcon = React.memo(CartPlusIcon);
export default MemoCartPlusIcon;
