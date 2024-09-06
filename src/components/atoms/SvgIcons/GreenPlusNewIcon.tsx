import * as React from "react";

function GreenPlusNewIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        fill="#5DD37C"
        d="M11.813 5.75c0 .492-.41.902-.876.902H7v3.938c0 .465-.41.848-.875.848a.858.858 0 01-.875-.848V6.652H1.312c-.492 0-.875-.41-.875-.902 0-.465.383-.848.875-.848H5.25V.965c0-.492.383-.902.875-.902.465 0 .875.41.875.902v3.937h3.938c.464-.027.874.383.874.848z"
      ></path>
    </svg>
  );
}

const MemoGreenPlusNewIcon = React.memo(GreenPlusNewIcon);
export default MemoGreenPlusNewIcon;
