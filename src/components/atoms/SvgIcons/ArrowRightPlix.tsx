import * as React from "react";

function ArrowRightPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 13" fill="none" {...props}>
      <path
        d="M5.96.103l-.546.52c-.137.136-.137.355 0 .464l4.238 4.238H.328A.332.332 0 000 5.653v.766c0 .191.137.328.328.328h9.324l-4.238 4.266c-.137.11-.137.328 0 .464l.547.52c.11.137.328.137.465 0l5.715-5.715a.315.315 0 000-.465L6.426.103c-.137-.137-.356-.137-.465 0z"
        fill="#E7E7E7"
      />
    </svg>
  );
}

const MemoArrowRightPlix = React.memo(ArrowRightPlix);
export default MemoArrowRightPlix;
