import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Section = styled.section`
  background: #ffffff;
  height: 85vh;
  overflow-y: auto;
  position: relative;
  border-radius: 0.5rem;
  & * {
    transition: all 0.2s linear;
  }
  &::-webkit-scrollbar {
    width: 0.25rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 2.5rem;
  }
  & div.chat-icon__icon {
    z-index: 5;
    height: 4.375rem;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    align-items: center;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0px -2px 44px 0px #00000012;
    & svg {
      font-size: 1.25rem;
    }
    & div.chat-icon__text {
      font-family: Manrope;
      font-weight: bold;
      color: #005bc2;
      margin: 0 0.475rem;
      text-transform: capitalize;
      font-size: 1rem;
      letter-spacing: 0.05em;
      line-height: 150%;
    }
  }
  ${media.largeScreen`
    height: 100%;
    border-radius: 0.5rem;
    margin: 0 0.65rem;
    box-shadow: 0px 0px 10px rgb(33 34 35 / 10%);
  `}
  /* ${media.xLargeScreen`
  max-height: 45vh;
  `} */
  `;
export const HeadSection = styled.div`
  padding: 0.625rem;
  border-radius: 0.5rem 0.5rem 0 0;
  ${media.largeScreen`
    padding: 0;
    /* box-shadow: 5px 5px 10px 10px #00000012; */
    border-radius: 0.5rem;
  `}
`;

export const OrderStatus = styled.div`
  & div:nth-child(2n + 1) {
    background: #f4f8f9;
  }
  & div:last-child {
    min-height: 6.25rem;
    & div {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }
    ${media.largeScreen`
    border-radius: 0 0 0.5rem 0.5rem;
  `}
  }
`;
export const HorizontalLine = styled.hr`
  border: 1px solid #e1e1e1;
  background: #e1e1e1;
  margin: 0.938rem auto;
  width: 60%;
`;
export const HelpingMsg = styled.p`
  margin: 0.938rem 0;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.188rem;
  color: #ed1c24;
`;
export const TabSection = styled.div`
  min-height: 21rem;
`;
export const Routing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin: 1.563rem 0;
`;
export const Route = styled.div`
  text-transform: capitalize;
  margin: 0 1.438rem;
  padding: 0.625rem 0;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.125rem;
  color: #616161;
  cursor: pointer;
  transition: all 0.3 linear;
  ${media.largeScreen`
    font-size: 1rem;
    margin: 0 1rem;
  `}
`;
export const OverViewSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DocumentsSection = styled.div``;
export const PaymentSection = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 1456px) {
    justify-content: center;
  }
`;

// ==================overview-section======================

export const Article = styled.article`
  margin: 1.3rem 1.813rem;
  width: 100%;
  ${media.largeScreen`
    margin: 0;
    padding: 0 0.75rem;
    /* box-shadow: 0 0 10px 5px #00000012; */
    border-radius: 0.5rem;
  `}
`;
export const Title = styled.p`
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.25rem;
  color: #616161;
  margin-bottom: 0.625rem;
`;
export const CircleBody = styled.section`
  border-radius: 0.5rem;
  padding: 1.25rem;
  background: #f4f8f9;
  min-height: 12rem;
  ${media.largeScreen`
  background: transparent;
  padding: 1.25rem 0;
  `}
`;
export const LinearBody = styled.section`
  margin: 1.6rem 0;
`;
export const TrackingDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Paragraph = styled.div`
  flex: 0.95;
  color: #616161;
  line-height: 1.188rem;
  font-weight: 500;
  & p:first-child {
    margin: 0.625rem 0;
    font-size: 1.063rem;
    text-transform: capitalize;
  }
  & p:last-child {
    font-size: 1rem;
    margin: 0.625rem 0;
    ${media.largeScreen`
    font-size: 0.75rem;
    line-height: 0.8rem;
  `}
  }
`;
