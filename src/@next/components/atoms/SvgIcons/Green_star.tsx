import * as React from "react";

function GreenStarNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7378 0.883057L12.2061 7.38327L17.8407 3.82517L14.2826 9.45976L20.7828 10.9281L14.2826 12.3964L17.8407 18.0309L12.2061 14.4728L10.7378 20.9731L9.26951 14.4728L3.63492 18.0309L7.19302 12.3964L0.69281 10.9281L7.19302 9.45976L3.63492 3.82517L9.26951 7.38327L10.7378 0.883057Z" fill="#1EAF6D"/>
    </svg>

  );
}

const MemoStarNew = React.memo(GreenStarNew);
export default MemoStarNew;