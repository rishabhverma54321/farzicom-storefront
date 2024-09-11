import * as React from "react";

function CreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 11" fill="none" {...props}>
      <path
        d="M12 .25H1.5C.656.25 0 .93 0 1.75v7.5c0 .844.656 1.5 1.5 1.5H12c.82 0 1.5-.656 1.5-1.5v-7.5c0-.82-.68-1.5-1.5-1.5zM1.125 1.75c0-.188.164-.375.375-.375h10.477c.21 0 .375.188.375.375v.75H1.125v-.75zm11.227 7.5a.37.37 0 01-.375.375H1.5a.37.37 0 01-.375-.375v-4.5h11.25l-.023 4.5zm-9.54-.75h1.126c.304 0 .539-.234.539-.563a.55.55 0 00-.54-.562H2.813a.555.555 0 00-.563.563c0 .328.234.562.563.562zm3 0h2.625A.555.555 0 009 7.937a.57.57 0 00-.563-.562H5.813a.555.555 0 00-.563.563c0 .328.234.562.563.562z"
        fill="#AEAEAE"
      />
    </svg>
  );
}

const MemoCreditCard = React.memo(CreditCard);
export default MemoCreditCard;
