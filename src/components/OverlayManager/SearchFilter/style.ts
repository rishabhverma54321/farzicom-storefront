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

export const ButtonContainer = styled.div`
  opacity: 1;
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: white;
  box-shadow: 0px -1px 12px 0px rgba(0, 0, 0, 0.16);
  flex-direction: row;
  width: 100%;
  padding: 10px 8px;
  justify-content: space-between;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: 0px 8px;
    padding: 10px 44px;
    font-size: 15px;
    line-height: 21px;
    font-weight: 700;
  }
  button:nth-child(1) {
    border: 1px solid black;
    border-radius: 2px;
  }
  button:nth-child(2) {
    border: 1px solid transparent;
    border-radius: 2px;
    background: #5dd37c;
  }
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
  padding: 1rem;
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
  margin-top: 1.5rem;
  margin-bottom: 5rem;
`;

export const ResultDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AccordionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 rem 1rem;
  h3 {
    text-transform: capitalize;
  }
  .invert-arrow {
    svg {
      transform: rotate(180deg);
    }
  }
`;
export const Accordian = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0rem;
`;

export const FilterList = styled.div`
  // display: flex;
  // flex-direction: column;
  margin: 0.5rem 0rem;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
    }
    > span:nth-child(2) {
      color: gray;
      font-size: 12px;
    }
  }
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    padding: 0rem 0.5rem;
    span {
      color: #3ed256;
    }
  }
`;
export const SliderHeader = styled.h4``;
