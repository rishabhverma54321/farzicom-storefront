import * as React from "react";

function MobNavLeftArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 17" fill="none" {...props}>
      <path
        d="M16.674 7.47H4.255L9.96 1.765 8.51.327.347 8.49l8.163 8.163 1.44-1.439L4.254 9.51h12.419V7.47z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoMobNavLeftArrow = React.memo(MobNavLeftArrow);
export default MemoMobNavLeftArrow;
