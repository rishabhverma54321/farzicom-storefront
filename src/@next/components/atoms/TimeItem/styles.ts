import { media, styled } from "@styles";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  align-items: center;
`;
export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: fit-content;
  align-items: center;
`;
export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Separator = styled.span`
  font-size: 48px;
  padding: 4px;
  margin-inline: 32px;
  margin-bottom: 8px;
  ${media.largeScreen`
   margin-inline: 18px;
  `}
  ${media.mediumScreen`
    font-size: 24px;
    margin-inline: 2px;
    /* padding: 4px; */
    /* margin-top: 4px; */
  `}
  align-self: flex-start
`;
export const TimeDigit = styled.div`
  padding: 2px;
  margin: 2px;
  font-size: 78px;
  ${media.mediumScreen`
    font-size: 32px;
    padding: 2px;
  margin: 0px;
  `}
  font-weight: 600;
`;
export const TimeUnit = styled.div`
  margin-top: 30px;
  font-size: 28px;
  ${media.mediumScreen`
  margin-top: 12px;
    font-size: 16px;
  `}
`;
