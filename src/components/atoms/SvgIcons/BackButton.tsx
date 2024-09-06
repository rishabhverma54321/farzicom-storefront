import * as React from "react";

function BackButton(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="23"
      fill="none"
      viewBox="0 0 27 23"
    >
      <path
        fill="#BEBEBE"
        d="M27 11.492c0 1.08-.844 1.918-1.87 1.918H6.619l6.332 6.354a1.84 1.84 0 010 2.697c-.362.36-.845.539-1.327.539-.543 0-1.025-.18-1.387-.54L.588 12.872a1.84 1.84 0 010-2.697l9.648-9.59c.724-.779 1.99-.779 2.714 0a1.84 1.84 0 010 2.697L6.618 9.575h18.513c1.025 0 1.869.899 1.869 1.918z"
      ></path>
    </svg>
  );
}

const MemoBackButton = React.memo(BackButton);
export default MemoBackButton;
