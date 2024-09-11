import { media } from "@styles/media";
import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 50vh;
  flex-direction: column;
`;

export const Heading = styled.h2`
  font-size: ${props => props.theme.typography.h2FontSize};
  text-align: center;
  line-height: 2.5rem;
  ${media.smallScreen`
    font-size: 2rem;
    line-height: 1.5rem;

  `}/* margin-horizontal: 16px; */
`;
