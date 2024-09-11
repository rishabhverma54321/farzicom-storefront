import { styled } from "@styles/themes";

export const Wrapper = styled.div`
  /* margin: 4px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 20px;
  /* padding: 4px; */
`;
export const SubHeader = styled.span`
  font-family: "CocoSharp XL" !important;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #000000;
  &.__textGray {
    color: #808080;
  }
`;
export const Divider = styled.div`
  width: ${props => props.width};
  height: 1px;
  background-color: #808080;
  opacity: 0.4;
  margin: 8px 0px;
`;
