import * as React from "react";

function CheckedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 21 21" fill="none" {...props}>
      <path
        d="M10.418.113c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm4.563 8.313l-5.813 5.812c-.188.188-.438.25-.688.25-.25 0-.5-.062-.687-.25l-2.375-2.375a.906.906 0 010-1.312.906.906 0 011.312 0l1.75 1.75 5.188-5.188a.906.906 0 011.313 0 .906.906 0 010 1.313z"
        fill="#A33A34"
      />
    </svg>
  );
}

const MemoCheckedIcon = React.memo(CheckedIcon);
export default MemoCheckedIcon;
