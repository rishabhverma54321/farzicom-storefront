import * as React from "react";

function MinusPlixNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle r="20" transform="matrix(-1 0 0 1 20 20)" fill="#5DD37C"/>
    <path d="M26.1875 21.375H13.8125C13.1797 21.375 12.6875 20.8828 12.6875 20.25C12.6875 19.6523 13.1797 19.125 13.8125 19.125H26.1875C26.7852 19.125 27.3125 19.6523 27.3125 20.25C27.3125 20.8828 26.7852 21.375 26.1875 21.375Z" fill="#FEFFED"/>
    </svg>

  );
}

const MemoMinusPlixNew = React.memo(MinusPlixNew);
export default MemoMinusPlixNew;