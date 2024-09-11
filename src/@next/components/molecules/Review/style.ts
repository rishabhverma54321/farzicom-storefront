import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 60%;

  margin-bottom: 40px;

  ${media.mediumScreen`
  width:100%;
  `}
`;

export const Title = styled.div`
  color: ${props => props.theme.colors.primaryDark};
  font-weight: ${props => props.theme.typography.boldFontWeight};
`;
// Lotus review title
export const LotusReviewTitle = styled.div`
  size: 18px;
  color: #282c3f;
  /* font-weight: Poppins; */
  font-weight: 400;
`;

export const Rating = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
`;

export const Comment = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  ${media.smallScreen`
    color:#686B78;
    font-size: 14px;
    line-lieght: 21px;
  `}
`;

export const Date = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  font-weight: ${props => props.theme.typography.lighFontWeight};
`;
