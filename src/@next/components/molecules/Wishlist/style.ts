import { styled } from "@styles/themes";

export const WishlistWrapper = styled.div<{}>`
  width: 32px;
  display: flex;
  justify-content: center;

  * div {
    display: inline-block;
  }
  svg {
    vertical-align: middle;
  }
  &:hover {
    cursor: pointer;
  }
`;
