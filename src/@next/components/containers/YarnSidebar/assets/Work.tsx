import * as React from "react";

function WorkSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M16.667 5.465h-3.334V3.8a1.66 1.66 0 00-1.666-1.667H8.333a1.66 1.66 0 00-1.666 1.667v1.666H3.333c-.925 0-1.658.742-1.658 1.667l-.008 9.167a1.66 1.66 0 001.666 1.666h13.334c.925 0 1.666-.741 1.666-1.666V7.132a1.66 1.66 0 00-1.666-1.667zm-5 0H8.333V3.8h3.334v1.666z"
        fill="#616161"
      />
    </svg>
  );
}

const Work = React.memo(WorkSVG);
export default Work;
