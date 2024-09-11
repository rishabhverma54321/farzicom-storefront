import * as React from "react";

function Shape(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 13" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.901 5.71L6.086.5 9.27 5.71H2.9zm4.302-1.157l-1.118-1.83-1.123 1.83h2.24zM9.27 6.868a2.602 2.602 0 00-2.606 2.606 2.602 2.602 0 002.606 2.605 2.602 2.602 0 002.605-2.605A2.602 2.602 0 009.27 6.868zM7.822 9.474a1.448 1.448 0 102.896-.001 1.448 1.448 0 00-2.896 0zM.875 11.79h4.632V7.158H.875v4.631zm3.474-3.474H2.033v2.316h2.316V8.316z"
        fill="#212223"
      />
    </svg>
  );
}

const MemoShape = React.memo(Shape);
export default MemoShape;
