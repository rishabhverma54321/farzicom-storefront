import * as React from "react";

function ProfileInviteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 13" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.25.875L.875.25h16.25l.625.625v11.25l-.625.625H.875l-.625-.625V.875zM1.5 2.169V11.5h15V2.17L9.387 7.625h-.762L1.5 2.169zM15.287 1.5H2.713L9 6.336 15.287 1.5z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoProfileInviteIcon = React.memo(ProfileInviteIcon);
export default MemoProfileInviteIcon;
