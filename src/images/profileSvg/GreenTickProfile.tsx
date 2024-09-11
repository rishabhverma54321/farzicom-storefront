import * as React from "react";

function GreenTickProfile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 13" fill="none" {...props}>
      <path
        d="M5.585 9.624L1.792 5.83.5 7.113l5.085 5.085L16.5 1.283 15.217 0 5.585 9.624z"
        fill="#33A532"
      />
    </svg>
  );
}

const MemoGreenTickProfile = React.memo(GreenTickProfile);
export default MemoGreenTickProfile;
