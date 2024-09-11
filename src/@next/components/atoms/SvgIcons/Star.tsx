import * as React from "react";

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 21 21" fill="none" {...props}>
      <path
        d="M10.135.455l1.468 6.5 5.635-3.558-3.558 5.635 6.5 1.468-6.5 1.468 3.558 5.635-5.635-3.558-1.468 6.5-1.468-6.5-5.635 3.558 3.558-5.635L.09 10.5l6.5-1.468-3.558-5.635 5.635 3.558 1.468-6.5z"
        fill="#000"
      />
    </svg>
  );
}

const MemoStar = React.memo(Star);
export default MemoStar;
