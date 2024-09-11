import React from "react";

const MemoCurveLine = ({
  height,
  width,
  circleHeight,
  totalAngle,
}: {
  height: number;
  width: number;
  circleHeight: number;
  totalAngle?: number;
}) => {
  const totalSvgHeight = height + 5.2; // height + circleRadius
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width + 5 || "100%"}
      height={totalSvgHeight || "133"}
      fill="none"
    >
      {/* <path
        stroke="#5DD37C"
        strokeWidth="3.492"
        d={`M6 6c101.97.593 266.979 6 315 ${
          totalAngle || "6"
        } 56 0 159.524-.228 ${width || "673"} ${height + 3.5 || "3"}`}
      /> */}
      <path
        stroke="#5DD37C"
        strokeWidth="3.492"
        d={`M5.239 4.489 L${width || "673"} ${height || "136.456"}`}
        transform="rotate(0 100 100)"
      />
      <circle cx="5.239" cy="4.489" r="5.239" fill="#06543D" />
      <circle cx="100%" cy={height || "136.456"} r="5.239" fill="#06543D" />
    </svg>
  );
};

export default MemoCurveLine;
