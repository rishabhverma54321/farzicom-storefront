import * as React from "react";

function Alphabetically(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 14" fill="none" {...props}>
      <path
        d="M8.338 2.413h-2.95L6.862.938l1.476 1.475zm-2.932 9.193H8.32l-1.457 1.457-1.456-1.457zM2.813 3.42L0 10.58h1.15l.575-1.531h3.194l.575 1.531h1.15L3.837 3.42H2.813zm-.707 4.606L3.32 4.787 4.53 8.025H2.106zm6.725 1.563h3.825v.993H7.325v-.806l3.7-5.35H7.35v-1h5.188v.788L8.83 9.588z"
        fill="#212223"
      />
    </svg>
  );
}

const MemoAlphabetically = React.memo(Alphabetically);
export default MemoAlphabetically;
