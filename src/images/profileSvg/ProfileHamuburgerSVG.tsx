import * as React from "react";

function ProfileHamuburgerSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 19 13" fill="none" {...props}>
      <path
        d="M.306.368h18.367v2.04H.306V.368zm0 5.102h18.367v2.04H.306V5.47zm0 5.102h18.367v2.04H.306v-2.04z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoProfileHamuburgerSVG = React.memo(ProfileHamuburgerSVG);
export default MemoProfileHamuburgerSVG;
