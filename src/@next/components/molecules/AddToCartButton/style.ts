// import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";
import styled from "styled-components";

export const ProductCardButton = styled(Button)<{ page: string }>`
  padding: 16px 0;
  width: 100%;
  margin-top: 5px;
  /* height: 96%; */
  span {
    /* font-size: 0.8rem; */
  }
  background: ${props => props.page === "pdp" && "white"};
  color: ${props => props.page === "pdp" && props.theme.colors.primaryDark};
  border: ${props =>
    props.page === "pdp" && `1px solid ${props.theme.colors.primaryDark}`};

  &.atc-button.gtc {
    background-color: ${props => props.theme.button.colors.goToCart};
    color:white;
    :hover {
      background-color: ${props => props.theme.button.colors.goToCartHover};
      color: ${props => props.theme.button.colors.goToCart};
      border: 1px solid ${props => props.theme.button.colors.goToCart};
    }

    :active {
      background-color: #6fc256;
    }
  }

  ${media.mediumScreen`
    padding: 12px 0;
    /* span{
      font-size: 0.7rem;
    } */
  `}

  &:disabled {
    /* background-color: ${props => props.theme.colors.textCut};
    color: #fff; */
    border: none;
    /* padding: 16px; */
  }
`;

export const LeftSide = styled.div``;
export const RightSide = styled.div``;
