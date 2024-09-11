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
  padding: 8px 10px;
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
    border: 1px solid #5DD37C;
    border-radius: 8px;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #5DD37C;
    padding: 0px 33px;
    height: 48px;
    margin: 0px;
  }
  button:nth-child(2) {
    background: #5DD37C;
    border-radius: 8px;
    font-weight: 800;
    font-size: 16px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #FEFFED;
    height: 48px;
    padding: 6px 30px;
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
`;
export const ContentWrapper = styled.div`
  max-height: 75vh;
  overflow: scroll;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid transparent;
  border-radius: 12px;
`;
export const FilterWrapper = styled.div`
  margin-bottom: 60px;
`;
