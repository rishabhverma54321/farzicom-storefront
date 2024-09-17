import { styled } from "@styles/themes";

export const MainContainer = styled.div<{ loading?: boolean }>`
  opacity: ${props => (props.loading ? "0.4" : "1")};
  pointer-events: ${props => (props.loading ? "none" : "auto")};
`;
