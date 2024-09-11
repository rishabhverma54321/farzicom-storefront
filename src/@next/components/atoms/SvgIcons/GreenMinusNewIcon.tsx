import * as React from "react";

function GreenMinusNewIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="3"
      fill="none"
      viewBox="0 0 12 3"
    >
      <path
        fill="#5DD37C"
        d="M10.938 2.625H1.312a.864.864 0 01-.875-.875c0-.465.383-.875.875-.875h9.626a.9.9 0 01.874.875c0 .492-.41.875-.874.875z"
      ></path>
    </svg>
  );
}

const MemoGreenMinusNewIcon = React.memo(GreenMinusNewIcon);
export default MemoGreenMinusNewIcon;
