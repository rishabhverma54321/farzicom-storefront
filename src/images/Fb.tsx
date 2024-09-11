import * as React from "react";

function Fb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 72" width="1em" height="1em" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect fill="#345e2e" width={72} height={72} rx={8} />
        <path
          d="M60.464 13.417v9.31l-5.526.015c-4.331 0-5.166 2.058-5.166 5.066v6.662H60.09L58.752 44.89h-8.98V72H39.01V44.889H30V34.47h9.01v-7.684C39.01 17.864 44.448 13 52.42 13c3.8 0 7.08.288 8.044.417z"
          fill="#FFF"
        />
      </g>
    </svg>
  );
}

const MemoFb = React.memo(Fb);
export default MemoFb;
