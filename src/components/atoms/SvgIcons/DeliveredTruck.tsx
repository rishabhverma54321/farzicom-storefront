import * as React from "react";

function DeliverdTruck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="25"
      fill="none"
      viewBox="0 0 34 25"
    >
      <path
        fill="#095933"
        d="M3.09 0h21.637v6.182h4.637L34 12.364v7.727h-3.09a4.636 4.636 0 01-9.274 0h-9.272a4.636 4.636 0 11-9.273 0H0v-17A3.09 3.09 0 013.09 0zm21.637 8.5v3.864h6.909L28.59 8.5h-3.864zm-17 9.273a2.318 2.318 0 100 4.636 2.318 2.318 0 000-4.636zm18.546 0a2.319 2.319 0 100 4.637 2.319 2.319 0 000-4.637zm-15.455-2.319l9.273-9.272-2.18-2.195-7.093 7.094-3.23-3.23-2.179 2.195 5.41 5.409z"
      ></path>
    </svg>
  );
}

const MemoDeliverdTruck = React.memo(DeliverdTruck);
export default MemoDeliverdTruck;
