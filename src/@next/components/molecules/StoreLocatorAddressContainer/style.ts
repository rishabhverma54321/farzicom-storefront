import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px 60px;
  justify-content: center;
  margin-bottom: 100px;
  ${media.mediumScreen`
  padding: 15px;
  `}
`;
