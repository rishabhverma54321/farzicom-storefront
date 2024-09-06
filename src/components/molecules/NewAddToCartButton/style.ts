// import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";
import styled from "styled-components";
// import styled from "styled-components";

export const ProductCardButton = styled(Button)<{
  page: string;
  color: "primary" | "secondary" | "tertiary";
}>`
  padding: 11px 0 8px 0;
  width: 100%;
  margin-top: 5px;
  border-radius: 5px;
  background: ${props =>
    props.page === "pdp" && props.theme?.colors?.primaryDark};
  color: ${props => props.page === "pdp" && "white"};
  border: ${props =>
    props.page === "pdp" && `1px solid ${props?.theme?.colors?.goToCart}`};

  &.atc-button.gtc {
    background-color: ${props => props.theme?.button?.colors?.goToCart};
    color: white;
    :hover {
      background-color: ${props => props.theme?.button?.colors?.goToCartHover};
      color: ${props => props.theme?.button?.colors?.goToCart};
      border: 1px solid ${props => props.theme?.button?.colors?.goToCart};
    }

    :active {
      background-color: #6fc256;
    }
  }

  ${media.mediumScreen`
    padding: 12px 0;
  `}

  &:disabled {
    border: none;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.smallScreen`
    font-size: 16px;
  `}
`;
export const MainText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
