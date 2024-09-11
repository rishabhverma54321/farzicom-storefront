import * as React from "react";

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 15" fill="none" {...props}>
      <path
        d="M7 .412c-3.883 0-7 3.145-7 7 0 3.883 3.117 7 7 7 3.855 0 7-3.117 7-7 0-3.855-3.145-7-7-7zm3.145 5.797l-3.5 3.5c-.137.164-.329.219-.52.219-.219 0-.41-.055-.547-.219l-1.75-1.75c-.3-.3-.3-.766 0-1.066.3-.301.766-.301 1.067 0l1.23 1.203 2.953-2.953c.3-.301.766-.301 1.067 0 .3.3.3.765 0 1.066z"
        fill="#9DED9C"
      />
    </svg>
  );
}

const MemoCheckCircle = React.memo(CheckCircle);
export default MemoCheckCircle;
