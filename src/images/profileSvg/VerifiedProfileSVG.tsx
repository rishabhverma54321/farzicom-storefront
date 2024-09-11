import * as React from "react";

function VerifiedProfileSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 10" fill="none" {...props}>
      <path
        d="M12.25 1.667l-.94-.94-4.227 4.226.94.94 4.227-4.226zm2.827-.94L8.023 7.78 5.237 5l-.94.94 3.726 3.727 8-8-.946-.94zM.523 5.94L4.25 9.667l.94-.94L1.47 5l-.947.94z"
        fill="#33A532"
      />
    </svg>
  );
}

const MemoVerifiedProfileSVG = React.memo(VerifiedProfileSVG);
export default MemoVerifiedProfileSVG;
