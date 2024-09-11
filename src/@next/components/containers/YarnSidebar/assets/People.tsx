import * as React from "react";

function PeopleSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M13.333 9.796a2.49 2.49 0 002.492-2.5 2.497 2.497 0 10-4.992 0c0 1.383 1.117 2.5 2.5 2.5zm-6.666 0a2.49 2.49 0 002.491-2.5 2.497 2.497 0 10-4.992 0c0 1.383 1.117 2.5 2.5 2.5zm0 1.667c-1.942 0-5.834.975-5.834 2.916v2.084H12.5v-2.084c0-1.941-3.892-2.916-5.833-2.916zm6.666 0a9.73 9.73 0 00-.808.041c.967.7 1.642 1.642 1.642 2.875v2.084h5v-2.084c0-1.941-3.892-2.916-5.834-2.916z"
        fill="#616161"
      />
    </svg>
  );
}

const People = React.memo(PeopleSVG);
export default People;
