import * as React from "react";

function Logout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M8.694 8.916v-1.75H4.417V4.833h4.277v-1.75L11.75 6 8.694 8.916zM7.472.166c.324 0 .635.123.864.342.23.219.358.516.358.825V2.5H7.472V1.333h-5.5v9.334h5.5V9.5h1.222v1.166c0 .31-.128.607-.358.825-.229.22-.54.342-.864.342h-5.5c-.324 0-.635-.123-.864-.341a1.14 1.14 0 01-.358-.826V1.333c0-.31.129-.606.358-.825.23-.219.54-.341.864-.341h5.5z"
        fill="#E31D38"
      />
    </svg>
  );
}

const MemoLogout = React.memo(Logout);
export default MemoLogout;
