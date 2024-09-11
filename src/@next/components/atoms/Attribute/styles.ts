import { styled } from "@styles/themes";

export const Wrapper = styled.div`
   display: ${props => props.changePosition ? "flex": "block"};
   flex-direction: ${props => props.changePosition ? "row": "inherit"};
`;

export const Description = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};

  padding-bottom: 0.25rem;
  margin-right: ${props => props.changePosition ? "10px": "0px"};

`;
