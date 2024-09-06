import * as React from "react";

function NewTransformationTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="13"
      fill="none"
      viewBox="0 0 17 13"
    >
      <path
        fill="#1EAF6D"
        stroke="#1EAF6D"
        strokeWidth="0.5"
        d="M15.655 2.833a.936.936 0 000-1.352l-.217-.208a.936.936 0 00-1.293 0l-8.13 7.772a.436.436 0 01-.602 0L2.855 6.604a.936.936 0 00-1.293 0l-.217.208a.936.936 0 000 1.352l3.722 3.563a.936.936 0 001.294 0l9.294-8.894z"
      ></path>
    </svg>
  );
}

const MemoNewTransformationTick = React.memo(NewTransformationTick);
export default MemoNewTransformationTick;
