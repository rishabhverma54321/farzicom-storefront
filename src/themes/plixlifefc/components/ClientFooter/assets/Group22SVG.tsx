import * as React from "react";

function Group22SVG(props: React.SVGProps<SVGSVGElement>) {
return (
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 6H12" stroke="#282C3F" stroke-width="1.7"/>
<path d="M6 0L6 12" stroke="#282C3F" stroke-width="1.7"/>
</svg>
  );
}

const MemoGroup22SVG = React.memo(Group22SVG);
export default MemoGroup22SVG;