import * as React from "react";

function NewLeftArrowPlix(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 11.4925C27 12.5713 26.1558 13.4104 25.1307 13.4104H6.61809L12.9497 19.7635C13.7337 20.4827 13.7337 21.7414 12.9497 22.4606C12.5879 22.8202 12.1055 23 11.6231 23C11.0804 23 10.598 22.8202 10.2362 22.4606L0.58794 12.871C-0.19598 12.1518 -0.19598 10.8932 0.58794 10.1739L10.2362 0.584365C10.9598 -0.194788 12.2261 -0.194788 12.9497 0.584365C13.7337 1.30358 13.7337 2.56222 12.9497 3.28143L6.61809 9.57459H25.1307C26.1558 9.57459 27 10.4736 27 11.4925Z" fill="#BEBEBE"/>
    </svg>

  );
}

const NewMemoLeftArrowPlix = React.memo(NewLeftArrowPlix);
export default NewMemoLeftArrowPlix;
