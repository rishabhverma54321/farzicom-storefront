import * as React from "react";

function QuantityDecreaseComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 2" fill="none" {...props}>
      <path d="M11 1H1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

const QuantityDecrease = React.memo(QuantityDecreaseComponent);
export default QuantityDecrease;
