import * as React from "react";

function OfferShowmore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      fill="none"
      viewBox="0 0 14 8"
      {...props}
    >
      <path
        fill="#095933"
        d="M13.5 1.563L7.531 7.28c-.187.157-.375.219-.531.219a.849.849 0 01-.531-.188l-6-5.75A.746.746 0 01.438.5.746.746 0 011.5.469L7 5.719l5.469-5.25A.746.746 0 0113.53.5a.746.746 0 01-.031 1.063z"
      ></path>
    </svg>
  );
}

const NewMemoOfferShowmore = React.memo(OfferShowmore);
export default NewMemoOfferShowmore;