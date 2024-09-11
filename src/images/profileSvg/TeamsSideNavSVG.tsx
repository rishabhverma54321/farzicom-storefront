import * as React from "react";

function TeamsSideNavSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 13" fill="none" {...props}>
      <path
        d="M13.333 5.667a2.49 2.49 0 002.492-2.5 2.497 2.497 0 10-4.992 0c0 1.383 1.117 2.5 2.5 2.5zm-6.666 0a2.49 2.49 0 002.491-2.5 2.497 2.497 0 10-4.992 0c0 1.383 1.117 2.5 2.5 2.5zm0 1.666c-1.942 0-5.834.975-5.834 2.917v2.083H12.5V10.25c0-1.942-3.892-2.917-5.833-2.917zm6.666 0c-.241 0-.516.017-.808.042.967.7 1.642 1.642 1.642 2.875v2.083h5V10.25c0-1.942-3.892-2.917-5.834-2.917z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoTeamsSideNavSVG = React.memo(TeamsSideNavSVG);
export default MemoTeamsSideNavSVG;
