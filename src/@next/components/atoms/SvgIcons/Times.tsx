import * as React from "react";

function Times(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M10.925 9.343c.457.422.457 1.16 0 1.582a1.09 1.09 0 01-.774.316c-.316 0-.597-.105-.808-.316L5.65 7.233l-3.726 3.692a1.09 1.09 0 01-.774.316c-.316 0-.597-.105-.808-.316a1.084 1.084 0 010-1.582l3.691-3.727L.343 1.925a1.084 1.084 0 010-1.582 1.084 1.084 0 011.582 0L5.65 4.034 9.343.343a1.084 1.084 0 011.582 0c.457.422.457 1.16 0 1.582L7.233 5.65l3.692 3.692z"
        fill="#000"
      />
    </svg>
  );
}

const MemoTimes = React.memo(Times);
export default MemoTimes;
