import React from "react";

const MemoProductTagsTick = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path fill="#000" d="M7 14A7 7 0 107 0a7 7 0 000 14z"></path>
      <path
        stroke="#fff"
        strokeWidth="1.4"
        d="M3.01 6.694l1.92 2.398 5.642-4.422"
      ></path>
    </svg>
  );
};

export default React.memo(MemoProductTagsTick);
