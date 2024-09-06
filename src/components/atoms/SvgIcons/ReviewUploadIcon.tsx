import * as React from "react";

function ReviewUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="13"
      fill="none"
      viewBox="0 0 15 13"
    >
      <path
        fill="#5DD37C"
        d="M13.223.625h-10.5c-.957 0-1.75.793-1.75 1.75v8.75c0 .984.793 1.75 1.75 1.75h10.5c.957 0 1.75-.766 1.75-1.75v-8.75c0-.957-.766-1.75-1.75-1.75zm-9.188 1.75c.711 0 1.313.602 1.313 1.313C5.348 4.425 4.773 5 4.035 5c-.765 0-1.312-.574-1.312-1.313 0-.71.601-1.312 1.312-1.312zm9.16 8.531a.471.471 0 01-.383.219h-9.57a.45.45 0 01-.41-.219c-.055-.164-.055-.328.055-.465L4.8 7.816a.427.427 0 01.355-.191c.137 0 .246.082.328.191l.903 1.23L8.93 5.22A.436.436 0 019.313 5c.136 0 .273.082.355.219l3.5 5.25c.082.11.082.3.027.437z"
      ></path>
    </svg>
  );
}

const MemoReviewUploadIcon = React.memo(ReviewUploadIcon);
export default MemoReviewUploadIcon;
