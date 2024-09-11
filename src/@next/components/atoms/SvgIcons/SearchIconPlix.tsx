import * as React from "react";

function SearchIconPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 22 22" fill="none" {...props}>
      <path
        d="M20.844 19.82l-4.727-4.726c-.117-.078-.234-.156-.351-.156h-.508c1.21-1.407 1.992-3.282 1.992-5.313 0-4.453-3.672-8.125-8.125-8.125C4.633 1.5 1 5.172 1 9.625a8.119 8.119 0 008.125 8.125c2.031 0 3.867-.742 5.313-1.953v.508c0 .117.039.234.117.351l4.726 4.727c.196.195.508.195.664 0l.899-.899c.195-.156.195-.468 0-.664zM9.125 15.875a6.219 6.219 0 01-6.25-6.25 6.243 6.243 0 016.25-6.25c3.438 0 6.25 2.813 6.25 6.25a6.243 6.243 0 01-6.25 6.25z"
        fill="#BEBEBE"
      />
    </svg>
  );
}

const MemoSearchIconPlix = React.memo(SearchIconPlix);
export default MemoSearchIconPlix;
