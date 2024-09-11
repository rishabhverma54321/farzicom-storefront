import * as React from "react";

function RupeesDiscounted(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 17" fill="none" {...props}>
      <path
        d="M11.55 2.429c.248 0 .45-.204.45-.456V.455A.453.453 0 0011.55 0H.45A.453.453 0 000 .455v1.698c0 .252.201.456.45.456h3.198c1.024 0 1.81.378 2.286 1.034H.45a.453.453 0 00-.45.455v1.518c0 .252.201.455.45.455h5.953C6.17 7.441 5.167 8.296 3.6 8.296H.45a.453.453 0 00-.45.456v2.011c0 .127.052.249.145.335l6.19 5.781c.082.078.191.121.304.121h3.097c.41 0 .606-.509.305-.79l-5.658-5.285C7.25 10.836 9.3 8.899 9.57 6.071h1.98c.248 0 .45-.203.45-.455V4.098a.453.453 0 00-.45-.455h-2.2a5.229 5.229 0 00-.535-1.214h2.735z"
        fill="#1D2136"
      />
    </svg>
  );
}

const MemoRupeesDiscounted = React.memo(RupeesDiscounted);
export default MemoRupeesDiscounted;
