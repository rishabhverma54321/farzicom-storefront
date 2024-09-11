import { styled } from "@styles/themes";

export const BannerNextMain = styled.div<{ color?: string }>`
  background-color: ${props => props.color || "#fff"};
`;
