import * as React from "react";

function CouponPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="12"
      fill="none"
      viewBox="0 0 11 12"
    >
      <path
        fill="#5DD37C"
        d="M.976 5.5h3.942V1.578a.665.665 0 01.189-.485.722.722 0 011.17.217.65.65 0 01.05.258l-.025 3.948h3.973a.65.65 0 01.45.173.722.722 0 010 1.022.665.665 0 01-.49.214L6.316 6.9v3.932a.664.664 0 01-.189.475.722.722 0 01-1.17-.217.65.65 0 01-.05-.258l.025-3.948H.96a.65.65 0 01-.45-.173.722.722 0 010-1.022.666.666 0 01.466-.189z"
      ></path>
    </svg>
  );
}

const MemoCouponPlusIcon = React.memo(CouponPlusIcon);
export default MemoCouponPlusIcon;