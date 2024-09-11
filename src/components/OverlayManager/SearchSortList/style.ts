import { styled } from "@styles/themes";

export const Divider = styled.div<{ width: string }>`
  width: ${props => props.width};
  height: 1px;
  background-color: #808080;
  opacity: 0.4;
  /* margin: 8px 0px; */
`;
export const SubHeader = styled.div<{ size: string; lineHeight: string }>`
  font-size: ${props => props.size || "16px"};
  line-height: ${props => props.lineHeight || "24px"};
  font-weight: bold;
  padding: 16px;
  margin-top: 8px;
`;
export const CloseButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // background-color: white;
`;
export const ContentWrapper = styled.div`
  max-height: 75vh;
  padding: 0.5rem 0rem;
  overflow: scroll;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid transparent;
  border-radius: 4px 4px 0px 0px;
`;
export const FilterHeader = styled.h3`
  text-transform: uppercase;
`;

export const FilterTable = styled.div`
  margin: 1rem 0rem;
`;
export const SortItem = styled.div<{
  borderBottom?: boolean;
  isSelected?: boolean;
}>`
  padding: 0.5rem;
  border-bottom: ${props =>
    props?.borderBottom ? "1px solid lightgray" : "none"};
  font-weight: ${props => (props?.isSelected ? "bold" : "normal")};
  cursor: pointer;
`;
