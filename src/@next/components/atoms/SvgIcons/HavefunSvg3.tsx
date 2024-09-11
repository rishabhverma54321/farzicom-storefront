import * as React from "react";

function HaveFunSvg3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="90" height="132" viewBox="0 0 90 132" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-15.1343 0.7585C6.84218 3.89489 22.4955 26.8552 19.8774 51.9597C18.3466 66.3616 17.4379 80.9152 20.328 78.0041C25.8062 72.4614 26.617 34.4346 36.5011 28.4997C46.3637 22.5729 71.6894 29.22 78.9418 47.1254C86.2016 65.0556 103.405 104.291 65.1395 139.307C33.5922 168.174 18.3347 170.423 -8.6333 167.651C-34.0396 165.036 -54.91 139.324 -63.7457 97.1538C-68.8932 72.5495 -51.3039 -3.92405 -16.3057 0.620798C-15.9081 0.663995 -15.503 0.73199 -15.127 0.783345" fill="#2F94D1"/>
    </svg>

  );
}

const MemoHaveFunSvg3 = React.memo(HaveFunSvg3);
export default MemoHaveFunSvg3;
