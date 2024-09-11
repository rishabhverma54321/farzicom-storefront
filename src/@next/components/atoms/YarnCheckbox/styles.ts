import { styled } from "@styles/themes";

export const Checkbox = styled.article<{
  back?: any;
  active?: boolean;
}>`
  &.one-em {
    height: 1em;
    width: 1em;
  }
  border: ${props => `2px solid ${props.back}`};
  border-radius: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.active ? props.back : "transparent")};
  &.active svg {
    font-size: 0.8rem;
    & path {
      fill: white;
    }
  }
  &.not-active svg {
    font-size: 0.8rem;
    & path {
      fill: transparent;
    }
  }
`;
