import React from "react";
import Flower from "images/flower.png";
import { styled } from "@styles/themes";

export interface IFlowerImageProps {
  isLeft: boolean;
}
export const StyledDiv = styled.div<{ isLeft: boolean }>`
  position: absolute;
  top: 1rem;
  left: ${props => (props.isLeft ? 0 : "none")};
  right: ${props => (props.isLeft ? "none" : 0)};
`;
export const FlowerImage: React.FC<IFlowerImageProps> = ({ isLeft }) => {
  return (
    <>
      <StyledDiv isLeft={isLeft}>
        <img src={Flower} alt="Flower" style={{ width: "80px" }} />
      </StyledDiv>
    </>
  );
};
FlowerImage.displayName = "FlowerImage";
export default FlowerImage;
