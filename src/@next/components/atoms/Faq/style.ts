import { styled } from "@styles/themes";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Q = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-bottom: 1rem;
`;

export const A = styled.div`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-bottom: 1rem;
`;
