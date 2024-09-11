import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const ContinueShopping = styled.div<{
  minHeight?: string;
  width?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || "80%"};
  margin: auto;
  min-height: ${props => props.minHeight || "200px"};
  cursor: pointer;
  a {
    width: ${props => props.width || "auto"};
  }
  ${media.mediumScreen`
    margin-top: 0;
    width: ${props => props.width || "20%"};

  `};
`;
