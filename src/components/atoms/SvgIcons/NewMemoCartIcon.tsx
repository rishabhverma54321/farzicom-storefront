import * as React from "react";

function NewCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.9375 21.9375C9.38623 21.9375 9.75 21.5737 9.75 21.125C9.75 20.6763 9.38623 20.3125 8.9375 20.3125C8.48877 20.3125 8.125 20.6763 8.125 21.125C8.125 21.5737 8.48877 21.9375 8.9375 21.9375Z"
        stroke="#FCFCEC"
        strokeWidth="1.68304"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.3125 21.9375C20.7612 21.9375 21.125 21.5737 21.125 21.125C21.125 20.6763 20.7612 20.3125 20.3125 20.3125C19.8638 20.3125 19.5 20.6763 19.5 21.125C19.5 21.5737 19.8638 21.9375 20.3125 21.9375Z"
        stroke="#FCFCEC"
        strokeWidth="1.68304"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.4375 4.0625H5.6875L8.125 17.875H21.125"
        stroke="#FCFCEC"
        strokeWidth="1.68304"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.125 14.625H20.7919C20.8858 14.6251 20.9769 14.5926 21.0496 14.533C21.1223 14.4735 21.1721 14.3906 21.1905 14.2985L22.653 6.98598C22.6648 6.92701 22.6634 6.86616 22.6488 6.80782C22.6342 6.74948 22.6069 6.6951 22.5688 6.6486C22.5306 6.60211 22.4826 6.56466 22.4283 6.53896C22.3739 6.51327 22.3145 6.49996 22.2544 6.5H6.5"
        stroke="#FCFCEC"
        strokeWidth="1.68304"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NewMemoCartIcon = React.memo(NewCartIcon);
export default NewMemoCartIcon;
