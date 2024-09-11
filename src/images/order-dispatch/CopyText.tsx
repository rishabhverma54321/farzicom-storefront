import * as React from "react";

function CopyText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 16" fill="none" {...props}>
      <path
        d="M13.667 3.111H5.222a.667.667 0 00-.666.667v10.667a.667.667 0 00.666.666h8.445a.667.667 0 00.666-.666V3.778a.667.667 0 00-.666-.667zm-.222 11.111h-8V4h8v10.222z"
        fill="#005BC2"
      />
      <path
        d="M12.111 1.555a.667.667 0 00-.666-.666H3a.667.667 0 00-.667.666v10.667a.667.667 0 00.667.667h.222V1.778h8.89v-.223z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoCopyText = React.memo(CopyText);
export default MemoCopyText;
