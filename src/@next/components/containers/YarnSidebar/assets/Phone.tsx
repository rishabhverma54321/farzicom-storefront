import * as React from "react";

function PhoneSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" {...props}>
      <path
        d="M3.092 6.3a11.653 11.653 0 005.07 5.07l1.692-1.693a.765.765 0 01.784-.185 8.774 8.774 0 002.746.439c.424 0 .77.346.77.769v2.684c0 .424-.346.77-.77.77C6.161 14.154.308 8.3.308 1.077c0-.423.346-.77.769-.77h2.692c.423 0 .77.347.77.77 0 .961.153 1.884.438 2.746.084.27.023.57-.192.785L3.092 6.3z"
        fill="#33A532"
      />
    </svg>
  );
}

const Phone = React.memo(PhoneSVG);
export default Phone;
