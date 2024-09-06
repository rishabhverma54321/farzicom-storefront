import * as React from "react";

function BackArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.9531 10C20.9531 10.6562 20.4375 11.1719 19.8281 11.1719H3.89062L10.125 17.0781C10.5938 17.5 10.5938 18.25 10.1719 18.6719C9.75 19.1406 9.04688 19.1406 8.57812 18.7188L0.328125 10.8438C0.09375 10.6094 0 10.3281 0 10C0 9.71875 0.09375 9.4375 0.328125 9.20312L8.57812 1.32812C9.04688 0.90625 9.75 0.90625 10.1719 1.375C10.5938 1.79688 10.5938 2.54688 10.125 2.96875L3.89062 8.875H19.8281C20.4844 8.875 20.9531 9.39062 20.9531 10Z"
        fill="#FEFFED"
      />
    </svg>
  );
}

const MemoBackArrow = React.memo(BackArrow);
export default MemoBackArrow;
