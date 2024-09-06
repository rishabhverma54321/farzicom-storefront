import * as React from "react";

function SideNavCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      fill="none"
      viewBox="0 0 17 16"
    >
      <path
        fill="#FEFFED"
        d="M15.625 13.578c.422.469.422 1.172 0 1.594-.469.469-1.172.469-1.594 0L8.5 9.594l-5.578 5.578c-.469.469-1.172.469-1.594 0-.469-.422-.469-1.125 0-1.594L6.906 8 1.328 2.422C.86 1.953.86 1.25 1.328.828a1.027 1.027 0 011.547 0L8.5 6.453 14.078.875a1.027 1.027 0 011.547 0c.469.422.469 1.125 0 1.594L10.047 8l5.578 5.578z"
      ></path>
    </svg>
  );
}

const MemoSideNavCloseIcon = React.memo(SideNavCloseIcon);
export default MemoSideNavCloseIcon;
