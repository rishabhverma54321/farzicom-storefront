import * as React from "react";

function NewCartcloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
      {...props}
    >
      <path
        fill="#FEFFED"
        d="M20.508 17.469c.562.625.562 1.562 0 2.125-.625.625-1.563.625-2.125 0l-7.375-7.438-7.438 7.438c-.625.625-1.562.625-2.125 0-.625-.563-.625-1.5 0-2.125l7.438-7.438-7.438-7.437C.82 1.969.82 1.03 1.445.469a1.369 1.369 0 012.063 0l7.5 7.5L18.445.53a1.369 1.369 0 012.063 0c.625.563.625 1.5 0 2.125l-7.438 7.375 7.438 7.438z"
      ></path>
    </svg>
  );
}

const MemoNewCartcloseIcon = React.memo(NewCartcloseIcon);
export default MemoNewCartcloseIcon;
