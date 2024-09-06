import * as React from "react";

function EditPenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.7178 4.06027L7.92329 1.29863L8.84384 0.378082C9.09589 0.126027 9.40559 0 9.77293 0C10.1398 0 10.4493 0.126027 10.7014 0.378082L11.6219 1.29863C11.874 1.55068 12.0055 1.8549 12.0164 2.21129C12.0274 2.56723 11.9068 2.87123 11.6548 3.12329L10.7178 4.06027ZM9.76438 5.03014L2.79452 12H0V9.20548L6.96986 2.23562L9.76438 5.03014Z"
        fill="#095933"
      />
    </svg>
  );
}

const MemoEditPenIcon = React.memo(EditPenIcon);
export default MemoEditPenIcon;
