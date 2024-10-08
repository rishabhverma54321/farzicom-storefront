import * as React from "react";

function PaymentCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="31"
      height="26"
      viewBox="0 0 31 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.6843 3.85652V22.0913C30.6843 22.9271 30.387 23.6428 29.7923 24.2385C29.1967 24.8331 28.481 25.1305 27.6452 25.1305H3.3321C2.49634 25.1305 1.78113 24.8331 1.18647 24.2385C0.590804 23.6428 0.292969 22.9271 0.292969 22.0913V3.85652C0.292969 3.02076 0.590804 2.30555 1.18647 1.71089C1.78113 1.11522 2.49634 0.817383 3.3321 0.817383H27.6452C28.481 0.817383 29.1967 1.11522 29.7923 1.71089C30.387 2.30555 30.6843 3.02076 30.6843 3.85652ZM3.3321 6.89565H27.6452V3.85652H3.3321V6.89565ZM3.3321 12.9739V22.0913H27.6452V12.9739H3.3321ZM3.3321 22.0913V3.85652V22.0913Z"
        fill="#5DD37C"
      />
    </svg>
  );
}

const MemoPaymentCardIcon = React.memo(PaymentCardIcon);
export default MemoPaymentCardIcon;
