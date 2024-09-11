import * as React from "react";

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 17" fill="none" {...props}>
      <path
        d="M15.857 16l-3.508-3.548L15.857 16zm-1.564-8.29c0 1.78-.7 3.487-1.946 4.746a6.615 6.615 0 01-4.7 1.965 6.615 6.615 0 01-4.7-1.965A6.743 6.743 0 011 7.71c0-1.78.7-3.487 1.947-4.746A6.615 6.615 0 017.647 1c1.762 0 3.453.707 4.7 1.965a6.743 6.743 0 011.946 4.746v0z"
        stroke="#969696"
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoSearch = React.memo(Search);
export default MemoSearch;
