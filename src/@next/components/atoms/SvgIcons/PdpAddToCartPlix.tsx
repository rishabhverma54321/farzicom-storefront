import * as React from "react";

function PdpAddToCartPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 9" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4.5L4.216.512l.322.304c1.968 1.861 4.639 2.909 7.426 2.909 2.788 0 5.46-1.048 7.427-2.909l.322-.304L23.928 4.5l-4.216 3.988-.322-.304c-1.968-1.86-4.639-2.908-7.427-2.908-2.787 0-5.458 1.047-7.426 2.908l-.322.304L0 4.5zm4.223 2.743A11.694 11.694 0 0110.259 4.5a11.694 11.694 0 01-6.036-2.743L1.323 4.5l2.9 2.743zM13.67 4.5a11.694 11.694 0 016.036 2.743l2.9-2.743-2.9-2.743A11.694 11.694 0 0113.67 4.5z"
        fill="#9DEC9B"
      />
    </svg>
  );
}

const MemoPdpAddToCartPlix = React.memo(PdpAddToCartPlix);
export default MemoPdpAddToCartPlix;
