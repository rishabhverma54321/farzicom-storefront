import * as React from "react";

function PopCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#1EAF6D" opacity="0.2"></circle>
      <path
        fill="#1EAF6D"
        d="M20.656 20.004c.246.273.246.683 0 .93-.273.273-.683.273-.93 0L16.5 17.68l-3.254 3.254c-.273.273-.684.273-.93 0-.273-.247-.273-.657 0-.93l3.254-3.254-3.254-3.254c-.273-.273-.273-.684 0-.93a.599.599 0 01.903 0l3.281 3.282 3.254-3.254a.599.599 0 01.902 0c.274.246.274.656 0 .93l-3.254 3.226 3.254 3.254z"
      ></path>
    </svg>
  );
}

const MemoPopCloseIcon = React.memo(PopCloseIcon);
export default MemoPopCloseIcon;