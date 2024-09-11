import * as React from "react";

function CircularCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="22.5" cy="22.5" r="22.5" fill="#303030" />
      <path
        d="M30.6694 29.0374C31.1214 29.5396 31.1214 30.293 30.6694 30.745C30.1671 31.2472 29.4138 31.2472 28.9618 30.745L23.0354 24.7684L17.0589 30.745C16.5566 31.2472 15.8033 31.2472 15.3513 30.745C14.8491 30.293 14.8491 29.5396 15.3513 29.0374L21.3278 23.0608L15.3513 17.0843C14.8491 16.582 14.8491 15.8287 15.3513 15.3767C15.8033 14.8744 16.5566 14.8744 17.0086 15.3767L23.0354 21.4035L29.012 15.4269C29.464 14.9247 30.2174 14.9247 30.6694 15.4269C31.1716 15.8789 31.1716 16.6323 30.6694 17.1345L24.6928 23.0608L30.6694 29.0374Z"
        fill="white"
      />
    </svg>
  );
}

const MemoCircularCloseIcon = React.memo(CircularCloseIcon);
export default MemoCircularCloseIcon;
