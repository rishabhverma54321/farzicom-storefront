import * as React from "react";

function UserTickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 17" fill="none" {...props}>
      <path
        d="M18.35 9l1.4 1.41L13.22 17l-3.47-3.5 1.4-1.41 2.07 2.08L18.35 9zM8.25.5a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm0 7c.68 0 1.5.09 2.41.26l-1.67 1.67-.74-.03c-2.97 0-6.1 1.46-6.1 2.1v1.1h6.2l1.9 1.9h-10v-3c0-2.66 5.33-4 8-4z"
        fill="#33A532"
      />
    </svg>
  );
}

const MemoUserTickIcon = React.memo(UserTickIcon);
export default MemoUserTickIcon;
