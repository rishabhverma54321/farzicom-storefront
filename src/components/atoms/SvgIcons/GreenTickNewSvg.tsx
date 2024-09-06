import * as React from "react";

function GreenTickNewSvg(props) {
  return (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 9.99794L17.7359 7.48421L18.0904 4.11897L14.7797 3.41807L13.0909 0.484375L10 1.86575L6.9091 0.484375L5.22032 3.41807L1.90964 4.11897L2.26409 7.48421L0 9.99794L2.26405 12.5117L1.9096 15.8769L5.22028 16.5778L6.90906 19.5115L9.99998 18.1301L13.0909 19.5115L14.7797 16.5778L18.0904 15.8769L17.7359 12.5117L20 9.99794ZM14.1922 7.80835L9.17264 13.4321L5.68456 9.94401L6.5142 9.11436L9.12419 11.7243L13.3169 7.02705L14.1922 7.80835Z" fill="#5DD37C"/>
</svg>

  );
}

const MemoGreenTickNewSvg = React.memo(GreenTickNewSvg);
export default MemoGreenTickNewSvg;
