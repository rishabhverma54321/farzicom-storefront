import { styled } from "@styles/themes";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* height: 90vh; */
  height: ${props => props.fixedposition ? "100%" : "90vh"};
  overflow: auto;
  align-self: center;
  background-color: white;
`;

export const Content = styled.div`

  padding: ${props => props.fixedposition ? `0.5rem ${props.theme.spacing.gutter} 0.3rem ${props.theme.spacing.gutter}` : `4rem ${props.theme.spacing.gutter} 1.8rem ${props.theme.spacing.gutter}`};

`;
