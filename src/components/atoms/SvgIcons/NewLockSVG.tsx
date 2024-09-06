import * as React from "react";

function NewLockSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.1875 6V4.6875C2.1875 2.52734 3.9375 0.75 6.125 0.75C8.28516 0.75 10.0625 2.52734 10.0625 4.6875V6H10.5C11.457 6 12.25 6.79297 12.25 7.75V13C12.25 13.9844 11.457 14.75 10.5 14.75H1.75C0.765625 14.75 0 13.9844 0 13V7.75C0 6.79297 0.765625 6 1.75 6H2.1875ZM3.9375 6H8.3125V4.6875C8.3125 3.48438 7.32812 2.5 6.125 2.5C4.89453 2.5 3.9375 3.48438 3.9375 4.6875V6Z" fill="#5DD37C"/>
        </svg>
  );
}

const MemoLockSVGNew = React.memo(NewLockSVG);
export default MemoLockSVGNew;
