import * as React from "react";

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3438 10.9688H6.86328C6.58984 10.0938 5.76953 9.4375 4.8125 9.4375C3.82812 9.4375 3.00781 10.0938 2.73438 10.9688H0.65625C0.273438 10.9688 0 11.2695 0 11.625C0 12.0078 0.273438 12.2812 0.65625 12.2812H2.73438C3.00781 13.1836 3.82812 13.8125 4.8125 13.8125C5.76953 13.8125 6.58984 13.1836 6.86328 12.2812H13.3438C13.6992 12.2812 14 12.0078 14 11.625C14 11.2695 13.6992 10.9688 13.3438 10.9688ZM4.8125 12.5C4.32031 12.5 3.9375 12.1172 3.9375 11.625C3.9375 11.1602 4.32031 10.75 4.8125 10.75C5.27734 10.75 5.6875 11.1602 5.6875 11.625C5.6875 12.1172 5.27734 12.5 4.8125 12.5ZM13.3438 6.59375H11.2383C10.9648 5.71875 10.1445 5.0625 9.1875 5.0625C8.20312 5.0625 7.38281 5.71875 7.10938 6.59375H0.65625C0.273438 6.59375 0 6.89453 0 7.25C0 7.63281 0.273438 7.90625 0.65625 7.90625H7.10938C7.38281 8.80859 8.20312 9.4375 9.1875 9.4375C10.1445 9.4375 10.9648 8.80859 11.2383 7.90625H13.3438C13.6992 7.90625 14 7.63281 14 7.25C14 6.89453 13.6992 6.59375 13.3438 6.59375ZM9.1875 8.125C8.69531 8.125 8.3125 7.74219 8.3125 7.25C8.3125 6.78516 8.69531 6.375 9.1875 6.375C9.65234 6.375 10.0625 6.78516 10.0625 7.25C10.0625 7.74219 9.65234 8.125 9.1875 8.125ZM0.65625 3.53125H3.60938C3.88281 4.43359 4.70312 5.0625 5.6875 5.0625C6.64453 5.0625 7.46484 4.43359 7.73828 3.53125H13.3438C13.6992 3.53125 14 3.25781 14 2.875C14 2.51953 13.6992 2.21875 13.3438 2.21875H7.73828C7.46484 1.34375 6.64453 0.6875 5.6875 0.6875C4.70312 0.6875 3.88281 1.34375 3.60938 2.21875H0.65625C0.273438 2.21875 0 2.51953 0 2.875C0 3.25781 0.273438 3.53125 0.65625 3.53125ZM5.6875 2C6.15234 2 6.5625 2.41016 6.5625 2.875C6.5625 3.36719 6.15234 3.75 5.6875 3.75C5.19531 3.75 4.8125 3.36719 4.8125 2.875C4.8125 2.41016 5.19531 2 5.6875 2Z"
        fill="#BEBEBE"
      />
    </svg>
  );
}

const MemoFilterIcon = React.memo(FilterIcon);
export default MemoFilterIcon;
