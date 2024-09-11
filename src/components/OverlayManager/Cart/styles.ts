import { styled } from "@styles/themes";
import { media } from "@styles/media";
import { Button } from "@components/atoms/Button";

export const StyledButton = styled(Button)`
  width: 100%;
  span{
    font-size: 1rem;
  }
  /* span {
    font-size: 0.8rem;
  }
  ${media.xLargeScreen`
        font-size: 0.8rem;
    `} */
`;

export const ContinueStyledButton = styled(StyledButton as any)`
  /* ${media.xLargeScreen`
        background-color: #fff;
        color: #345E2E;
    `} */
`;
