import * as React from "react";

function ConsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      fill="none"
      viewBox="0 0 23 22"
    >
      <path
        fill="#000"
        d="M11.5 0C5.175 0 0 4.899 0 10.886c0 5.988 5.175 10.887 11.5 10.887S23 16.873 23 10.886 17.825 0 11.5 0zm0 19.595c-5.072 0-9.2-3.908-9.2-8.709 0-4.8 4.128-8.709 9.2-8.709 5.072 0 9.2 3.908 9.2 8.71 0 4.8-4.128 8.708-9.2 8.708z"
      ></path>
      <path
        fill="#000"
        d="M14.425 5.443H16.239V18.144H14.425z"
        transform="rotate(45 14.425 5.443)"
      ></path>
      <path
        fill="#000"
        d="M5.905 6.726H7.719V19.427H5.905z"
        transform="rotate(-45 5.905 6.726)"
      ></path>
    </svg>
  );
}

const MemoConsIcon = React.memo(ConsIcon);
export default MemoConsIcon;