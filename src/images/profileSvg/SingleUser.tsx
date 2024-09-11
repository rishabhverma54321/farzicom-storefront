import * as React from "react";

function SingleUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 13" fill="none" {...props}>
      <path
        d="M6 7.229c1.947 0 5.834.977 5.834 2.917v2.187H.167v-2.187c0-1.94 3.886-2.917 5.833-2.917zM6 .667A2.917 2.917 0 116 6.5 2.917 2.917 0 016 .667zm0 7.947c-2.165 0-4.448 1.065-4.448 1.532v.802h8.896v-.802c0-.467-2.282-1.532-4.448-1.532zm0-6.562a1.531 1.531 0 100 3.062 1.531 1.531 0 000-3.062z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoSingleUser = React.memo(SingleUser);
export default MemoSingleUser;
