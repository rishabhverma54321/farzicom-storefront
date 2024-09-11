import * as React from "react";

function QuantityIncreaseComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M6 1v10M11 6H1" stroke="#000" strokeLinecap="round" />
    </svg>
  );
}

const QuantityIncrease = React.memo(QuantityIncreaseComponent);
export default QuantityIncrease;
