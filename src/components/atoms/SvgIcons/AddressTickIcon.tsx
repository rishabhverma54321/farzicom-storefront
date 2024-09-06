import * as React from "react";

function AddressTickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="11"
      fill="none"
      viewBox="0 0 10 11"
    >
      <path
        fill="#1EAF6D"
        d="M0 5.25c0-2.754 2.227-5 5-5 2.754 0 5 2.246 5 5 0 2.773-2.246 5-5 5-2.773 0-5-2.227-5-5zm7.246-.86a.53.53 0 000-.761.53.53 0 00-.762 0l-2.109 2.11-.879-.86a.53.53 0 00-.762 0 .53.53 0 000 .762l1.25 1.25a.53.53 0 00.762 0l2.5-2.5z"
      ></path>
    </svg>
  );
}

const MemoAddressTickIcon = React.memo(AddressTickIcon);
export default MemoAddressTickIcon;
