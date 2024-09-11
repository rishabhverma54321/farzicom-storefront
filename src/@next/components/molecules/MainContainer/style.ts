import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div<{ colorName: string; padding: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${props => (props.padding ? props.padding : "15px 60px")};
  background: ${props => (props.colorName ? props.colorName : "white")};
  ${media.mediumScreen`
  padding: 5px 20px;
  `}
  ${media.smallScreen`
  padding: 0px;
  padding-top: 20px;
  `}
`;
