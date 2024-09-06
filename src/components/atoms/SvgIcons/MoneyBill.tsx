import * as React from "react";

function MoneyBill(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="10"
      fill="none"
      viewBox="0 0 11 10"
    >
      <path
        fill="#1EAF6D"
        d="M9.219 3.321a2.629 2.629 0 010 3.73L7.03 9.26a.466.466 0 01-.664.02.484.484 0 010-.665l2.188-2.226a1.698 1.698 0 000-2.403l-2.5-2.539c-.176-.175-.176-.468.02-.664a.443.443 0 01.644.02l2.5 2.52zM0 4.513v-2.93C0 1.075.41.646.938.646h2.91c.332 0 .644.136.879.37l3.28 3.282c.49.488.49 1.289 0 1.777L5.41 8.673a1.261 1.261 0 01-1.777 0L.352 5.392A1.224 1.224 0 010 4.512zm2.188-2.305a.63.63 0 00-.626.625c0 .352.274.625.625.625a.63.63 0 00.626-.625.643.643 0 00-.626-.625z"
      ></path>
    </svg>
  );
}

const MemoMoneyBill = React.memo(MoneyBill);
export default MemoMoneyBill;
