import * as React from "react";

function Edit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M11.728 3.007l1.765 1.764-1.765-1.764zm1.135-1.555L8.09 6.225c-.246.246-.415.56-.483.902l-.441 2.206 2.207-.441c.341-.069.655-.236.901-.483l4.773-4.772a1.543 1.543 0 00-.501-2.52 1.545 1.545 0 00-1.683.335v0z"
        stroke="#005BC2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.833 11v2.5a1.667 1.667 0 01-1.667 1.667H3A1.667 1.667 0 011.333 13.5V4.334A1.667 1.667 0 013 2.667h2.5"
        stroke="#005BC2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoEdit = React.memo(Edit);
export default MemoEdit;
