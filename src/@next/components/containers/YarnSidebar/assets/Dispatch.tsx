import * as React from "react";

function DispatchSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 14" fill="none" {...props}>
      <path
        d="M16.667 3.898h-2.5V.564H2.5c-.917 0-1.667.75-1.667 1.667v9.167H2.5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5h5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5h1.667V7.23l-2.5-3.333zM5 12.648c-.692 0-1.25-.559-1.25-1.25 0-.692.558-1.25 1.25-1.25s1.25.558 1.25 1.25c0 .691-.558 1.25-1.25 1.25zm11.25-7.5l1.633 2.083h-3.716V5.148h2.083zm-1.25 7.5c-.692 0-1.25-.559-1.25-1.25 0-.692.558-1.25 1.25-1.25s1.25.558 1.25 1.25c0 .691-.558 1.25-1.25 1.25z"
        fill="#616161"
      />
    </svg>
  );
}

const Dispatch = React.memo(DispatchSVG);
export default Dispatch;
