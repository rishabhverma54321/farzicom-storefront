import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4px 0;

  &.discount {
    color: ${props => props.theme.colors.greenTextColor};
  }

  &.plixlife {
    color: black;
    font-size: 14px;
    font-weight: 400;
    padding: 8px 0 !important;
    ${media.smallScreen`
    font-size: 14px;
  `}
  }
  &.plixlife-itemDiscount{
    font-size: 14px;
    font-weight: 400;
    padding: 8px 0 !important;
    color: rgba(30, 175, 109, 1);
    font-weight: 700;
    ${media.smallScreen`
    font-size: 14px;
  `}

  }

  &.plixlife-grand-total {
    font-size: 16px;
    font-weight: 700;
    ${media.smallScreen`
    font-size: 15px;
  `}
  }
  &.plixlife-sub-total{
    font-size: 14px;
  }

  &.plixlife-membership{
    color: black;
    font-size: 14px;
    font-weight: 400;
    padding: 8px 0 !important;
    div:nth-child(1){
      color: rgba(30, 175, 109, 1);
      font-weight:700;
    }
    ${media.smallScreen`
    font-size: 14px;
  `}
  }
`;
