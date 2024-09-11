import * as React from "react";

function ProfileIconPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" {...props}>
      <path
        d="M12.499 2.082c-5.753 0-10.417 4.664-10.417 10.417s4.664 10.416 10.417 10.416S22.915 18.252 22.915 12.5 18.252 2.082 12.5 2.082z"
        stroke="#BEBEBE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.45 19.11s2.321-2.965 8.05-2.965c5.73 0 8.052 2.964 8.052 2.964M12.5 12.5a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25v0z"
        stroke="#BEBEBE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoProfileIconPlix = React.memo(ProfileIconPlix);
export default MemoProfileIconPlix;
