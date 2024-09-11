import * as React from "react";

function UploadIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 11 11" fill="none" {...props}>
      <path
        d="M11 6.286H6.286V11H4.714V6.286H0V4.714h4.714V0h1.572v4.714H11v1.572z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoUploadIconSVG = React.memo(UploadIconSVG);
export default MemoUploadIconSVG;
