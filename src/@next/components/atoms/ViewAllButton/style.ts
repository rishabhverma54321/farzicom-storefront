import { styled } from "@styles/themes";

export const viewButton = styled.button<{}>`
  border: 1px solid ${props => props.theme.button.colors.secondary};
  color: ${props => props.theme.button.colors.secondary};
  background-color: #ffffff;
  padding: 11px 20px 8px;
  :hover {
    border: 1px solid ${props => props.theme.button.colors.secondary};
    color: #ffffff;
    background-color: ${props => props.theme.button.colors.secondary};
  }
  transition-duration: 0.5s;
`;
