import * as React from "react";

function Movingcourier(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      fill="none"
      viewBox="0 0 34 34"
    >
      <path
        fill="#FFA227"
        d="M18.661 0V3.439c7.482.92 12.782 7.713 11.861 15.187-.784 6.197-5.657 11.118-11.86 11.85v3.405c9.372-.937 16.19-9.245 15.252-18.61C33.147 7.186 26.722.802 18.66 0zm-3.408.051c-3.323.324-6.493 1.6-9.084 3.746l2.437 2.52a13.633 13.633 0 016.647-2.86V.05zM3.766 6.197C1.62 8.785.341 11.935 0 15.272h3.408a13.642 13.642 0 012.795-6.64L3.766 6.197zM.017 18.677a17.084 17.084 0 003.766 9.075l2.42-2.435a13.618 13.618 0 01-2.778-6.64H.017zm8.59 9.143l-2.438 2.332A17.04 17.04 0 0015.253 34v-3.405a13.644 13.644 0 01-6.647-2.775zm9.202-19.358V17.4l7.669 4.546L24.2 24.04l-8.947-5.363V8.462h2.556z"
      ></path>
    </svg>
  );
}

const MemoMovingcourier = React.memo(Movingcourier);
export default MemoMovingcourier;
