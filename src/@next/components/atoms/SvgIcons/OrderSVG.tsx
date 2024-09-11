import * as React from "react";

function OrderSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props?.height || "42"}
      height={props?.width || "42"}
      fill="none"
      viewBox="0 0 42 42"
      {...props}
    >
      <path
        fill="#285F37"
        d="M41.79 23.327c.735 15.709-18.172 22.587-29.87 16.437C-1.325 32.8-2.91 19.605 4.1 7.61 7.732 1.394 18.381-1.37 25.391.655c10.763 3.115 17.948 13.167 16.4 22.672z"
      ></path>
      <path fill="url(#pattern0)" d="M10 10H31.214V32H10z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00026 0 0 .00025 0 -.009)"
            xlinkHref="#image0_4602_19494"
          ></use>
        </pattern>
        <image
          id="image0_4602_19494"
          width="3883"
          height="4096"
          href="https://plixlifefc-media.farziengineer.co/hosted/Bulk_Order_1_1-b32938ac6d8d.svg"
        ></image>
      </defs>
    </svg>
  );
}

const MemoOrderSVG = React.memo(OrderSVG);
export default MemoOrderSVG;
