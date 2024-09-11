import * as React from "react";

function Question_answer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M17.5 5.793h-1.667v7.5H5v1.667c0 .458.375.833.833.833H15l3.333 3.334v-12.5a.836.836 0 00-.833-.834zm-3.333 5v-7.5a.836.836 0 00-.834-.833H2.5a.836.836 0 00-.833.833V14.96L5 11.627h8.333a.836.836 0 00.834-.834z"
        fill="#616161"
      />
    </svg>
  );
}

const Chat = React.memo(Question_answer);
export default Chat;
