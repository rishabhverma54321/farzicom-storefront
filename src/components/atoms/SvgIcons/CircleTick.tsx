import * as React from "react";

function CircleTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 10 11" fill="none" {...props}>
      <path
        d="M5 .668C2.324.668.156 2.855.156 5.512A4.843 4.843 0 005 10.355c2.656 0 4.844-2.168 4.844-4.843C9.844 2.855 7.656.668 5 .668zm0 .937a3.918 3.918 0 013.906 3.907A3.905 3.905 0 015 9.418a3.893 3.893 0 01-3.906-3.906A3.905 3.905 0 015 1.605zm2.734 2.56l-.449-.45c-.078-.098-.234-.098-.332 0L4.2 6.449 3.027 5.277a.225.225 0 00-.332 0l-.449.43c-.078.098-.078.254 0 .332l1.777 1.797a.225.225 0 00.332 0l3.38-3.34c.077-.098.077-.254 0-.332z"
        fill="#000"
      />
    </svg>
  );
}

const MemoCircleTick = React.memo(CircleTick);
export default MemoCircleTick;
