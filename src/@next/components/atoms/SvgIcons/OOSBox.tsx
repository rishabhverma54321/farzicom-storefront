import * as React from "react";

function OOSBoxComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 27 40" fill="none" {...props}>
      <path
        d="M13.379.714v8.993M21.6 7.364l-2.761 4.655M6.098 7.364l2.761 4.655"
        stroke="#1D2136"
        strokeLinecap="round"
      />
      <path
        d="M13.814 14.461a.853.853 0 00-.628 0l-10.07 3.98L13.5 22.547l10.385-4.104-10.071-3.98zm11.498 5.213L14.345 24.01v13.21l10.969-4.336v-13.21zM12.656 37.221V24.008L1.687 19.674v13.212l10.97 4.335zm-.096-24.309a2.56 2.56 0 011.88 0l12.03 4.756c.157.062.29.169.385.307.095.138.145.3.145.467v14.444c0 .333-.101.659-.29.934-.19.276-.458.49-.771.613l-12.125 4.793a.853.853 0 01-.628 0L1.063 34.433a1.684 1.684 0 01-.772-.612A1.654 1.654 0 010 32.886V18.442c0-.167.05-.33.145-.467a.842.842 0 01.385-.307l12.03-4.756z"
        fill="#1D2136"
      />
    </svg>
  );
}

const OOSBox = React.memo(OOSBoxComponent);
export default OOSBox;
