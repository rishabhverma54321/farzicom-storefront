import * as React from "react";

function NewOrderFullfilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.0625 0.875V3.375H0L0.976562 1.40234C1.13281 1.08984 1.46484 0.875 1.81641 0.875H4.0625ZM6.91406 0.875C7.26562 0.875 7.59766 1.08984 7.75391 1.40234L8.75 3.375H4.6875V0.875H6.91406ZM0 4H8.75V8.375C8.75 9.07812 8.18359 9.625 7.5 9.625H1.25C0.546875 9.625 0 9.07812 0 8.375V4ZM6.25 6.05078C6.44531 5.875 6.44531 5.58203 6.25 5.38672C6.07422 5.21094 5.78125 5.21094 5.60547 5.38672L3.75 7.26172L2.96875 6.48047C2.79297 6.30469 2.5 6.30469 2.32422 6.48047C2.12891 6.67578 2.12891 6.96875 2.32422 7.14453L3.41797 8.23828C3.59375 8.43359 3.88672 8.43359 4.0625 8.23828L6.25 6.05078Z" fill="#1EAF6D"/>
    </svg>
  );
}

const NewMemoOrderFullfilled = React.memo(NewOrderFullfilled);
export default NewMemoOrderFullfilled;
