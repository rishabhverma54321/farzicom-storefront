import * as React from "react";

function BigRightArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="53"
      height="24"
      viewBox="0 0 53 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.0607 13.0607C52.6464 12.4749 52.6464 11.5251 52.0607 10.9393L42.5147 1.3934C41.9289 0.807611 40.9792 0.807611 40.3934 1.3934C39.8076 1.97919 39.8076 2.92893 40.3934 3.51472L48.8787 12L40.3934 20.4853C39.8076 21.0711 39.8076 22.0208 40.3934 22.6066C40.9792 23.1924 41.9289 23.1924 42.5147 22.6066L52.0607 13.0607ZM0 13.5H51V10.5H0V13.5Z"
        fill="black"
      />
    </svg>
  );
}

const MemoBigRightArrow = React.memo(BigRightArrow);
export default MemoBigRightArrow;
