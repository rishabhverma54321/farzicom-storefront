import * as React from "react";

function OfficeBuildingExclamation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 27 27" fill="none" {...props}>
      <path
        d="M19.25 3.5v18h-6V18h-2v3.5h-6v-18h14zm-4 4h2v-2h-2v2zm-4 0h2v-2h-2v2zm-4 0h2v-2h-2v2zm8 4h2v-2h-2v2zm-4 0h2v-2h-2v2zm-4 0h2v-2h-2v2zm8 4h2v-2h-2v2zm-4 0h2v-2h-2v2zm-4 0h2v-2h-2v2zm8 4h2v-2h-2v2zm-8 0h2v-2h-2v2zm14-18h-18v22h18v-22zM23.25 18.5v-5h2v6h-2v-1zm0 5h2v-2h-2v2z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoOfficeBuildingExclamation = React.memo(OfficeBuildingExclamation);
export default MemoOfficeBuildingExclamation;
