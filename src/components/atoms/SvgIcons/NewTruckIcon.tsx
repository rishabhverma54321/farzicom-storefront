import * as React from "react";

function NewTruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="9"
      fill="none"
      viewBox="0 0 13 9"
    >
      <path
        fill="#1EAF6D"
        d="M1.16 0h8.113v2.125h1.738L12.75 4.25v2.656h-1.16c0 .423-.182.828-.508 1.127a1.822 1.822 0 01-1.23.467c-.46 0-.903-.168-1.23-.467a1.53 1.53 0 01-.508-1.127H4.636c0 .423-.183.828-.509 1.127a1.822 1.822 0 01-1.23.467c-.46 0-.903-.168-1.229-.467a1.53 1.53 0 01-.509-1.127H0V1.063C0 .473.522 0 1.16 0zm8.113 2.922V4.25h2.59l-1.141-1.328h-1.45zM2.898 6.109a.911.911 0 00-.615.234.765.765 0 00-.255.563c0 .212.092.414.255.564.163.15.384.233.615.233.23 0 .451-.084.614-.233a.765.765 0 00.255-.564.765.765 0 00-.255-.563.911.911 0 00-.614-.234zm6.954 0a.911.911 0 00-.614.234.765.765 0 00-.255.563c0 .212.092.414.255.564.163.15.384.233.614.233.23 0 .452-.084.615-.233a.765.765 0 00.255-.564.765.765 0 00-.255-.563.911.911 0 00-.615-.234zm-5.795-.796l3.477-3.188-.817-.754-2.66 2.438L2.846 2.7l-.818.754 2.029 1.86z"
      ></path>
    </svg>
  );
}

const MemoNewTruckIcon = React.memo(NewTruckIcon);
export default MemoNewTruckIcon;