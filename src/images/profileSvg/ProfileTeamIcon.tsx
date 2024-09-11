import * as React from "react";

function ProfileTeamIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 13" fill="none" {...props}>
      <path
        d="M12.75 9.416c1.434 0 3.125.667 3.334 1.067v.6H9.417v-.6c.208-.4 1.9-1.067 3.333-1.067zm0-1.25c-1.525 0-4.583.767-4.583 2.292v1.875h9.167v-1.875c0-1.525-3.059-2.292-4.584-2.292zM6.5 7.333c-1.941 0-5.833.975-5.833 2.917v2.083H6.5v-1.25H1.917v-.833c0-.525 2.325-1.8 5.267-1.667a4.267 4.267 0 011.291-1.042A10.234 10.234 0 006.5 7.333zm0-5.417a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm0-1.25a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm6.25 2.917a.833.833 0 110 1.667.833.833 0 010-1.667zm0-1.25a2.083 2.083 0 100 4.167 2.083 2.083 0 000-4.167z"
        fill="#005BC2"
      />
    </svg>
  );
}

const MemoProfileTeamIcon = React.memo(ProfileTeamIcon);
export default MemoProfileTeamIcon;
