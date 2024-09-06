import * as React from "react";

function CircularButton(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle r="16" fill="#5DD37C" transform="matrix(-1 0 0 1 16 16)"></circle>
      <path
        fill="#FEFFED"
        d="M22 19a.99.99 0 01-.719-.281L16 13.437l-5.313 5.282a.964.964 0 01-1.406 0 .964.964 0 010-1.407l6-6a.964.964 0 011.406 0l6 6a.964.964 0 010 1.407A.97.97 0 0122 19z"
      ></path>
    </svg>
  );
}

const MemoCircularButton = React.memo(CircularButton);
export default MemoCircularButton;
