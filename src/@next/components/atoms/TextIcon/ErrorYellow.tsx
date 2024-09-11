import * as React from "react";

function ErrorYellowSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 14" fill="none" {...props}>
      <path
        d="M6.5 13.25a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5z"
        fill="#F99F23"
      />
      <path
        d="M6.5 9.813v.312m0-6.25v3.75-3.75z"
        stroke="#fff"
        strokeWidth={1.184}
        strokeLinecap="round"
      />
    </svg>
  );
}

const ErrorYellow = React.memo(ErrorYellowSVG);
export default ErrorYellow;
