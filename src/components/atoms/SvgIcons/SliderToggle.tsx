import * as React from "react";

function SliderToggle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        fill="#BEBEBE"
        d="M0 11.125c0-.355.273-.656.656-.656H2.27a2.217 2.217 0 012.105-1.531 2.21 2.21 0 012.078 1.53h6.89c.356 0 .657.302.657.657 0 .383-.3.656-.656.656h-6.89a2.174 2.174 0 01-2.079 1.531c-.984 0-1.832-.628-2.105-1.53H.656A.632.632 0 010 11.124zm5.25 0a.9.9 0 00-.875-.875.881.881 0 00-.875.875c0 .492.383.875.875.875a.881.881 0 00.875-.875zm4.375-6.563a2.21 2.21 0 012.078 1.532h1.64c.356 0 .657.3.657.656 0 .383-.3.656-.656.656h-1.64a2.174 2.174 0 01-2.079 1.532c-.984 0-1.832-.63-2.105-1.532H.656A.632.632 0 010 6.75c0-.355.273-.656.656-.656H7.52a2.217 2.217 0 012.105-1.532zM10.5 6.75a.9.9 0 00-.875-.875.881.881 0 00-.875.875c0 .492.383.875.875.875a.881.881 0 00.875-.875zm2.844-5.031c.355 0 .656.3.656.656 0 .383-.3.656-.656.656H7.328A2.174 2.174 0 015.25 4.562c-.984 0-1.832-.628-2.105-1.53H.656A.632.632 0 010 2.374c0-.355.273-.656.656-.656h2.489A2.217 2.217 0 015.25.187 2.21 2.21 0 017.328 1.72h6.016zm-8.969.656c0 .492.383.875.875.875a.881.881 0 00.875-.875.9.9 0 00-.875-.875.881.881 0 00-.875.875z"
      ></path>
    </svg>
  );
}

const MemoSliderToggle = React.memo(SliderToggle);
export default MemoSliderToggle;
