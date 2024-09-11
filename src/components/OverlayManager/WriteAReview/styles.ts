import { styled } from "@styles/themes";

export const Header = styled.div`
  background-color: ${props => props.theme.modal.colors.headerBackground};
  color: ${props => props.theme.modal.colors.headerTextColor};
  font-size: ${props => props.theme.typography.h4FontSize};
`;
