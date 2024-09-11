import * as React from "react";

function ProgressTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="7" fill="#39B54A" />
      <path
        d="M10.83 4.63087L5.46085 10L3 7.53915L3.63087 6.90828L5.46085 8.73378L10.1991 4L10.83 4.63087Z"
        fill="white"
      />
    </svg>
  );
}

const MemoProgressTick = React.memo(ProgressTick);
export default MemoProgressTick;
