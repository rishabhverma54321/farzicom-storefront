import * as React from "react";

function MoneyBillIconComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="21"
      height="15"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.26709 2.43018C3.26709 1.33643 4.14209 0.430176 5.26709 0.430176H18.2671C19.3608 0.430176 20.2671 1.33643 20.2671 2.43018V9.43018C20.2671 10.5552 19.3608 11.4302 18.2671 11.4302H5.26709C4.14209 11.4302 3.26709 10.5552 3.26709 9.43018V2.43018ZM5.26709 9.43018H7.26709C7.26709 8.33643 6.36084 7.43018 5.26709 7.43018V9.43018ZM5.26709 2.43018V4.43018C6.36084 4.43018 7.26709 3.55518 7.26709 2.43018H5.26709ZM18.2671 7.43018C17.1421 7.43018 16.2671 8.33643 16.2671 9.43018H18.2671V7.43018ZM16.2671 2.43018C16.2671 3.55518 17.1421 4.43018 18.2671 4.43018V2.43018H16.2671ZM11.7671 3.43018C10.3608 3.43018 9.26709 4.55518 9.26709 5.93018C9.26709 7.33643 10.3608 8.43018 11.7671 8.43018C13.1421 8.43018 14.2671 7.33643 14.2671 5.93018C14.2671 4.55518 13.1421 3.43018 11.7671 3.43018ZM1.76709 10.6802C1.76709 11.9302 2.76709 12.9302 4.01709 12.9302H16.5171C16.9233 12.9302 17.2671 13.2739 17.2671 13.6802C17.2671 14.1177 16.9233 14.4302 16.5171 14.4302H4.01709C1.92334 14.4302 0.26709 12.7739 0.26709 10.6802V3.18018C0.26709 2.77393 0.57959 2.43018 1.01709 2.43018C1.42334 2.43018 1.76709 2.77393 1.76709 3.18018V10.6802Z"
        fill="#2F94D1"
      />
    </svg>
  );
}

const MemoMoneyBillIcon = React.memo(MoneyBillIconComponent);
export default MemoMoneyBillIcon;
