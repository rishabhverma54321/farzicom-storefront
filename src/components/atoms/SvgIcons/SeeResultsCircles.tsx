import * as React from "react";

function SeeResultsCircles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 34 104" fill="none" {...props}>
      <path
        d="M32.837 26.506c0 14.09-11.384 25.507-25.419 25.507S-18 40.596-18 26.506C-18 12.416-6.617 1 7.418 1s25.419 11.416 25.419 25.506z"
        stroke="#000"
        strokeWidth={2}
      />
      <path
        d="M32.837 59.181c0 14.453-11.405 26.123-25.419 26.123C-6.595 85.304-18 73.634-18 59.181-18 44.73-6.595 33.06 7.418 33.06c14.014 0 25.419 11.67 25.419 26.122zM8.266 66.576v36.986"
        stroke="#000"
        strokeWidth={2}
      />
    </svg>
  );
}

const MemoSeeResultsCircles = React.memo(SeeResultsCircles);
export default MemoSeeResultsCircles;
