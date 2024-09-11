import * as React from "react";

function NewCircleTick(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5.25C0 2.49609 2.22656 0.25 5 0.25C7.75391 0.25 10 2.49609 10 5.25C10 8.02344 7.75391 10.25 5 10.25C2.22656 10.25 0 8.02344 0 5.25ZM7.24609 4.39062C7.46094 4.17578 7.46094 3.84375 7.24609 3.62891C7.03125 3.41406 6.69922 3.41406 6.48438 3.62891L4.375 5.73828L3.49609 4.87891C3.28125 4.66406 2.94922 4.66406 2.73438 4.87891C2.51953 5.09375 2.51953 5.42578 2.73438 5.64062L3.98438 6.89062C4.19922 7.10547 4.53125 7.10547 4.74609 6.89062L7.24609 4.39062Z" fill="#1EAF6D"/>
    </svg>
  );
}

const NewMemoCircleTick = React.memo(NewCircleTick);
export default NewMemoCircleTick;
