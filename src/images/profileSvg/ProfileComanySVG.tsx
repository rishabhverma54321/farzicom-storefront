import * as React from "react";

function ProfileComanySVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 30 29" fill="none" {...props}>
      <rect
        x={1.019}
        y={0.519}
        width={27.962}
        height={27.962}
        rx={13.981}
        fill="#fff"
        stroke="#E1E1E1"
        strokeWidth={0.538}
      />
      <path fill="url(#prefix__pattern0)" d="M9.25 12h14v6h-14z" />
      <defs>
        <pattern
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#prefix__image0"
            transform="matrix(.00306 0 0 .00714 .04 0)"
          />
        </pattern>
        <image
          id="prefix__image0"
          width={300}
          height={140}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

const MemoProfileComanySVG = React.memo(ProfileComanySVG);
export default MemoProfileComanySVG;
