import * as React from "react";

function NewTransformationTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 46 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42 4.02588L4 40.7211M4 4.02588L42 40.7211"
        stroke="#BE0000"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const MemoNewTransformationTick = React.memo(NewTransformationTick);
export default MemoNewTransformationTick;
