import * as React from "react";

function Closebutton(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      fill="none"
      viewBox="0 0 13 12"
    >
      <path
        fill="#C1C1C1"
        d="M11.607 9.977c.457.421.457 1.16 0 1.582-.211.21-.492.316-.774.316-.316 0-.597-.105-.808-.316L6.333 7.867 2.607 11.56a1.09 1.09 0 01-.774.316c-.316 0-.597-.105-.808-.316a1.084 1.084 0 010-1.582L4.716 6.25 1.025 2.559a1.084 1.084 0 010-1.582 1.084 1.084 0 011.582 0l3.726 3.691L10.025.977a1.084 1.084 0 011.582 0c.457.421.457 1.16 0 1.582L7.915 6.285l3.692 3.692z"
      ></path>
    </svg>
  );
}

const MemoClosebutton = React.memo(Closebutton);
export default MemoClosebutton;
