import * as React from "react";

function LocationIconSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M7 4.667a2.333 2.333 0 100 4.665 2.333 2.333 0 000-4.665zm5.216 1.75a5.247 5.247 0 00-4.632-4.632V.583H6.417v1.202a5.246 5.246 0 00-4.631 4.632H.584v1.167h1.202a5.246 5.246 0 004.631 4.631v1.202h1.167v-1.202a5.247 5.247 0 004.632-4.631h1.201V6.417h-1.201zM7 11.084A4.08 4.08 0 012.917 7a4.08 4.08 0 014.084-4.083A4.08 4.08 0 0111.084 7a4.08 4.08 0 01-4.083 4.084z"
        fill="#000"
      />
    </svg>
  );
}

const MemoLocationIconSVG = React.memo(LocationIconSVG);
export default MemoLocationIconSVG;
