import * as React from "react";

function ChatSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-message-circle-2"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#878787"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M3 20l1.3-3.9A9 8 0 117.7 19L3 20M12 12v.01M8 12v.01M16 12v.01" />
    </svg>
  );
}

const MemoChatSvg = React.memo(ChatSvg);
export default MemoChatSvg;
