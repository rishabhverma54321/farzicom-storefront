import * as React from "react";

function Infocircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      fill="none"
      viewBox="0 0 12 13"
    >
      <path
        fill="gray"
        d="M6 .5c-3.328 0-6 2.695-6 6 0 3.328 2.672 6 6 6 3.305 0 6-2.672 6-6 0-3.305-2.695-6-6-6zm0 10.875A4.871 4.871 0 011.125 6.5c0-2.672 2.18-4.875 4.875-4.875 2.672 0 4.875 2.203 4.875 4.875 0 2.695-2.203 4.875-4.875 4.875zm.938-3h-.375V6.312A.57.57 0 006 5.75h-.75a.555.555 0 00-.563.563c0 .328.235.562.563.562h.188v1.5h-.375a.555.555 0 00-.563.563c0 .328.234.562.563.562h1.875a.555.555 0 00.562-.563.57.57 0 00-.563-.562zM6 5c.398 0 .75-.328.75-.75A.771.771 0 006 3.5a.755.755 0 00-.75.75c0 .422.328.75.75.75z"
      ></path>
    </svg>

  );
}

const MemoInfocircle = React.memo(Infocircle);
export default MemoInfocircle;