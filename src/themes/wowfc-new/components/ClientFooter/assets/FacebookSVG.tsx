import * as React from "react";

function FacebookSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M19.2 0H.8a.8.8 0 00-.8.8v18.4a.8.8 0 00.8.8h18.4a.8.8 0 00.8-.8V.8a.8.8 0 00-.8-.8zm-2.31 5.838h-1.598c-1.252 0-1.495.595-1.495 1.47v1.927h2.99l-.39 3.018h-2.6V20H10.68v-7.745H8.073v-3.02h2.607V7.01c0-2.582 1.578-3.99 3.883-3.99 1.104 0 2.052.083 2.33.12v2.698h-.003z"
        fill="#282C3F"
      />
    </svg>
  );
}

const MemoFacebookSVG = React.memo(FacebookSVG);
export default MemoFacebookSVG;
