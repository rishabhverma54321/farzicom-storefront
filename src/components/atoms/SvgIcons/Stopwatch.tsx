import * as React from "react";

function Stopwatch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="15"
      fill="none"
      viewBox="0 0 12 15"
    >
      <path
        fill="#095933"
        d="M7.438.25a.9.9 0 01.875.875c0 .492-.41.875-.876.875H7v.957A5.673 5.673 0 019.707 4.16l.602-.574a.843.843 0 011.23 0 .843.843 0 010 1.23l-.656.657c.574.902.93 1.968.93 3.09 0 3.144-2.57 5.687-5.688 5.687A5.683 5.683 0 01.437 8.562 5.657 5.657 0 015.25 2.957V2h-.438a.864.864 0 01-.875-.875c0-.465.383-.875.876-.875h2.625zM6.78 5.5c0-.355-.3-.656-.656-.656-.383 0-.656.3-.656.656V9c0 .383.273.656.656.656A.648.648 0 006.781 9V5.5z"
      ></path>
    </svg>
  );
}

const MemoStopwatch = React.memo(Stopwatch);
export default MemoStopwatch;