import { styled } from "@styles/themes";

export const Flag = styled.div<{ color?: string; backgroundColor?: string }>`
  background-color: ${props => props.backgroundColor || "#000000"};
  color: ${props => props.color || "#000000"};
`;
