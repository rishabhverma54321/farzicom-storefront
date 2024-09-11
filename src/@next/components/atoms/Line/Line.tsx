import React from "react";
import { styled } from "@styles/themes";

export interface ILineProps {
  width: string;
  height?: string;
  color?: string;
  marginTop?: string;
}

const LineStyled = styled.span<{
  width?: string;
  height?: string;
  color?: string;
  marginTop?: string;
}>`
  width: ${({ width }) => width || "100px"};
  border-top: ${({ height }) => height || "1px"} solid
    ${({ color }) => color || "black"};
  margin-top: ${({ marginTop }) => marginTop || "0px"};
`;
export const Line: React.FC<ILineProps> = ({
  width,
  height,
  color,
  marginTop,
}) => {
  return (
    <>
      <LineStyled
        width={width}
        height={height}
        color={color}
        marginTop={marginTop}
      />
    </>
  );
};
Line.displayName = "Line";
export default Line;
