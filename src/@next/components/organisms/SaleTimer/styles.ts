import { media, styled } from "@styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding: 1.25rem 0rem;
  margin: 20px auto 12px auto;
  /* padding: 15px 60px; */
  width: 100%
  background-color: white;

  ${media.mediumScreen`
   padding: 1rem 0rem;
    /* padding: 15px 20px; */
  `}

  ${media.smallScreen`
  align-items: center;
   padding: 0.5rem 0rem;
  `}
`;

export const Wrapper = styled.div`
  width: 90%;
  height: fit-content;
  ${media.mediumScreen`
    width: 100%;
  `}
`;
export const Heading = styled.div`
  width: 100vw;
  padding: 2rem;
  height: auto;
  display: flex;
  background-color: #1cac6f;
  justify-content: flex-start;
  align-items: center;
  /* padding: 16px; */
  margin-bottom: 56px;
  ${media.largeScreen`
    padding: 1.25rem;
  `}
  ${media.mediumScreen`
  padding: 0.75rem;
    margin-bottom: 8px;
  `}
  ${media.smallScreen`
    padding: 5px 10px;
  `}
`;
export const HeadingText = styled.span`
  font-size: 48px;
  font-weight: bold;
  color: white;
  font-style: italic;
  ${media.largeScreen`
     font-size: 36px;
  `}
  ${media.mediumScreen`
    font-size: 18px;
  `}
  ${media.smallScreen`
   margin-top: 2px;
  `}
`;
export const Content = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #fde6e0; */
  width: 100%;
  height: 100%;
  ${media.mediumScreen`
    padding: 8px;
  `}
`;
