import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  /* margin-bottom: 1rem; */
`;

export const Para = styled.p`
  /* margin-bottom: 1rem; */
`;

export const List = styled.ul`
  padding: 0 0 0 15px;
  list-style: disc;
`;
