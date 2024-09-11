import { DefaultTheme, styled } from "@styles/themes";
import { media } from "@styles/media";

export const SavingsWrapper = styled.div`
  margin: 2rem 0 0;
  width: 100%;
`;

export const Wrapper = styled.div<{ mobileCartOpened: boolean }>`
  ${media.largeScreen`
    width: 100%;
    height: 100%;
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    top: 0%;
    overflow-y: scroll;
  `}
`;

export const WrapperPlix = styled.div<{ mobileCartOpened: boolean }>`
  ${media.largeScreen`
    width: 100%;
    height: 100%;
  `} ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    top: 0%;
    overflow-y: scroll;
  `};
  background-color: #f8f8f8;

  margin: 1rem 2rem;
  ${media.mediumScreen`
    margin: 1rem 0;
  `}
  border-radius: 4px;
  border: 1px solid #d4d4d4;
`;

export const InnerTopWrapperPlix = styled.div`
  padding: 33px 33px 0;
`;

export const InnerBottomWrapperPlix = styled.div`
  padding: 0 33px 33px;
`;

export const Content = styled.div`
  padding: 0 20px 16px 20px;

  ${media.mediumScreen`
    padding: 0 20px 32px 20px;
    margin-bottom: 16px;
  `}
`;

export const ProductCard = styled.div`
  box-shadow: 0 0.5px 2.5px 2px rgba(40, 44, 63, 0.1);
  margin-bottom: 20px;
  padding: 10px;
`;

export const CartSummaryProductList = styled.div`
  margin-bottom: 30px;
`;

export const CartSummarySectionTitle = styled.h3`
  font-size: 18px;
  margin: 32px 0 18px;
  font-weight: 500;
  color: #000;
`;

export const Title = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-size: ${props => props.theme.typography.h3FontSize};
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  ${media.mediumScreen`
    font-size: ${(props: { theme: DefaultTheme }) =>
      props.theme.typography.h4FontSize};
    cursor: pointer;
  `}
`;
export const ArrowUp = styled.div<{ mobileCartOpened: boolean }>`
  display: none;
  ${media.mediumScreen`
    display: unset;
  `}
  ${props =>
    props.mobileCartOpened &&
    media.mediumScreen`
    transform: rotate(180deg);
  `}
`;
export const CostLine = styled.div<{ last: boolean }>`
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
    font-size: 1rem;
  }
  /* font-family: humanist521bt-roman; */
  font-weight: ${props =>
    props.last ? props.theme.typography.boldFontWeight : "normal"};
`;

export const Costs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  div {
    margin-bottom: 5px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
`;

export const SanitizeStrip = styled.div`
  font-family: ${props => props.theme.typography.baseFontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  ${media.xLargeScreen`
    width: 100%;
  `};
  width: 100%;
  color: ${props => props.theme.colors.secondary};
  border: 2px solid ${props => props.theme.colors.secondary};
  text-align: center;
  padding: 0.8rem 0;
  margin: 20px auto;
`;

export const SavingButton = styled.div`
  background-color: ${props => props.theme.button.colors.savingButton};
  color: #fff;
  padding: 0.9rem 3.7rem;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  outline: none;
  text-align: center;
  margin: 0px 0px 0px;
  width: 100%;

  ${media.smallScreen`
    font-size: 0.8rem;
    padding: 0.7rem 1rem;
  `}
`;

export const CashbackStrip = styled.div`
  background-color: white;
  color: ${props => props.theme.colors.secondary};
  padding: 0.9rem 2rem;
  transition: 0.3s;
  outline: none;
  text-align: center;
  border: 1px dashed ${props => props.theme.colors.secondary};
  border-radius: 4px;
  width: 100%;

  ${media.smallScreen`
    font-size: 0.8rem;
    padding: 0.7rem 1rem;
  `}
`;

export const StripContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  ${media.mediumScreen`
    gap: 0.6rem;
  `}
`;
export const HR = styled.hr`
  width: 100%;
  border: 1px solid rgb(217, 217, 217);
  margin-bottom: 5px;
`;

export const DashedHR = styled.div`
  width: 100%;
  border-bottom: 3px dashed rgb(217, 217, 217);
  margin-bottom: 5px;
`;

export const ShowPrepaidOfferContainer = styled.div`
  text-align: center;
  margin: 10px 0;
`;
export const ShowPrepaidOffer = styled.span`
  color: #778d6f;
`;
