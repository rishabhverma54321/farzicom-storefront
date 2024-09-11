import * as React from "react";

function BuyerSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="56"
      height="20"
      viewBox="0 0 56 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.823975"
        y="0.304688"
        width="54.352"
        height="18.7653"
        rx="7.76533"
        fill="#F99F23"
      />
      <path
        d="M17.4142 9.35945C17.7496 9.15824 17.9508 8.78564 17.9508 8.29753C17.9508 7.57468 17.4552 6.82202 16.371 6.82202H14.2434V12.1875H16.5871C17.6453 12.1875 18.2004 11.5466 18.2004 10.5928C18.2004 10.0525 17.9284 9.57555 17.4142 9.35945ZM16.3598 7.66038C16.7845 7.66038 17.0379 7.93983 17.0379 8.31243C17.0379 8.74092 16.7436 8.96449 16.3598 8.96449H15.1525V7.66038H16.3598ZM15.1525 11.3417V9.80284H16.5014C17.0044 9.80284 17.295 10.1345 17.295 10.5667C17.295 11.0436 16.9448 11.3417 16.4753 11.3417H15.1525ZM22.0372 12.2993C23.3152 12.2993 24.1983 11.4684 24.1983 10.1941V6.82202H23.2891V10.1717C23.2891 10.9691 22.7042 11.4535 22.0372 11.4535C21.3851 11.4535 20.7852 10.9803 20.7852 10.1717V6.82202L19.8761 6.82947V10.1941C19.8761 11.4721 20.7592 12.2993 22.0372 12.2993ZM28.3843 9.98914L30.2063 6.82202H29.1593L27.9297 8.96076L26.6964 6.82202H25.6494L27.4752 9.98914V12.1875H28.3843V9.98914ZM32.5562 11.3454V9.82892H34.6763V8.98684H32.5562V7.6641H35.1234V6.82202H31.6582V12.1875H35.1234V11.3454H32.5562ZM40.0564 10.1531C40.6674 9.88109 40.9618 9.29238 40.9618 8.56953C40.9618 7.68273 40.5259 6.99714 39.5944 6.85183C39.4565 6.82947 39.2702 6.82202 39.1659 6.82202H36.9489V12.1875H37.8468V10.3133H39.1211L40.0303 12.1875H41.0475L40.0564 10.1531ZM39.1286 7.6641C39.2292 7.6641 39.3633 7.67155 39.4677 7.69764C39.9148 7.81314 40.0564 8.22673 40.0564 8.56953C40.0564 8.91232 39.9148 9.32591 39.4677 9.43769C39.3633 9.4675 39.2292 9.47495 39.1286 9.47495H37.8468V7.6641H39.1286Z"
        fill="white"
      />
    </svg>
  );
}

const Buyer = React.memo(BuyerSVG);
export default Buyer;
