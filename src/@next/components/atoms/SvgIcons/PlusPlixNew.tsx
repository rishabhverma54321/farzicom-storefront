import * as React from "react";

function PlixPluxNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle r="20" transform="matrix(-1 0 0 1 20 20)" fill="#5DD37C"/>
    <path d="M27.3125 20.25C27.3125 20.8828 26.7852 21.4102 26.1875 21.4102H21.125V26.4727C21.125 27.0703 20.5977 27.5625 20 27.5625C19.3672 27.5625 18.875 27.0703 18.875 26.4727V21.4102H13.8125C13.1797 21.4102 12.6875 20.8828 12.6875 20.25C12.6875 19.6523 13.1797 19.1602 13.8125 19.1602H18.875V14.0977C18.875 13.4648 19.3672 12.9375 20 12.9375C20.5977 12.9375 21.125 13.4648 21.125 14.0977V19.1602H26.1875C26.7852 19.125 27.3125 19.6523 27.3125 20.25Z" fill="#FEFFED"/>
    </svg>

  );
}

const MemoPlixPluxNew = React.memo(PlixPluxNew);
export default MemoPlixPluxNew;