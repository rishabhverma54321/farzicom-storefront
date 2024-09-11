import { minMedia, media } from "@styles/media";
import { styled } from "@styles/themes";

export const InstagramPostWrapper = styled.div`
  > div {
    margin: 2.5rem auto 0;
    width: fit-content;
  }

  ${minMedia.largeScreen`
    > div {
      margin: 0 auto;
    }

    margin-top: 3rem;
  `}
`;

export const BuyingExperienceWrapper = styled.div`
  > div {
    margin: 0 auto;
  }

  ${minMedia.largeScreen`
    margin-top: 3rem;
  `}
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  button ~ button {
    margin-left: 1rem;
  }

  button {
    padding: 0.7rem 1rem;

    span {
      font-family: ${props => props.theme.typography.titleFontFamily};
      font-size: 0.8rem;
      font-weight: 500;
      line-height: 1.5em;
    }
  }

  .continue-shopping-btn {
    border: 1px solid #011e42;
    color: #1d2236;
    background-color: transparent;

    :hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 350px) {
    button {
      padding: 0.75rem;
    }
  }

  ${minMedia.largeScreen`
    button span {
      font-size: 0.9rem;
    }
  `}
`;

export const OrderNumber = styled.div`
  position: relative;
  padding: 0.25rem;
  display: inline-flex;
  background-color: #fff8f5;
  span {
    font-family: ${props => props.theme.typography.titleFontFamily};
    font-weight: 400;
    font-size: 0.95rem;
    line-height: 1.4em;
    color: #1d2136;

    &.order-number {
      margin-left: 0.25rem;
    }
  }
`;

export const OrderNumberContainer = styled.div`
  margin-block-start: 0.75rem;
  text-align: center;
`;

export const ConfirmationText = styled.p`
  margin-block-start: 0.75rem;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 400;
  font-size: 0.775rem;
  line-height: 1.4em;
  color: #838383;
  text-align: center;

  ${minMedia.largeScreen`
    margin-top: 1rem;
    font-size: 0.875rem;
  `}
`;

export const ThanksText = styled.h2`
  margin-block-start: 0.75rem;
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 600;
  font-size: 1.45rem;
  line-height: 1.2em;
  color: #d36396;
  text-align: center;

  @media (max-width: 360px) {
    font-size: 1.2rem;
  }

  ${minMedia.largeScreen`
    margin-block-start: 1.5rem;
    font-size: 2.25rem;
  `}
`;

export const ConfirmedText = styled.p`
  font-family: ${props => props.theme.typography.titleFontFamily};
  font-weight: 600;
  font-size: 1rem;
  line-height: 1em;
  color: #49b9a5;
`;

export const Confirmed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 1.5rem;
    margin-block-end: 0.25rem;
  }

  ${minMedia.largeScreen`
    margin-block-end: 0.5rem;
  `}
`;

export const Wrapper = styled.div`
  padding: 3rem 1rem;
  background: #fff4f1;

  ${minMedia.largeScreen`
    padding: 4vw 6vw;
  `}
`;

export const Container = styled.div`
  /* height: 420px; */
`;

export const TopContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 420px;
  background-color: #eefdeb;
`;

export const BottomSection = styled.div`
  position: relative;
  background-color: #eefdeb;
`;

export const BottomCardSection = styled.div`
  padding: 43px 211px 43px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${media.mediumScreen`
    padding: 60px 20px 0;
  `}
`;

export const BottomContactSection = styled.div`
  padding: 80px 211px 43px;
  display: flex;
  flex-direction: column;
  ${media.mediumScreen`
    padding: 50px 20px 20px;
  `}
`;

export const BottomContactTitle = styled.h2`
  font-weight: 700;
  margin: 0 auto 28px;
  font-size: 32px;
  ${media.mediumScreen`
    font-size:18px;
  `}
`;

export const BottomContactButton = styled.button`
  margin: 0 auto 82px;
  padding: 15px 70px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 2px;
  width: 330px;
  ${media.mediumScreen`
  width: auto;
    padding: 10px 3vw;
    flex-direction: column;
    align-items: center;
  `}
`;

export const WrapperPlix = styled.div`
  ${media.largeScreen`
    width: 100%;
    height: 100%;
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

export const CartSummaryProductList = styled.div`
  margin-bottom: 30px;
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

export const CartSummarySectionTitle = styled.h3`
  font-size: 18px;
  margin: 32px 0 18px;
  font-weight: 500;
`;

export const LeftSection = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 7px;
  margin: 1rem 2rem;
  ${media.mediumScreen`
         margin: 48px 10px 24px;

  `}
`;

export const LeftSectionHeading = styled.h2`
  font-size: 24px;
  margin: 25px 32px;
  font-weight: 500;
  line-height: 25px;
  color: #000;
`;

export const LeftSubsection = styled.div`
  padding: 24px 32px 0;
`;

export const LeftSectionSubheading = styled.h3`
  font-size: 16px;
  color: #808080;
`;

export const LeftSectionText = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  font-weight: 500;
  color: #000;
`;

export const MainSection = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

export const ThankYouHeadText = styled.h2`
  font-size: 32px;
  margin-bottom: 16px;
  font-weight: 500;
  line-height: 30px;
  ${media.mediumScreen`
    font-size: 24px;
    padding: 2vw;
    text-align: center;
  `}
`;

export const ThankYouHeadSubtext = styled.h2`
  font-size: 16px;
  margin-bottom: 30px;
  position: relative;
  line-height: 20px;
  text-align: center;
  width: 50vw;
  ${media.mediumScreen`
  width: 90vw;
    font-size: 14px;
    padding: 2vw;
    text-align: center;
  `}
`;

export const MainContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 50px 5px 0 20px;
  gap: 17px;
`;

export const CashbackText = styled.div`
  text-align: center;
`;
