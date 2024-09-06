import * as React from "react";

function TrashNewIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      fill="none"
      viewBox="0 0 14 16"
    >
      <path
        fill="#B50000"
        d="M13.25 2.5a.76.76 0 01.75.75.74.74 0 01-.75.75h-.375l-.75 10.156c-.094 1.063-.938 1.844-2 1.844H3.844c-1.063 0-1.906-.781-2-1.844L1.094 4H.75A.722.722 0 010 3.25a.74.74 0 01.75-.75h2.156L4.062.781A1.792 1.792 0 015.532 0h2.905c.594 0 1.157.313 1.47.781L11.061 2.5h2.188zm-7.719-1a.263.263 0 00-.218.125l-.594.875H9.25l-.594-.875a.263.263 0 00-.219-.125H5.531zM11.375 4H2.594l.75 10.063c.031.25.25.437.5.437h6.281c.25 0 .469-.188.5-.438L11.375 4z"
      ></path>
    </svg>
  );
}

const MemoTrashNewIcon = React.memo(TrashNewIcon);
export default MemoTrashNewIcon;
