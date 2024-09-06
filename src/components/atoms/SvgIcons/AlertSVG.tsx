import * as React from "react";

function AlertSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-alert-circle"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx={12} cy={12} r={9} />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

const MemoAlertSVG = React.memo(AlertSVG);
export default MemoAlertSVG;
