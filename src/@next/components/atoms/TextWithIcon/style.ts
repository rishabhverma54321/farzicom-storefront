import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const Div = styled.div`
  display: flex;
  align-items: center;
  > img {
    padding-right: 14px;
  }

  ${media.smallScreen`
  padding: 0;
  font-size: 0.8rem;
  `}
`;

export const Text = styled.div`
  color: ${props => props.theme.colors.reviewTitle};
`;
