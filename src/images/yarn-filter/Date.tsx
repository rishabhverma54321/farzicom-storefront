import * as React from "react";

function Date(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 13" fill="none" {...props}>
      <path
        d="M12.125 5.325H7.888L9.6 3.562C7.894 1.875 5.131 1.813 3.425 3.5a4.297 4.297 0 000 6.119 4.387 4.387 0 006.175 0c.85-.838 1.275-1.819 1.275-3.056h1.25c0 1.237-.55 2.843-1.65 3.93a5.659 5.659 0 01-7.95 0C.338 8.326.319 4.8 2.513 2.632a5.617 5.617 0 017.906 0L12.125.875v4.45zM6.812 4v2.656L9 7.956l-.45.756-2.675-1.587V4h.938z"
        fill="#212223"
      />
    </svg>
  );
}

const MemoDate = React.memo(Date);
export default MemoDate;
