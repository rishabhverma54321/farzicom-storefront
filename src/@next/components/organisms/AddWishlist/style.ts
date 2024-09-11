import { styled } from "@styles/themes";
import { media } from "@styles/media";

export const CardWishlist = styled.div<{ loading: boolean }>`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  /* position: absolute; */
  top: 0;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${props => (props.loading ? 0.5 : 1)};
  pointer-events: ${props => (props.loading ? "none" : "auto")};

  ${media.smallScreen`
right: 6px;
`}

  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
