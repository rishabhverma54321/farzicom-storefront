import { styled } from "@styles/themes";

export const Button = styled.span`
  font-weight: 700 !important;
  font-size: 1rem !important;
  // color: ${props => props.theme.colors.primary};
  margin-right: 5px;
  white-space: nowrap;
`;
export const Atag = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  height: 18px;
  align-items: center;
  gap: 4px;

  > *:not(:last-child) {
    margin-right: 5px;
  }
  div {
    display: flex;
    align-items: center;
  }
  svg {
  }
`;
export const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;

  a {
    display: flex;
    justify-content: center;
    text-decoration: none;
    height: 18px;
    align-items: center;
    gap: 4px;

    > *:not(:last-child) {
      margin-right: 5px;
    }
    div {
      display: flex;
      align-items: center;
    }
    svg {
    }
  }
`;

export const Span = styled.span`
  display: flex;
  align-items: center;
`;
