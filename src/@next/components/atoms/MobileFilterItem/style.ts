import { styled } from "@styles/themes";

export const Wrapper = styled.div<{ isActive: Boolean }>`
  display: flex;
  flex-direction: row;
  border: 1px solid;
  border-color: ${props =>
    props.isActive ? "#69DF7A" : "rgba(128,128,128,0.5)"};
  background-color: ${props => (props.isActive ? "#EEFDEB" : "transparent")};
  padding: 8px;
  margin: 4px;
  border-radius: 6px;
`;

export const Text = styled.span<{ isActive: Boolean }>`
  color: ${props => (props.isActive ? "#000" : "rgba(128,128,128,0.5)")};
  font-weight: ${props => (props.isActive ? "700" : "400")};
  margin-inline: 8px;
  white-space: nowrap;
  font-size: 14px;
  @media (max-width: 540px) {
    font-size: 0.78rem;
  }
  line-height: ${props => (props.isActive ? "19.8px" : "15px")};
`;
