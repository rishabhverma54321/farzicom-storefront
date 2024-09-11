import * as React from "react";

function CartClose(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 11 11" fill="none" {...props}>
      <path d="M10.5 1L1 10.5M1 1l9.5 9.5" stroke="#282C3F" />
    </svg>
  );
}

const MemoCartClose = React.memo(CartClose);
export default MemoCartClose;
