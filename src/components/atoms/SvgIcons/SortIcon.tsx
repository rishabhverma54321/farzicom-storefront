import * as React from "react";

function Sort(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <path fill="#444" d="M11 7H5l3-4zM5 9h6l-3 4z" />
    </svg>
  );
}

const MemoSort = React.memo(Sort);
export default MemoSort;
